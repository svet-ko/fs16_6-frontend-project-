import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import CartItem from "../../types/CartItem";
import Product from "../../types/Product";

export const initialState: CartItem[] = [];

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Product>) => {
      const foundIndex = state.findIndex(item => item.id === action.payload.id)
      if (foundIndex !== -1) {
        state[foundIndex].quantity++
      } else {
        const cartItem: CartItem = { ...action.payload, quantity: 1 };
        state.push(cartItem);
      }  
    },

    removeFromCart: (state, action: PayloadAction<number>) => {
      const indexOfProductToRemove = state.findIndex(item => item.id === action.payload);
      const itemToRemove = state[indexOfProductToRemove];
      if (itemToRemove.quantity > 1) {
        itemToRemove.quantity--
      } else {
        state.splice(indexOfProductToRemove, 1);
      }
    },

    removeAllItemsOfProductFromCart: (state, action: PayloadAction<number>) => {
      const indexOfProductToRemove = state.findIndex(item => item.id === action.payload);
      state.splice(indexOfProductToRemove, 1);
    },

    removeAllProductsFromCart: (state, action: PayloadAction<boolean>) => {
      if (action.payload) {
        return [];
      }
    }
  }
})

const cartReducer = cartSlice.reducer;

export const { addToCart, removeFromCart, removeAllItemsOfProductFromCart, removeAllProductsFromCart } = cartSlice.actions;
export default cartReducer;