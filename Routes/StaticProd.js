import { Router } from "express";
import ProductManagerMongo from "../MongoDao/ProductManagerMongo.js"
const productos = new ProductManagerMongo("../Controllers/ProductManagerMongo.js");

const staticProd = Router();

//vista home productos
staticProd.get("/", async (req, res) => {
  const limit = req.query.limit ? parseInt(req.query.limit) : undefined;
  const prodsRaw = await productos.getProducts(limit);
  const prods = prodsRaw.map(item=>item.toObject())
  res.render("home", { productos: prods });
});
export default staticProd;
