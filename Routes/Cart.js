import { Router } from "express";
import CartManagerMongo from "../MongoDao/CartManagerMongo.js"
import ProductManagerMongo from "../MongoDao/ProductManagerMongo.js";
const productos = new CartManagerMongo();
const prods = new ProductManagerMongo();

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
//delete productos del array by id
routerCart.delete("/:cid/productos/:pid", async (req, res) => {
  const cid = parseFloat(req.params.cid);
  const pid = parseFloat(req.params.pid);
  
  const cart = await productos.deleteProductById(cid, pid);
  res.send(cart);
});
//vaciar carito
routerCart.delete("/:cid", async (req, res) => {
  const cid = parseFloat(req.params.cid);
  const cart = await productos.emptyCart(cid);
  res.send(cart);
});

//actualizar carrito
routerCart.put("/:cid", async (req, res) => {
  const cid = parseFloat(req.params.cid);
  const products = req.body.productos;
  const cart = await productos.updateCart(cid, products);
  res.send(cart);
});

routerCart.put("/:cid/products/:pid", async (req, res) => {
  const cid = parseFloat(req.params.cid);
  const pid = parseFloat(req.params.pid);
  const quantity = req.body.quantity;

  const cart = await productos.updateProductQuantity(cid, pid, quantity);
  res.send(cart);
});

routerCart.get("/:cid", async (req, res) => {
  const prodlist = await prods.getProducts();
  const cid = parseFloat(req.params.cid);

  try {
   

    res.send(cart);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//delete by id
//routerCart.delete("/:id", async (req, res) => {
//  const id = parseInt(req.params.id);
//  const deleteProd = await productos.deleteById(id);
//  res.send(deleteProd);
//});
export default routerCart;
