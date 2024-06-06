import express from "express";
import { scrapeListings } from "../controllers/realEstate.controller.ts";

export const realEstateRouter = express.Router();

realEstateRouter.get("/listings",scrapeListings);