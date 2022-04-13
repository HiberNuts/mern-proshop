import express from "express";
import { getProducts, getProductsById } from "../controllers/productController.js";
const router = express.Router();

//Fetch all products

router.route("/").get(getProducts);

router.route("/:id").get(getProductsById);

export default router;
