import { Router } from "express";
import CartManagerMongo from "../MongoDao/CartManagerMongo.js"
import ProductManagerMongo from "../MongoDao/ProductManagerMongo.js";
const productos = new CartManagerMongo();
const prods = new ProductManagerMongo();

const cartView = Router();


//vista home productos

cartView.get("/", async (req, res) => {
  const limit = req.query.limit ? parseInt(req.query.limit) : undefined;
  const prodsRaw = await productos.getProducts(limit);
  const prods = prodsRaw.map(item=>item.toObject())
  console.log(prods)
  res.render("cart", { productos: prods });
});
export default cartView;