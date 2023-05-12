import { Router } from "express";
import ProductManagerMongo from "../MongoDao/ProductManagerMongo.js"
import productoModel from "../Models/mongo.js";
const productos = new ProductManagerMongo();

const staticProd = Router();

//vista home productos
staticProd.get("/", async (req, res) => {
  const { page = 1 } = req.query;

  //const limit = req.query.limit ? parseInt(req.query.limit) : undefined;
  //const prodsRaw = await productos.getProducts();
  //const prods = prodsRaw.map(item=>item.toObject())

  const { docs, hasPrevPage, hasNextPage, nextPage, prevPage } = await productoModel.paginate({}, { limit: 6, page, lean: true })
  const prods = docs
  console.log("nextPage:", nextPage, hasNextPage)
  res.render("home",
   { productos: prods ,
    hasPrevPage,
    hasNextPage,
    prevPage,
    nextPage, })

  console.log("prevPage:", prevPage, hasPrevPage);
  ;
});


export default staticProd;
