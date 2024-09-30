import express from "express"
import { getsearchHistory, removeItemFromsearchHistory, searchMovie, searchPerson, searchTv } from "../controllers/search.controller.js";
const router=express.Router();


router.get("/person/:query",searchPerson)
router.get("/movie/:query",searchMovie)
router.get("/tv/:query",searchTv)

router.get("/history",getsearchHistory)
router.delete("/history/:id",removeItemFromsearchHistory)
export default router;