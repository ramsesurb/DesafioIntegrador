import cartModel from "../Models/cart.js";
import productoModel from "../Models/mongo.js";
import { promises as fs } from "fs";
class CartManagerMongo {
  async getProducts(limit) {
    try {
      const content = await cartModel.find(limit)
      
    
      if (limit) {
        return content.slice(0, limit);
      }
      return content;
    } catch (error) {
      console.log(error);
      return [];
    }
  }
  async  addProduct(cid, newProducts) {
    try {
      const cart = await cartModel.findOne({ id: cid });
      if (!cart) {
        // Si el carrito no existe, crear uno nuevo con los nuevos productos
        const newCart = await cartModel.create({
          id: cid,
          productos: newProducts
        });
        return newCart;
      }
  
      // Si el carrito ya existe, agregar los nuevos productos al array de productos
      cart.productos.push(...newProducts);
  
      // Guardar los cambios en el carrito
      const updatedCart = await cart.save();
      return updatedCart;
    } catch (error) {
      console.log(error);
      throw error; // Lanzar el error para que sea capturado en el bloque catch de la ruta
    }
  }
  async createCart() {
    try {
      
      const newProduct = {
        id: (Math.floor(Math.random() * 1000) % 1000).toString().padStart(3, '0'),
        productos: [],
      };
      const result = await cartModel.create(newProduct)
      console.log("producto nuevo", newProduct);
      return result
      
    } catch (error) {
      console.log(error);
    }
  }

  async getByid(id) {
    try {
      
      //const getByid =await cartModel.findOne({id:id})

      const getByid = await cartModel.findById(id).populate("productos.producto")
      console.log("producto buscado", getByid);
      return getByid;
    } catch (error) {
      console.log(error);
    }
  }

  async deleteById(id) {
    try {
      const deleteByid = await cartModel.findOneAndDelete({id:id})
      return deleteByid;
    } catch (error) {
      console.log(error);
    }
  }

  async deleteProductById(cid, pid) {
    try {
      const cart = await cartModel.findOneAndUpdate(
        { id: cid },
        { $pull: { productos: { id: pid } } },
        { new: true }
      );
      
      return cart;
    } catch (error) {
      console.log(error);
    }
  }
  async emptyCart(cid) {
    try {
      const cart = await cartModel.updateOne(
        { id: cid },
        { $set: { productos: [] } }
      );
      return cart;
    } catch (error) {
      console.log(error);
    }
  }
  async updateCart(cid, products) {
    try {
      const cart = await cartModel.findOneAndUpdate(
        { id: cid },
        { productos: products },
        { new: true }
      );
      return cart;
    } catch (error) {
      console.log(error);
    }
  }
  async updateProductQuantity(cid, pid, quantity) {
    try {
      const cart = await cartModel.findOneAndUpdate(
        { id: cid, "productos.id": pid },
        { $set: { "productos.$.Quantity": quantity } },
        { new: true }
      );
      return cart;
    } catch (error) {
      console.log(error);
    }
  }
}
 
export default CartManagerMongo;
const rute = new CartManagerMongo();
//rute.createCart()