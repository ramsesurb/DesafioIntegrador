import { Router } from "express";
import ProductManagerMongo from "../MongoDao/ProductManagerMongo.js";
import productoModel from "../Models/mongo.js";

const productos = new ProductManagerMongo("../Controllers/ProductManagerMongo.js");
const staticProd = Router();

staticProd.get("/", async (req, res) => {
<<<<<<< HEAD
  const { page = 1, limit: queryLimit, sort, descripcion } = req.query;

  // Obtener los productos paginados de Mongoose
  const options = { limit: 6, page, lean: true };

  if (queryLimit) {
    options.limit = parseInt(queryLimit);
  }

  if (sort) {
    options.sort = sort;
  }

  // Construir la consulta para incluir la descripción si se proporciona
  const query = {};
  if (descripcion) {
    query.descripcion = descripcion;
  }

  const { docs, hasPrevPage, hasNextPage, nextPage, prevPage } = await productoModel.paginate(query, options);

  // Obtener los productos de MongoDB
  const prodsRaw = await productos.getProducts(queryLimit, sort);
  const prods = prodsRaw.map(item => item.toObject());

  res.render("home", {
    productos: docs,
    hasPrevPage,
    hasNextPage,
    prevPage,
    nextPage
  });
=======
  const {page = 1} = req.query;
  const limit = req.query.limit ? parseInt(req.query.limit) : undefined;
  const prodsRaw = await productos.getProducts(limit);
  //const prods = prodsRaw.map(item=>item.toObject())
  
  const {docs, hasPrevPage, hasNextPage, nextPage, prevPage} = await productoModel.paginate({},{limit:6, page, lean:true})
  const prods = docs
  res.render("home", { productos: prods ,
        hasPrevPage,
        hasNextPage,
        prevPage,
        nextPage});
>>>>>>> f46dedc685133cfb073031e8829e249d474cc122
});


export default staticProd;