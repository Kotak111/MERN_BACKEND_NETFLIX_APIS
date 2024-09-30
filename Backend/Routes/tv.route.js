import express from "express"
import { getSimilarTv, getTrendingTV, getTvByCategory, getTvDetails, getTvTrailers } from "../controllers/tv.controller.js";
const router=express.Router();
router.get("/trending",getTrendingTV)
router.get("/:id/trailer",getTvTrailers)
router.get("/:id/details",getTvDetails)
router.get("/:id/similar",getSimilarTv)
router.get("/:category",getTvByCategory)
export default router;