import { Router } from "express";
import { loginController } from "../controllers/auth/login.controller";
import { registerController } from "../controllers/auth/register.controller";
import { validateBody } from "../middlewares/auth/validateBody";
import { logoutController } from "../controllers/auth/logout.controller";
import { userInfoController } from "../controllers/auth/userInfo.controller";
import { verifyToken } from "../middlewares/verifyToken";

const router = Router();

router.get("/me", verifyToken, userInfoController);
router.post("/login", validateBody("login"), loginController);
router.post("/register", validateBody("register"), registerController);
router.post("/logout", logoutController);
export default router;
