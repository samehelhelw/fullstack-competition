import { Router } from "express";
import userRoutes from "./api/user.routes";
import movieRoutes from "./api/movie.routes";

const routes = Router();

routes.use("/users", userRoutes);
routes.use("/movies", movieRoutes);

export default routes;
