package models

import play.api.libs.json._
import play.api.libs.functional._
import play.api.libs.functional.syntax._

import reactivemongo.bson.BSONObjectID
import play.modules.reactivemongo.json.BSONFormats._

case class Room(id: Option[BSONObjectID], name: String, length: Long, width: Long)

object Room {
  implicit val formatRoom = Json.format[Room]
}