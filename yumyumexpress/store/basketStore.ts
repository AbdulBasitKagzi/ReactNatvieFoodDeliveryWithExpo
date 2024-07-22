import { create } from "zustand";

export interface Product {
  id: number;
  name: string;
  price: number;
  info: string;
  img: any;
}
export interface BasketState {
  products: Array<Product & { quantity: number }>;
  items: number;
  total: number;
  addProduct: (product: Product) => void;
  reduceProduct: (product: Product) => void;
  clearCart: () => void;
}
const useBasketStore = create<BasketState>()((set) => ({
  products: [],
  items: 0,
  total: 0,
  addProduct: (product) => {
    set((state) => {
      state.items = state.items + 1;
      state.total += product.price;
      const hasProduct = state.products.findIndex((p) => p.id === product.id);
      if (hasProduct !== -1) {
        state.products[hasProduct].quantity += 1;
      } else {
        state.products.push({ ...product, quantity: 1 });
      }
      return state.products;
    });
  },
  reduceProduct: (product) => {
    set((state) => {
      state.items = state.items - 1;
      state.total -= product.price;
      const hasProduct = state.products.findIndex((p) => p.id === product.id);
      if (hasProduct !== -1) {
        if (state.products[hasProduct].quantity > 1) {
          state.products[hasProduct].quantity -= 1;
        } else {
          state.products.splice(hasProduct, 1);
        }
      }
      return state.products;
    });
  },
  clearCart: () => {
    set((state) => {
      state.products = [];
      state.items = 0;
      state.total = 0;
      return state.products;
    });
  },
}));

export default useBasketStore;
