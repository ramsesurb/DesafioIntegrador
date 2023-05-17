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
          
      }
  ],
  default: []
  }
},{ collection: "Cart" });

cartSchema.pre('findById', function(){
  this.populate("productos.producto");
})
const cartModel = mongoose.model(Collection, cartSchema);
 

  export default cartModel
