import express from "express";
import {
  getClasses,
  getSpellsFromClass,
} from "../controllers/classController.js";

const classRouter = express.Router();

classRouter.get("/", getClasses);
classRouter.get("/spells/:className", getSpellsFromClass);

export default classRouter;
