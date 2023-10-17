import cartReducer, {
  addToCart,
  initialState,
  removeItemOfProductFromCart,
  removeAllItemsOfProductFromCart,
  removeAllProductsFromCart,
} from "../../redux/slices/cartSlice";
import CartItem from "../../types/CartItem";
import productsData from "../data/productsData";

describe("Testing action in cartReducer", () => {
  test("Should add products to cart first time", () => {
    const productToAdd = productsData[0];
    const newState = cartReducer(initialState, addToCart(productToAdd));
    expect(newState.length).toBe(1);
  });

  test("Should update quantity if adding existing product", () => {
    const state: CartItem[] = [
      {
        ...productsData[0],
        quantity: 1,
      },
    ];
    const newState = cartReducer(state, addToCart(productsData[0]));
    expect(newState[0].quantity).toBe(2);
  });

  test("Should update quantity if removing existing product", () => {
    const state: CartItem[] = [
      {
        ...productsData[0],
        quantity: 2,
      },
    ];
    const newState = cartReducer(
      state,
      removeItemOfProductFromCart(productsData[0].id)
    );
    expect(newState[0].quantity).toBe(1);
  });

  test("Should remove product if quantity = 1", () => {
    const state: CartItem[] = [
      {
        ...productsData[0],
        quantity: 1,
      },
    ];
    const newState = cartReducer(
      state,
      removeItemOfProductFromCart(productsData[0].id)
    );
    expect(newState.length).toBe(state.length - 1);
  });

  test("Should remove product even if quality > 1", () => {
    const state: CartItem[] = [
      {
        ...productsData[0],
        quantity: 2,
      },
    ];
    const newState = cartReducer(
      state,
      removeAllItemsOfProductFromCart(productsData[0].id)
    );
    expect(newState.length).toBe(state.length - 1);
  });

  test("Should remove all products from the cart", () => {
    const state: CartItem[] = [
      {
        ...productsData[0],
        quantity: 2,
      },
      {
        ...productsData[1],
        quantity: 1,
      },
    ];
    const newState = cartReducer(state, removeAllProductsFromCart());
    expect(newState.length).toBe(0);
  });

  test("Should return initial state", () => {
    const state = cartReducer(initialState, {
      payload: undefined,
      type: undefined,
    });
    expect(state).toMatchObject(initialState);
  });
});
