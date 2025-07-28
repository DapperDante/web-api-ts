import { Router } from "express";
import { login, logout, signup } from "../controllers/user.controller";
import { validateFields } from "../middlewares/validateFields.middleware";
import { authenticateToken } from "../middlewares/token.middleware";

const userRoutes = Router();

userRoutes.post("/login", validateFields("username", "password"), login);
userRoutes.post("/signup", validateFields("username", "email", "password"), signup);
userRoutes.post("/logout", authenticateToken, logout);

export default userRoutes;
