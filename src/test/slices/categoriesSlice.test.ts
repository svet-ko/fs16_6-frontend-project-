import { fetchAllCategoriesAsync } from "../../redux/slices/categoriesSlice"
import { createStore } from "../../redux/store"
import categoriesServer from "../shared/categoriesServer"

let store = createStore()

beforeEach(() => {
  store = createStore()
})

// Enable API mocking before tests.
beforeAll(() => categoriesServer.listen())

// Reset any runtime request handlers we may add during the tests.
afterEach(() => categoriesServer.resetHandlers())

// Disable API mocking after the tests are done.
afterAll(() => categoriesServer.close())

describe("Test async thunk actions in categoriesReducer", () => {
  test("Should fetch all categories", async () => {
    await store.dispatch(fetchAllCategoriesAsync())
    const categoriesAmount = store.getState().categoriesReducer.categories.length;
    expect(categoriesAmount).toBe(7);
  })
})