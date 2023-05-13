import { Router } from "express";
import CartManagerMongo from "../MongoDao/CartManagerMongo.js"
const productos = new CartManagerMongo();

const routerCart = Router();

//get productos cart
routerCart.get("/", async (req, res) => {
  const limit = req.query.limit ? parseInt(req.query.limit) : undefined;
  const prods = await productos.getProducts(limit);
  res.send(prods);
});

//create cart
routerCart.post("/", async (req, res) => {
  try {
    await productos.createCart();
    res.send("Carrito creado exitosamente");
  } catch (error) {
    res.status(500).send({ error: "Error al crear el carrito" });
  }
});

//get by id
routerCart.get("/:id", async (req, res) => {
  const id = parseFloat(req.params.id);
  const prodById = await productos.getByid(id);
  res.send(prodById);
});
//save new product
routerCart.post("/:cid/product/:pid", async (req, res) => {
  const cid = parseFloat(req.params.cid);
  const pid = parseFloat(req.params.pid);
  const product = req.body;
  const cart = await productos.addProduct(cid, product, pid);
  res.send(cart);
});

//nuevo put carrito

routerCart.put("/:cid/product/:pid", async (req, res) => {
  const cid = parseFloat(req.params.cid);
  const pid = parseFloat(req.params.pid);
  const product = req.body;
  const cart = await productos.addProduct(cid, product, pid);
  res.send(cart);
});
//delete by id
routerCart.delete("/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const deleteProd = await productos.deleteById(id);
  res.send(deleteProd);
});

export default routerCart;
