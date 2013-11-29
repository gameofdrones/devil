package controllers

import play.api._
import play.api.mvc._

object Application extends Controller {

  def main(url: String) = Action {
    Ok(views.html.main())
  }

  def index = Action {
    Ok(views.html.index())
  }

  def position = Action {
    Ok(views.html.position())
  }

  def keyboard = Action {
    Ok(views.html.keyboard())
  }

<<<<<<< HEAD
  def gallery = Action {
    Ok(views.html.gallery())
  }

}
=======
  def targets = Action {
    Ok(views.html.targets())
  }
  
}
>>>>>>> nse-targets
