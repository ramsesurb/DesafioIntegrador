import { Router } from "express";
import CartManagerMongo from "../MongoDao/CartManagerMongo.js"
import ProductManagerMongo from "../MongoDao/ProductManagerMongo.js";
import cartModel from "../Models/cart.js";
const productos = new CartManagerMongo();
const prods = new ProductManagerMongo();

const cartView = Router();


//vista home productos

cartView.get("/", async (req, res) => {
  const limit = req.query.limit ? parseInt(req.query.limit) : undefined;
  const prodsRaw = await productos.getProducts(limit);
 
  const prods = prodsRaw.map(item=>item.toObject())
  console.log(prods)
  res.render("carts", { productos: prods });
});
cartView.get("/:id", async (req, res) => {
  const id = parseFloat(req.params.id);
  const prodById = await productos.getByid(id);
  const prodArray = Array.isArray(prodById) ? prodById : [prodById];
  const prods = prodArray.map(item => item.toObject());

  console.log(JSON.stringify(prodArray));
  res.render("singleCart", { productos: prods });
});
cartView.get
export default cartView;