import { Router } from "express";
import ProductManagerMongo from "../MongoDao/ProductManagerMongo.js"
import productoModel from "../Models/mongo.js";
const productos = new ProductManagerMongo("../Controllers/ProductManagerMongo.js");

const staticProd = Router();

//vista home productos
staticProd.get("/", async (req, res) => {
  const {page = 1} = req.query;
  const limit = req.query.limit ? parseInt(req.query.limit) : undefined;
  const prodsRaw = await productos.getProducts(limit);
  const prods = prodsRaw.map(item=>item.toObject())

  const {docs, hasPrevPage, hasNextPage, nextPage, prevPage   } = await productoModel.paginate({},{limit:4, page, lean:true})
  res.render("home", { productos: prods },
  hasPrevPage,
        hasNextPage,
        prevPage,
        nextPage);
});
export default staticProd;
