
import akka.actor.Props

import play.api._
import play.api.libs.concurrent.Akka
import play.api.Play.current

import scala.concurrent.duration._
import scala.concurrent.ExecutionContext.Implicits.global

object Global extends GlobalSettings {

  override def onStart(app: Application) {
    val jenkins = Akka.system.actorOf(Props[actors.Jenkins], name = "jenkins")
    Akka.system.scheduler.schedule(0 seconds, 5 seconds, jenkins, "GOD-FAKE")
  }

}
