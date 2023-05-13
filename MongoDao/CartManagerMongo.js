import cartModel from "../Models/cart.js";
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

  async createCart() {
    try {
      
      const newProduct = {
        id: (Math.floor(Math.random() * 1000) % 1000).toString().padStart(3, '0'),
        productos: [{ "id": 4}],
      };
      const result = await cartModel.create(newProduct)
      console.log("producto nuevo", newProduct);
      return result
      
    } catch (error) {
      console.log(error);
    }
  }

  async addProduct(cid, product, pid) {
    try {
      const cart = await this.getProducts();
      const cartIndex = cart.findIndex(c => c.id === cid);
      
      if (cartIndex === -1) {
        return { error: "El carrito no existe" };
      }
      
      const existingProductIndex = cart[cartIndex].productos.findIndex(
        p => p.id === pid
      );
  
      if (existingProductIndex !== -1) {
        cart[cartIndex].productos[existingProductIndex].Quantity++;
      } else {
        const newProduct = {
          id: pid,
          Quantity: 1,
        };
        cart[cartIndex].productos.push(newProduct);
      }
  
      const groupedProducts = cart.reduce((accumulator, current) => {
        const index = accumulator.findIndex(
          (product) => product.products.id === current.products.id
        );
  
        if (index === -1) {
          accumulator.push(current);
        } else {
          accumulator[index].Quantity += current.Quantity;
        }
  
        return accumulator;
      }, []);
  
      await fs.writeFile(
        `./Data/Cart.json`,
        JSON.stringify(groupedProducts, null, 2)
      );
  
      console.log("producto nuevo", product);
    } catch (error) {
      console.log(error);
      return { error: "Error al agregar el producto al carrito" };
    }
  }
  

  async getByid(id) {
    try {
      
      const getByid =await cartModel.findOne({id:id})
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
