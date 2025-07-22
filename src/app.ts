import express from "express";
import helmet from "helmet";
import compression from "compression";
import responseTime from "response-time";
import mainRoutes from "./routes/main.route";
import userRoutes from "./routes/user.route";
import productRoutes from "./routes/product.route";
import healthRoutes from "./routes/health.route";
import { errorHandler } from "./middlewares/error.middleware";
import {
	corsMiddleware,
	timeoutsMiddleware,
	rateLimiterMiddleware,
	limitPayloadSizeMiddleware,
} from "./middlewares/security.middleware";

const app = express();

// Middleware
app.use(responseTime());
app.use(helmet());
app.use(corsMiddleware);
app.use(rateLimiterMiddleware);
app.use(timeoutsMiddleware);
app.use(limitPayloadSizeMiddleware);
app.use(compression());

// Routes
app.use("/", mainRoutes);
app.use("/health", healthRoutes);
app.use("/api/user", userRoutes);
app.use("/api/product", productRoutes);

// Error handling middleware
app.use(errorHandler);

export default app;
