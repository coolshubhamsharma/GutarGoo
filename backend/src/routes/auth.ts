import express from "express"
import { login, logout, signup ,getMe } from "../controllers/auth.controller.js";
import protectRoute from "../middleware/protectRoute.js";

const router = express.Router();

//when we want to get the current user detail we would want to protect the route so we use this middleware protectRoute to verify the user
router.get('/me' ,protectRoute , getMe); //we are going to use this when user refresh the page and then we check whether the user is logged in or not
 
router.post('/signup', signup);

router.post('/login', login);

router.post('/logout', logout);






export default router;