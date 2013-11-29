package models

import play.api.libs.json._
import play.api.libs.functional._
import play.api.libs.functional.syntax._

import reactivemongo.bson.BSONObjectID
import play.modules.reactivemongo.json.BSONFormats._

case class Target(id: Option[BSONObjectID], url: String, name: String, x: String, y: String)

object Target {
  implicit val formatLauncher = Json.format[Target]
}