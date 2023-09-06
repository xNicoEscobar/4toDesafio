import { Router } from "express";
import ProductManager from "../productManager.js";

const router = Router();
const productManager = new ProductManager("./src/products.json");

let productAdd = {
  title: "Soy un producto",
  descripction: "soy una descripcion",
  price: 3100,
  thumbnail: "soy_una_img.jpg",
  code: 1123,
  stock: 5,
  status: true,
};

router.get("/", async (req, res) => {
  let { limit } = req.query;
  let products = await productManager.getProducts();
  res.send(products.slice(0, limit));
});

router.get("/:pid", async (req, res) => {
  let id = req.params.pid;
  let productId = await productManager.getProductsById(id);
  !productId ? res.status(404).send("Product not found") : res.send(productId);
});

router.post("/", async (req, res) => {
  await productManager.addProduct(productAdd);
  res.send("Added!");
});

router.put("/:pid", async (req, res) => {
  let id = parseInt(req.params.pid);
  let update = req.body;
  await productManager.updateProducts(id, update);
  res.send("Updated product");
});

router.delete("/:pid", async (req, res) => {
  let id = parseInt(req.params.pid);
  await productManager.deleteProduct(id);
  res.send("Deleted Product");
});

export default router;