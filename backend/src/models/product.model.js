
const mongoose  = require("mongoose");

const {Schema} = mongoose

const productSchema = new Schema(
    {
    name:{ type:String, required:true},
    price:{ type:Number, required:true},
    description:{ type: String, default: " El vendedor no ha anadido una descripcion"},
    image:{ type: String, default:"Sin imagen adjunta"},
    stock:{ type: Number, default:0},
    keyWords:{ type: Array, default:[]}
},
    { 
        versionKey:false,
        timestamps:true
    }
)

module.exports = mongoose.model("product", productSchema)

