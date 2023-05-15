import mongoose from "mongoose"

const Collection = 'Cart'

const cartSchema = new mongoose.Schema({
  id: {
    type: Number,
    unique: true,
  },
  productos: {
    type: [
      {
          producto: {
              type: mongoose.Schema.Types.ObjectId,
              ref:"products"
          },
          quantity: Number,
          _id: String
      }
  ],
  default: []
  }
},{ collection: "Cart" });

schema.plugin(mongoosePaginate)
  
const cartModel = mongoose.model(Collection, cartSchema);
 

  export default cartModel
