package models

import play.api.libs.json._
import play.api.libs.functional._
import play.api.libs.functional.syntax._

import reactivemongo.bson.BSONObjectID
import play.modules.reactivemongo.json.BSONFormats._

case class Launcher(id: Option[BSONObjectID], url: String)

object Launcher {
  implicit val formatLauncher = Json.format[Launcher]
}