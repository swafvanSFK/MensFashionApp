import { create } from "zustand";
import axios from "axios";
import summeryApi from "../api/index";
import { toast } from "react-toastify";

const useOpenAddProduct = create((set) => ({
  openAddProduct: false,
  setOpenAddProduct: () =>
    set((state) => ({ openAddProduct: !state.openAddProduct })),
}));

const useOpenEditProduct = create((set) => ({
  openEditProduct: false,
  setOpenEditProduct: () =>
    set((state) => ({ openEditProduct: !state.openEditProduct })),
}));

const useOpenDeleteProduct = create((set) => ({
  openDeleteProduct: false,
  setOpenDeleteProduct: () =>
    set((state) => ({ openDeleteProduct: !state.openDeleteProduct })),
}));

const useCategoryStore = create((set) => ({
  categories: [],
  setCategories: async () => {
    try {
      const response = await axios.get(summeryApi.getAllCategories.url, {
        withCredentials: true,
      });
      set({ categories: response.data });
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  },
}));

const useGetAllProducts = create((set) => ({
  allProducts: [],
  setAllProducts: async (sort, order) => {
    try {
      const response = await axios.get(summeryApi.getAllProducts.url, {
        params: {
          sort: sort,
          order: order,
        },
        withCredentials: true,
      });
      set({ allProducts: response?.data?.products });
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  },
}));

const useGetProduct = create((set) => ({
  getProduct: null,
  setGetProduct: async (id) => {
    try {
      set({ getProduct: null });
      const response = await axios.get(summeryApi.getProductById.url + id, {
        withCredentials: true,
      });
      set({ getProduct: response.data });
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  },
}));

const useDeleteProduct = create((set) => ({
  deleteProductId: null,
  setDeleteProductId: (id) => set({ deleteProductId: id }),
  deleteProduct: null,
  setDeleteProduct: async (id) => {
    try {
      const response = await axios.delete(summeryApi.deleteProduct.url + id, {
        withCredentials: true,
      });
      set({ deleteProduct: response?.data });
      toast.success(response.data.message);
    } catch (error) {
      console.error("Error deleting products:", error);
    }
  },
}));

const useGetAllCategories = create((set) => ({
  categories: null,
  setAllCategories: async () => {
    const response = await axios.get(summeryApi.getAllCategories.url, {
      withCredentials: true,
    });
    set({ categories: response.data });
  },
}));

const useProductId = create((set) => ({
  productId: null,
  setProductId: (id) => {
    set({ productId: id });
  },
}));

const useFetchAllReviews = create((set) => ({
  showReview: [],
  setShowReview: async (id) => {
    try {
      const response = await axios.get(summeryApi.getAllReviews.url + id);
      set({ showReview: response.data });
    } catch (error) {
      console.log("Error fetching reviews : ", error);
    }
  },
}));

export {
  useOpenAddProduct,
  useOpenEditProduct,
  useOpenDeleteProduct,
  useCategoryStore,
  useGetAllProducts,
  useGetProduct,
  useDeleteProduct,
  useGetAllCategories,
  useProductId,
  useFetchAllReviews,
};
