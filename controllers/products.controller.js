// controllers/products.controller.js
import Product from "../models/product.js";

export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch {
    res.status(500).json({ error: "Error al obtener productos" });
  }
};

export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product)
      return res.status(404).json({ error: "Producto no encontrado" });
    res.json(product);
  } catch {
    res.status(400).json({ error: "ID inválido o error al buscar" });
  }
};

export const createProduct = async (req, res) => {
  try {
    const { name, price, category } = req.body;
    if (!name || !price)
      return res.status(400).json({ error: "Faltan campos obligatorios" });

    const newProduct = new Product({ name, price, category });
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json({ error: error.message });
    }
    res.status(500).json({ error: "Error al crear producto" });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const updated = await Product.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    });

    if (!updated)
      return res.status(404).json({ error: "Producto no encontrado" });
    res.json({ message: "Producto actualizado", updated });
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json({ error: error.message });
    }
    if (error.name === "CastError") {
      return res.status(400).json({ error: "ID inválido" });
    }
    res.status(500).json({ error: "Error al actualizar producto" });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Product.findByIdAndDelete(id);
    if (!deleted)
      return res
        .status(404)
        .json({ error: "Producto no encontrado para eliminar" });

    res.json({ message: "Producto eliminado correctamente", deleted });
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({ error: "ID inválido" });
    }
    res.status(500).json({ error: "Error al eliminar producto" });
  }
};
