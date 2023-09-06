import { Router } from "express";
import ProductManager from "../productManager.js";

const router = Router();
const productManager = new ProductManager("./src/products.json");

router.get('/', async (req, res) => {
    req.context.socketServer.emit();
    const products = await productManager.getProducts();
    res.render('home', { products });
})

export default router;