import { Router } from "express";
import ProductManagerMongo from "../MongoDao/ProductManagerMongo.js"
const productos = new ProductManagerMongo("../Controllers/ProductManagerMongo.js");
import productoModel from "../Models/mongo.js";

const routerProd = Router();

//getAll productos
routerProd.get("/", async (req, res) => {
  const limit = req.query.limit ? parseInt(req.query.limit) : undefined;
  const sort = req.query.sort || undefined;
  const descripcion = req.query.descripcion || undefined;

  const prodsRaw = await productos.getProducts(limit, sort, descripcion);
  const prods = prodsRaw.map(item => item.toObject());

  res.send(prods);
});
//get by id
routerProd.get("/:id", async (req, res) => {
  const id = parseFloat(req.params.id);
  const prodById = await productos.getByid(id);
  res.send(prodById);
});
//save new product
routerProd.post("/", async (req, res) => {
  const prod = req.body;
  const saveProd = await productos.addProduct(prod);
  res.status(201).json(saveProd);
  res.send(saveProd);
});
//delete by id
routerProd.delete("/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const deleteProd = await productos.deleteById(id);
  res.send(deleteProd);
});


export default routerProd;