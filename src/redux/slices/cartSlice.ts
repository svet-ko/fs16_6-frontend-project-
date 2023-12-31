import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import CartItem from "../../types/CartItem";
import Product from "../../types/Product";

export const initialState: CartItem[] = [];

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Product>) => {
      const foundIndex = state.findIndex(
        (item) => item._id === action.payload._id
      );
      if (foundIndex !== -1) {
        state[foundIndex].quantity++;
      } else {
        const cartItem: CartItem = { ...action.payload, quantity: 1 };
        state.push(cartItem);
      }
    },

    removeItemOfProductFromCart: (state, action: PayloadAction<string>) => {
      const indexOfProductToRemove = state.findIndex(
        (item) => item._id === action.payload
      );
      if (indexOfProductToRemove !== -1) {
        const itemToRemove = state[indexOfProductToRemove];
        if (itemToRemove.quantity > 1) {
          itemToRemove.quantity--;
        } else {
          state.splice(indexOfProductToRemove, 1);
        }
      }
    },

    removeAllItemsOfProductFromCart: (state, action: PayloadAction<string>) => {
      const indexOfProductToRemove = state.findIndex(
        (item) => item._id === action.payload
      );
      state.splice(indexOfProductToRemove, 1);
    },

    removeAllProductsFromCart: (state) => {
      return [];
    },
  },
});

const cartReducer = cartSlice.reducer;

export const {
  addToCart,
  removeItemOfProductFromCart,
  removeAllItemsOfProductFromCart,
  removeAllProductsFromCart,
} = cartSlice.actions;
export default cartReducer;
