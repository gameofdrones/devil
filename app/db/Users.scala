package db

import play.api.libs.json._
import play.api.libs.functional.syntax._

// Reactive JSONCollection

import reactivemongo.api._
import play.modules.reactivemongo.ReactiveMongoPlugin
import play.modules.reactivemongo.json.collection.JSONCollection

import scala.concurrent.ExecutionContext.Implicits.global
import play.api.Play.current
import scala.concurrent.Future

object Users {
  val collection = ReactiveMongoPlugin.db.collection[JSONCollection]("tests")

  val userReads = (
    ( __ \ "url" ).read[String] and
    ( __ \ "x" ).read[Int] and
    ( __ \ "y" ).read[Int] tupled
  )

  def fetchUserPosition( name: String ): Future[Option[(String, Int, Int)]] = {
    collection.find(Json.obj("name" -> name)).cursor[JsObject].headOption.map { f =>
      f.map( _.asOpt(userReads) ).flatten
    }
  }
}