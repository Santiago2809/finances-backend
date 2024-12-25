import { Router } from "express";
import { verifyToken } from "../middlewares/verifyToken";
import { getCategoriesController } from "../controllers/categories/getCategories.controller";
import { getCategoryController } from "../controllers/categories/getCategory.controller";

const router = Router({ mergeParams: true });
router.use(verifyToken);

//* GET /categories/ - Get all user categories.
router.get("/", getCategoriesController);

//* GET /categories/:id - Get an especific category.
router.get("/:id", getCategoryController);

export default router;
