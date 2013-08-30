package models

import play.api.libs.json._
import play.api.libs.functional._
import play.api.libs.functional.syntax._

case class Room(_id: String, name: String, length: Long, width: Long)

object Room {
  implicit val formatRoom = Json.format[Room]
}