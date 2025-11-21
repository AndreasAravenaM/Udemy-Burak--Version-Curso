import mongoose from "mongoose";
import Product from "../models/product.model.js";
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json({
      success: true,
      data: products,
    });
  } catch (err) {
    console.log("Error al tratar de buscar los productos: ", err.message);
    res.status(500).json({
      success: false,
      message: "Error en el servidor",
    });
  }
};

export const getProductById = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findById(id);
    res.status(200).json({
      success: true,
      data: product,
    });
  } catch (err) {
    console.log("Error al tratar de buscar el producto: ", err.message);
    res.status(500).json({
      success: false,
      message: "Error en el servidor",
    });
  }
};

export const createProduct = async (req, res) => {
  const product = req.body;

  if (!product.name || !product.price || !product.image) {
    return res.status(400).json({
      success: false,
      message: "Favor de ingresar completar cada campo",
    });
  }

  const newProduct = new Product(product);

  try {
    await newProduct.save();
    res.status(201).json({
      success: true,
      data: newProduct,
    });
  } catch (err) {
    console.log("Error al tratar de crear producto: ", err.message);
    res.status(500).json({
      success: false,
      message: "Error en el servidor",
    });
  }
};

export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const product = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({
      success: false,
      message: "Producto no encontrado",
    });
  }

  try {
    const updatedProduct = await Product.findByIdAndUpdate(id, product, {
      new: true,
    });
    res.status(200).json({
      success: true,
      message: "Producto actualizado",
      data: updatedProduct,
    });
  } catch (err) {
    console.log("Error al tratar de modificar el producto: ", err.message);
    res.status(400).json({
      success: false,
      message: "Error en el servidor",
    });
  }
};

export const deleteProduct = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({
      success: false,
      message: "Producto no encontrado",
    });
  }

  try {
    await Product.findByIdAndDelete(id);
    res.status(200).json({
      success: true,
      message: "Producto eliminado",
    });
  } catch (err) {
    console.log("Error al tratar de eliminar producto: ", err.message);
    res.status(404).json({
      success: false,
      message: "Error en el servidor",
    });
  }
};
