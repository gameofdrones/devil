package controllers

import scala.concurrent.{ Future, ExecutionContext }
import ExecutionContext.Implicits.global

import play.api._
import play.api.mvc._
import play.api.Play.current
import play.api.data.validation.ValidationError

import play.api.libs.json._
import play.api.libs.functional._
import play.api.libs.functional.syntax._

// Reactive Mongo imports
import reactivemongo.api._

// Reactive Mongo plugin
import play.modules.reactivemongo._
import play.modules.reactivemongo.json.collection.JSONCollection

import models.Room

object Rooms extends Controller {

  // def collection = ReactiveMongoPlugin.db[JSONCollection]("rooms")
  def db = ReactiveMongoPlugin.db
  def collection: JSONCollection = db[JSONCollection]("rooms")

  def create = Action(parse.json) { implicit request =>
    request.body.validate[Room].fold (
      invalid => BadRequest(Json.toJson(JsError.toFlatJson(invalid))),
      room => Async {
        collection.insert(request.body).map( le => Ok("") )
      }
    )
    
  }

}