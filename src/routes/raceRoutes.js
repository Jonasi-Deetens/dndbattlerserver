import express from "express";
import { getRaces, getRaceById } from "../controllers/raceController.js";

const raceRouter = express.Router();

raceRouter.get("/", getRaces);
raceRouter.get("/byId/:id", getRaceById);

export default raceRouter;
