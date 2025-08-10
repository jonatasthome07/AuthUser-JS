import express from "express"
import UserController from "../controllers/UserController.js"
const router = express.Router()

router.get("/login", UserController.login)
router.post("/loginPost", UserController.loginPost)
router.get("/register", UserController.register)
router.post("/registerPost", UserController.registerPost)

export default router