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
              ref:"Products"
          },
          quantity: Number,
          _id: String
      }
  ],
  default: []
  }
},{ collection: "Cart" });

cartSchema.pre('find', function(){
    this.populate("productos.producto");
})
const cartModel = mongoose.model(Collection, cartSchema);
 

  export default cartModel
