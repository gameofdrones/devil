package controllers

import play.api._
import play.api.mvc._

// Json
import play.api.libs.json._
import play.api.libs.functional.syntax._
// Reactive JSONCollection
import play.modules.reactivemongo.json.collection.JSONCollection
// Autosource
import play.autosource.reactivemongo._
// AutoSource is Async so imports Scala Future implicits
import scala.concurrent.ExecutionContext.Implicits.global
import play.api.Play.current

trait EvilController[T] extends ReactiveMongoAutoSourceController[T] {
  def collectionName: String
  val coll = db.collection[JSONCollection](collectionName)
}