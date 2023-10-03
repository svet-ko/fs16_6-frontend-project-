import productsReducer, { ProductsReducerState, createProduct, deleteProduct, fetchAllProductsAsync, initialState, sortByPrice } from "../../redux/slices/productsSlice"
import productsData from "../data/productsData"
import { createStore } from "../../redux/store"
import server from "../shared/server"

let store = createStore()
// beforeEach(() => {
//     store = createStore()
// })

// Enable API mocking before tests.
beforeAll(() => server.listen())

// Reset any runtime request handlers we may add during the tests.
afterEach(() => server.resetHandlers())

// Disable API mocking after the tests are done.
afterAll(() => server.close())

describe('Testing action in productReducer', () => {
  test("Should sort products by price desc", () => {
    const state: ProductsReducerState = {
        products: productsData,
        loading: false,
        error: ""
    }
    const products = productsReducer(state, sortByPrice("asc")).products
    expect(products[0]).toBe(productsData[3])
    expect(products[1]).toBe(productsData[2])
  })

  test("Should return initial state", () => {
      const state = productsReducer(initialState, {
          payload: undefined,
          type: undefined
      })
      expect(state).toMatchObject(initialState)
  })
})

describe("Test async thunk actions in productsReducer", () => {
  test("Should fetch all products with pagination", async () => {
      await store.dispatch(fetchAllProductsAsync({ limit: 20, offset: 0 }))
      const productPerPage = store.getState().productReducer.products.length;
      expect(productPerPage).toBe(20)
  })

  test("Should delete an existing product", async () => {
    const resultAction = await store.dispatch(deleteProduct(501))
    expect(resultAction.payload).toBe(501)
  })

  test("Should not delete an existing product", async () => {
    const resultAction = await store.dispatch(deleteProduct(1))
    expect(resultAction.payload).toBe('Product was not deleted')
  })

  test("Should create product", async () => {
    const newProduct = {
      title: "New Product",
      price: 10,
      description: "A description",
      categoryId: 1,
      images: ["https://placeimg.com/640/480/any"],
    };

    const expectedProduct = {
      id: 506,
      title: newProduct.title,
      price: newProduct.price,
      description: newProduct.description,
      images: newProduct.images,
      category: 1,
      creationAt: "2023-01-03T16:51:33.000Z",
      updatedAt: "2023-01-03T16:51:33.000Z",
    };
    const resultAction = await store.dispatch(createProduct(newProduct))
    expect(resultAction.payload).toEqual(expectedProduct)
  })
})