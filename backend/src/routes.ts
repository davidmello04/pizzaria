import { Router } from "express";
import multer from "multer";

import { CreateUserController } from "./controllers/user/CreateUserController";
import { DetailUserController } from "./controllers/user/DetailUserController";
import { AuthController } from "./controllers/user/AuthController";

import { isAuthenticated } from "./middlewares/isAuthenticated";

import { CreateCategoryController } from "./controllers/category/CreateCategoryController";
import { ListCategoryController } from "./controllers/category/ListCategoryController";
import { ListByCategoryController } from "./controllers/product/ListByCategoryController";

import { CreateProductController } from "./controllers/product/CreateProductController";

import { CreateOrderController } from "./controllers/order/CreateOrderController";
import { RemoveOrderController } from "./controllers/order/RemoveOrderController";

import uploadConfig from "./config/multer"

import { AddItemController } from "./controllers/order/AddItemController";
import { RemoveItemController } from "./controllers/order/RemoveItemController";

const router = Router();

const upload = multer(uploadConfig.upload("./tmp"))

//-- ROTAS USER --
router.post("/users", new CreateUserController().handle);

router.post("/session", new AuthController().handle);

router.get("/me", isAuthenticated, new DetailUserController().handle);

// -- ROTAS CATEGORY --
router.post("/category", isAuthenticated, new CreateCategoryController().handle)

router.get("/category", isAuthenticated, new ListCategoryController().handle)

// -- ROTAS PRODUCT --
router.post("/product", isAuthenticated, upload.single('file'), new CreateProductController().handle)

router.get("/category/product", isAuthenticated, new ListByCategoryController().handle);

// -- ROTAS ORDER --
router.post("/order", isAuthenticated, new CreateOrderController().handle)
router.delete("/order", isAuthenticated, new RemoveOrderController().handle)

router.post("/order/add", isAuthenticated, new AddItemController().handle)
router.delete("/order/remove", isAuthenticated, new RemoveItemController().handle)


export { router };
