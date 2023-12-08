import { jwtFixture } from "../../config/jwtFixture";
import { createOrderAsync, fetchOrdersAsync } from "../../redux/slices/orderSlice";
import { createStore } from "../../redux/store";
import OrderItem from "../../types/OrderItem";
import productsData from "../data/productsData";
import ordersServer from "../shared/ordersServer";

let store = createStore();

beforeEach(() => {
  store = createStore();
});

// Enable API mocking before tests.
beforeAll(() => ordersServer.listen());

// Reset any runtime request handlers we may add during the tests.
afterEach(() => ordersServer.resetHandlers());

// Disable API mocking after the tests are done.
afterAll(() => ordersServer.close());

describe("Test async thunk actions in ordersReducer", () => {
  test("Should fetch all orders", async () => {
    await store.dispatch(fetchOrdersAsync(jwtFixture.access_token));
    const orders = store.getState().ordersReducer.orders.length;
    const loadingState = store.getState().ordersReducer.loading;
    expect(orders).toBeGreaterThan(0);
    expect(loadingState).toBe(false);
  });

  test("Should not fetch all orders with wrong jwt", async () => {
    const resultAction = await store.dispatch(fetchOrdersAsync('wrong'));
    expect(resultAction.payload).toBe("Access forbidden");
    const loadingState = store.getState().ordersReducer.loading;
    expect(loadingState).toBe(false);
  });

  test("Should create and return order", async () => {
    const order: OrderItem[] = [{
      productId: productsData[0]._id,
      quantity: 2
    }]

    const response = await store.dispatch(
      createOrderAsync({
        userId: "1",
        accessToken: jwtFixture.access_token,
        order: order
      })
    );
    expect(response.payload).toEqual({_id: "2", totalPrice: productsData[0].price*2})
  });

});