import mongoose from "mongoose";
// Creamos un esquema (como una plantilla)
// para los productos que vamos a almacenar en MongoDB
// Este esquema define las propiedades y tipos de datos
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  category: {
    type: String,
    default: "Sin categoría",
  },
});
// Está creando una clase llamada Product (modelo de datos), basada en el esquema
//  productSchema.

const Product = mongoose.model("Product", productSchema);

export default Product;
