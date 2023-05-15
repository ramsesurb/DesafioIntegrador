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
  //const cart = await cartModel.findById(uid).populate("products.product").lean();
  const prods = prodsRaw.map(item=>item.toObject())
  console.log(prods)
  res.render("carts", { productos: prods });
});
cartView.get("/:id", async (req, res) => {
  const id = parseFloat(req.params.id);
  const prodById = await productos.getByid(id);
  console.log(JSON.stringify(prods.producto))
  res.render("singleCart", { productos: prodById });
});
cartView.get
export default cartView;