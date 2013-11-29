package db

import play.api.libs.json._
import play.api.libs.functional.syntax._

// Reactive JSONCollection

import reactivemongo.api._
import reactivemongo.bson._
import play.modules.reactivemongo.ReactiveMongoPlugin
import play.modules.reactivemongo.json.BSONFormats._
import play.modules.reactivemongo.json.collection.JSONCollection

import scala.concurrent.ExecutionContext.Implicits.global
import play.api.Play.current
import scala.concurrent.Future

object Users {
  lazy val collection = ReactiveMongoPlugin.db.collection[JSONCollection]("targets")

  val userReads = (
    ( __ \ "url" ).read[String] and
    ( __ \ "x" ).read[String] and
    ( __ \ "y" ).read[String] tupled
  )

  def fetchUserPosition( name: String ): Future[Option[(String, String, String)]] = {
    collection.find( Json.obj("name" -> name) ).cursor[JsObject].headOption.map { f =>
      f.map( _.asOpt(userReads) ).flatten
    }
  }
}