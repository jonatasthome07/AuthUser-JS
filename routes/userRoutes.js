import express from "express"
import UserController from "../controllers/UserController.js"
import checkAuth from "../helpers/checkAuth.js"
const router = express.Router()

router.get("/login",checkAuth ,UserController.login)
router.post("/loginPost", checkAuth,UserController.loginPost)
router.get("/register", UserController.register)
router.post("/registerPost", UserController.registerPost)

export default router