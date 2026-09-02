import { Router } from "express";
import multer from "multer";
import ProductController from "./app/controllers/ProductController.js";
import UserController from "./app/controllers/UserController.js";
import SessionController from "./app/controllers/SessionController.js";
import multerConfig from "./config/multer.cjs";
import authMiddleware from "./app/middlewares/auth.js";
import CategoryController from "./app/controllers/CategoryController.js";
import adminMiddleware from "./app/middlewares/admin.js";
import OrderController from "./app/controllers/OrderController.js";
import CreateCheckoutSession from "./app/controllers/stripe/CreateCheckoutSession.js";
import SessionStatus from "./app/controllers/stripe/SessionStatus.js";

const routes = new Router();

const upload = multer(multerConfig)

routes.post("/users", UserController.store);
routes.post("/session", SessionController.store);

routes.use(authMiddleware);
routes.post("/products", adminMiddleware, upload.single("file"), ProductController.store);
routes.put("/products/:id", adminMiddleware, upload.single("file"), ProductController.update);
routes.get("/products", ProductController.index);

routes.post("/categories", adminMiddleware, upload.single("file"), CategoryController.store);
routes.get("/categories", CategoryController.index);
routes.put("/categories/:id", adminMiddleware, upload.single("file"), CategoryController.update);

routes.get("/orders", OrderController.index);
routes.post("/orders", OrderController.store);
routes.put("/orders/:id", adminMiddleware, OrderController.update);

routes.post("/create-checkout-session", CreateCheckoutSession.store);
routes.get("/session-status", SessionStatus.show);

export default routes;
