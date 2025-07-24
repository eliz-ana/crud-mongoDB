import mongoose from "mongoose";

// Creamos un esquema (como una plantilla)
// para los productos que vamos a almacenar en MongoDB
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "El nombre del producto es obligatorio"],
    unique: true,
    trim: true,
    minlength: [3, "El nombre debe tener al menos 3 caracteres"],
  },
  price: {
    type: Number,
    required: [true, "El precio es obligatorio"],
    min: [0, "El precio no puede ser negativo"],
  },
  category: {
    type: String,
    default: "Sin categoría",
    // Validamos que la categoría sea una de las opciones predefinidas
    enum: {
      values: [
        "tecnología",
        "ropa",
        "hogar",
        "alimentos",
        "otros",
        "Sin categoría",
      ],
      message: "Categoría no válida",
    },
  },
});

// Creamos el modelo llamado Product, basado en el esquema productSchema
const Product = mongoose.model("Product", productSchema);

export default Product;
