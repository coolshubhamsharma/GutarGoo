import express from "express";
import protectRoute from "../middleware/protectRoute.js";
import { sendMessage , getMessages , getUsersForSidebar } from "../controllers/messsage.controller.js";

const router = express.Router();

router.get("/conversations",protectRoute , getUsersForSidebar); //we have to put this route before the other routes because it could collide with the other two routes as they have :id paramater which can take any value.

router.post("/send/:id", protectRoute, sendMessage); // this route sends messages

router.get("/:id",protectRoute , getMessages ); // this route gets messages

export default router;