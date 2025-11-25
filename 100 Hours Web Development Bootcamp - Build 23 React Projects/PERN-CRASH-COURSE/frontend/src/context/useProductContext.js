import { create } from "zustand";
import axios from "axios";
import toast from "react-hot-toast";

const BASE_URL = "http://localhost:3000";

export const useProductContext = create((set, get) => ({
  products: [],
  loading: false,
  success: false,
  message: null,
  currentProduct: null,

  formData: {
    name: "",
    price: "",
    image: "",
  },

  setFormData: (formData) => set({ formData }),
  resetForm: () => set({ formData: { name: "", price: "", image: "" } }),

  getProducts: async () => {
    set({ loading: true });

    try {
      const res = await axios.get(`${BASE_URL}/api/products`);
      set({
        products: res.data.data,
        success: true,
        message: null,
      });
    } catch (err) {
      if (err.status == 429) {
        set({
          success: false,
          message: "Demasiadas solicitudes",
          products: [],
        });
      } else {
        set({
          success: false,
          message: "Error en el servidor",
          products: [],
        });
      }
    } finally {
      set({ loading: false });
    }
  },

  getProduct: async (id) => {
    set({ loading: true });

    try {
      const res = await axios.get(`${BASE_URL}/api/products/${id}`);
      set({
        currentProduct: res.data.data,
        formData: res.data.data,
        success: true,
        message: null,
      });
    } catch (err) {
      console.log(`Error al tratar de buscar el producto: ${err}`);
      toast.error("Error en el servidor");
    } finally {
      set({ loading: false });
    }
  },

  createProduct: async (e) => {
    e.preventDefault();
    set({ loading: true });

    try {
      const { formData } = get();
      await axios.post(`${BASE_URL}/api/products`, formData);
      toast.success("Producto creado");
      await get().getProducts();
      get().resetForm();
      document.getElementById("add_product_modal").close();
    } catch (err) {
      console.log(`Error al tratar de crear el producto: ${err}`);
      toast.error("Error en el servidor");
    } finally {
      set({ loading: false });
    }
  },

  updateProduct: async (id) => {
    set({ loading: true });

    try {
      const { formData } = get();
      const res = await axios.patch(`${BASE_URL}/api/products/${id}`, formData);
      set({ currentProduct: res.data.data });
      console.log("Este es el current product: " + res.data.data.created_at);
      toast.success("Producto modificado");
    } catch (err) {
      console.log(`Error al tratar de modificar el producto: ${err}`);
      toast.error("Error en el servidor");
    } finally {
      set({ loading: false });
    }
  },

  deleteProduct: async (id) => {
    set({ loading: true });

    try {
      const res = await axios.delete(`${BASE_URL}/api/products/${id}`);
      set((state) => ({
        products: state.products.filter((product) => product.id !== id),
      }));
      toast.success("Producto eliminado");
    } catch (err) {
      console.log(`Error al tratar de eliminar el producto: ${err}`);
      toast.error("Error en el servidor");
    } finally {
      set({ loading: false });
    }
  },
}));
