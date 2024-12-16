import { Router } from "express";
import { loginController } from "../controllers/auth/login.controller";
import { registerController } from "../controllers/auth/register.controller";
import { validateBody } from "../middlewares/auth/validateBody";

const router = Router();

router.post("/login", validateBody("login"), loginController);
router.post("/register", validateBody("register"), registerController);

export default router;
