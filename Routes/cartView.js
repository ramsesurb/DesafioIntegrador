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
  //const id = req.params.id;
  //const prodById = await productos.getByid(id);
  //const prodArray = Array.isArray(prodById) ? prodById : [prodById];
  //const prods = prodArray.map(item => item.toObject());
//
  //console.log(JSON.stringify(prodArray));
  //res.render("singleCart", { productos: prods });

  const cart = await productos.getByid(req.params.id)

  console.log(cart)

  const productsInCart = cart.productos.map(item=> {

    return {
        productid:item.producto.id,
        titulo: item.producto.titulo,
        descripcion: item.producto.descripcion,
        code: item.producto.code,
        precio:item.producto.precio,
        status:item.producto.status,
        stock:item.producto.stock,
        thumbnail: item.producto.thumbnail,
    }
  })

  res.render("singleCart",{productos: productsInCart})


  
});

export default cartView;