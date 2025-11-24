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

  createProduct: async (e) => {
    e.preventDefault();
    set({ loading: true });

    try {
      const { formData } = get();
      await axios.post(`${BASE_URL}/api/products`, formData);
      resetForm();
      toast.success("Producto creado");
      await get().fetchProducts();
      get().resetForm();
    } catch (err) {
      console.log(`Error al tratar de crear el producto: ${err}`);
      toast.error("Error en el servidor");
    } finally {
      set({ loading: false });
    }
  },

  deleteProduct: async (id) => {
    set({ loading: true });

    try {
      await axios.delete(`${BASE_URL}/api/products/${id}`);
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
