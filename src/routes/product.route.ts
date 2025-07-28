import { Router } from "express";
import { addProduct, deleteProduct, getProducts, updateProduct } from "../controllers/product.controller";
import { applyRole } from "../middlewares/role.middleware";
import { validateFields } from "../middlewares/validateFields.middleware";
import { authenticateToken } from "../middlewares/token.middleware";
import { checkBlacklist } from "../middlewares/blacklist.middleware";

const productRoutes = Router();

productRoutes.post("/", [authenticateToken, checkBlacklist, applyRole("admin"), validateFields("name", "description", "stock", "price")], addProduct);
productRoutes.put("/:id", [authenticateToken, checkBlacklist, applyRole("admin"), validateFields("name", "description", "stock", "price")], updateProduct);
productRoutes.delete("/:id", [authenticateToken, checkBlacklist, applyRole("admin")], deleteProduct);
productRoutes.get("/all", [authenticateToken, checkBlacklist, applyRole("user", "admin")], getProducts);

export default productRoutes;
