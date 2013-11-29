package actors

import akka.actor._
import akka.actor.Props
import akka.event.Logging

import scala.concurrent.ExecutionContext.Implicits.global
import scala.concurrent.Future

import play.api.libs.ws.WS
import play.api.libs.json._
import play.api.libs.functional.syntax._
import play.api.Play
import play.api.Play.current

class Jenkins extends Actor with ActorLogging {
  lazy val root  = Play.application.configuration.getString("jenkins.url").getOrElse("http://build-02.znx.fr")
  lazy val user  = Play.application.configuration.getString("jenkins.user").getOrElse("")
  lazy val token = Play.application.configuration.getString("jenkins.token").getOrElse("")
  lazy val auth  = new sun.misc.BASE64Encoder().encode(s"$user:$token".getBytes("utf-8")).trim()

  val jobReads = (
    ( __ \ "lastBuild" \ "number" ).read[Int] and
    ( __ \ "lastSuccessfulBuild" \ "number" ).read[Int] and
    ( __ \ "lastFailedBuild" \ "number" ).read[Int] tupled
  )

  def fetchBuildInfos( buildName: String ): Future[(Int, Int, Int)] = {
    play.Logger.debug("Fetch BuildInfos")
    WS.url( s"$root/job/$buildName/api/json" )
      .withHeaders("Authorization" -> s"Basic $auth")
      .get()
      .map { r => r.json.as(jobReads) }
  }

  def fetchCulprits(buildName: String, failed: Int): Future[Seq[String]] = {
    play.Logger.debug("Fetch culprits")
    WS.url(s"$root/job/$buildName/$failed/api/json")
      .withHeaders("Authorization" -> s"Basic $auth")
      .get()
      .map { r =>
        (r.json \ "culprits").as[Seq[JsValue]].map { js => (js \ "absoluteUrl").as[String] }
      }
  }

  def hasFailed(buildName: String, last: Int, success: Int, failed: Int): Boolean = {
    import play.api.cache.Cache

    val prev = Cache.getAs[Int](buildName).getOrElse(last)
    if( last == success || last == failed ){
      Cache.set(buildName, last)
    }

    play.Logger.debug(s"build: $buildName -  last : $last - success : $success - failed : $failed - prev : $prev")

    last > prev match {
      case true   => ( last == failed && failed == success + 1 )
      case false  => false
    }
  }

  def receive = {
    case buildName: String => {
      val c = for {
        (last, success, failed) <- fetchBuildInfos(buildName)
        culprits                <- hasFailed(buildName, last, success, failed) match {
          case true => fetchCulprits(buildName, failed)
          case _    => Future.successful(Nil)
        }
      } yield culprits

      c.map { all => all.foreach { c =>
        play.Logger.error(c);
        WS.url("http://10.0.25.113:9000/position")
          .put( Json.obj( "x" -> scala.util.Random.nextInt % 100, "y" ->  scala.util.Random.nextInt % 10) )
      }}
    }
  }
}