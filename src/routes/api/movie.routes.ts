import { Router } from "express";
import * as controllers from "../../controllers/movie.controller";

const routes = Router();

routes.post("/", controllers.create);
routes.get("/", controllers.getMany);
routes
  .route("/:id")
  .get(controllers.getOne)
  .patch(controllers.updateOne)
  .delete(controllers.deleteOne);

export default routes;
