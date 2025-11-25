import { sql } from "../config/db.js";

export const getProducts = async (req, res) => {
  try {
    const products = await sql`
        SELECT * FROM PRODUCTS
        ORDER BY created_at DESC
    `;
    res.status(200).json({
      success: true,
      data: products,
    });
  } catch (err) {
    console.log(`Error al tratar de buscar los productos: ${err.message}`);
    res.status(500).json({
      success: false,
      message: "Error en el servidor",
    });
  }
};

export const getProductById = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await sql`
        SELECT * FROM PRODUCTS
        WHERE id = ${id}
    `;

    if (product.length === 0) {
      return res.status(404).json({
        success: false,
        message: `Producto con id ${id} no encontrado`,
      });
    }

    res.status(200).json({
      success: true,
      data: product[0],
    });
  } catch (err) {
    console.log(`Error al tratar de buscar los producto: ${err.message}`);
    res.status(500).json({
      success: false,
      message: "Error en el servidor",
    });
  }
};
export const createProduct = async (req, res) => {
  const { name, price, image } = req.body;

  if (!name || !price || !image) {
    return res.status(400).json({
      success: false,
      message: "Todos los campos son requeridos",
    });
  }

  try {
    const newProduct = await sql`
        INSERT INTO PRODUCTS (name, price, image) 
        VALUES (${name}, ${price}, ${image})
        RETURNING *
    `;
    res.status(201).json({
      success: true,
      data: newProduct[0],
    });
  } catch (err) {
    console.log(`Error al tratar de crear producto: ${err.message}`);
    res.status(500).json({
      success: false,
      message: "Error en el servidor",
    });
  }
};
export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, price, image } = req.body;

  if (!name || !price || !image) {
    return res.status(400).json({
      success: false,
      message: "Todos los campos son requeridos",
    });
  }

  try {
    const updatedProduct = await sql`
        UPDATE PRODUCTS SET name = ${name}, price = ${price}, image = ${image}
        WHERE id = ${id}
        RETURNING *
    `;

    if (updatedProduct.length === 0) {
      return res.status(404).json({
        success: false,
        message: `Producto con id ${id} no encontrado`,
      });
    }

    res.status(200).json({
      success: true,
      message: "Producto actualizado",
      data: updatedProduct[0],
    });
  } catch (err) {
    console.log(`Error al tratar de buscar los producto: ${err.message}`);
    res.status(500).json({
      success: false,
      message: "Error en el servidor",
    });
  }
};
export const deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedProduct = await sql`
        DELETE FROM PRODUCTS WHERE id = ${id}
        RETURNING *
    `;

    if (deletedProduct.length === 0) {
      return res.status(404).json({
        success: false,
        message: `Producto con id ${id} no encontrado`,
      });
    }

    res.status(200).json({
      success: true,
      message: "Producto eliminado",
      data: deleteProduct[0],
    });
  } catch (err) {
    console.log(`Error al tratar de buscar los producto: ${err.message}`);
    res.status(500).json({
      success: false,
      message: "Error en el servidor",
    });
  }
};
