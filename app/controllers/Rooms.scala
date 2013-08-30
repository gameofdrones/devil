package controllers

import scala.concurrent.ExecutionContext.Implicits.global

import play.api._
import play.api.mvc._
import play.api.Play.current

import play.api.libs.json._
import play.api.libs.functional.syntax._

import play.modules.reactivemongo.json.collection.JSONCollection
import play.autosource.reactivemongo._

import models._

object Rooms extends EvilController[Room] {
  val collectionName = "rooms"
  val coll = db.collection[JSONCollection]("rooms")
}