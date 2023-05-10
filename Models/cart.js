import mongoose from "mongoose"

const Collection = 'Cart'

const cartSchema = new mongoose.Schema({
  id: {
    type: Number,
    unique: true,
  },
  productos: {
    type: Array,
    default:[],
    required: true,
  }
},{ collection: "Cart" });
  
const cartModel = mongoose.model(Collection, cartSchema);
 

  export default cartModel
