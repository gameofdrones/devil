package models

import play.api.libs.json._
import play.api.libs.functional._
import play.api.libs.functional.syntax._

case class Launcher(_id: String, url: String)

object Launcher {
  implicit val formatLauncher = Json.format[Launcher]
}