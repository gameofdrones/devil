package controllers
import scala.concurrent.ExecutionContext.Implicits.global
import scala.concurrent.Future
import play.api.libs.ws.WS
import play.api.libs.ws.Response
import scala.collection.mutable.Buffer
import java.io.File
import play.api._
import play.api.mvc._
import play.api.Play.current

import play.api.libs.json._
import play.api.libs.functional.syntax._

object PullLastShots extends Controller {

  var lastModifiedShot = ""
  val images = Buffer[String]()
  val url = "http://10.0.25.113:9001/lastShot.jpg"

  def listImages = Action {
    Ok(Json.toJson(images))
  }

  lazy val asyncPull = Future {
    while (true) {
      WS.url(url).get().map { response =>
        response.header("Last-Modified").map { lastModified =>
          if (lastModified != lastModifiedShot) {
            lastModifiedShot = lastModified
            val imageName = "lastShot-" + images.size
            println("save " + imageName)
            callScript(imageName)
            images.append(imageName)
          }
        }
      }
      Thread.sleep(1000)
    }
  }

  private def callScript(imageName: String) = {
    val processBuilder = new ProcessBuilder(new File("conf/saveLastShot.sh").getCanonicalPath(), url, imageName);
    val process = processBuilder.start()
    process.waitFor()
  }
}
