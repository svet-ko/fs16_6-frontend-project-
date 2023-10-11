import productsReducer, { ProductsReducerState, createProductAsync, deleteProductAsync, fetchAllProductsAsync, fetchOneProductAsync, initialState, sortByPrice, updateProductAsync } from "../../redux/slices/productsSlice"
import productsData from "../data/productsData"
import { createStore } from "../../redux/store"
import productsServer from "../shared/productsServer"
import ProductToCreate from "../../types/ProductToCreate"
import UpdationOfProductRequest from "../../types/UpdationOfProductRequest"

let store = createStore()

beforeEach(() => {
    store = createStore()
})

// Enable API mocking before tests.
beforeAll(() => productsServer.listen())

// Reset any runtime request handlers we may add during the tests.
afterEach(() => productsServer.resetHandlers())

// Disable API mocking after the tests are done.
afterAll(() => productsServer.close())

describe('Testing action in productReducer', () => {
  test("Should sort products by price asc", () => {
    const state: ProductsReducerState = {
        products: productsData,
        loading: false
    }
    const products = productsReducer(state, sortByPrice("asc")).products
    expect(products[0]).toBe(productsData[3])
    expect(products[1]).toBe(productsData[2])
  })

  test("Should sort products by price desc", () => {
    const state: ProductsReducerState = {
        products: productsData,
        loading: false
    }
    const products = productsReducer(state, sortByPrice("desc")).products
    expect(products[0]).toBe(productsData[4])
    expect(products[1]).toBe(productsData[1])
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
  test("Should fetch all products", async () => {
    await store.dispatch(fetchAllProductsAsync({}))
    const products = store.getState().productReducer.products.length;
    const loadingState = store.getState().usersReducer.loading;
    expect(products).toBeGreaterThan(0)
    expect(loadingState).toBe(false);
  })

  test("Should fetch single product", async () => {
    await store.dispatch(fetchOneProductAsync(productsData[0].id))
    const product = store.getState().productReducer.currentProduct;
    const loadingState = store.getState().usersReducer.loading;
    expect(product).toMatchObject(productsData[0]);
    expect(loadingState).toBe(false);
  })

  test("Should return error if fetch non-existing product", async () => {
    const response = await store.dispatch(fetchOneProductAsync(-1))
    const loadingState = store.getState().usersReducer.loading;
    expect(response.payload).toBe('No such product');
    expect(loadingState).toBe(false);
  })

  test("Should delete an existing product", async () => {
    const resultAction = await store.dispatch(deleteProductAsync(1));
    const loadingState = store.getState().usersReducer.loading;
    expect(loadingState).toBe(false);
    expect(resultAction.payload).toBe(1)
  })

  test("Should not delete product which do not exist", async () => {
    const resultAction = await store.dispatch(deleteProductAsync(501));
    const loadingState = store.getState().usersReducer.loading;
    expect(loadingState).toBe(false);
    expect(resultAction.payload).toBe('Product was not deleted')
  })

  test("Should create product", async () => {
    const newProduct: ProductToCreate = {
      "title": "New Product",
      "price": 10,
      "description": "A description",
      "categoryId": 15,
      "images": ["https://placeimg.com/640/480/any"],
    };

    const expectedProduct = {
      id: productsData.length+1,
      title: newProduct.title,
      price: newProduct.price,
      description: newProduct.description,
      images: newProduct.images,
      category: {
        id: 15,
        name: "Books",
        image: "https://i.imgur.com/lauPy0D.jpeg",
        creationAt: "2023-10-04T03:53:27.000Z",
        updatedAt: "2023-10-04T03:53:27.000Z"
      },
      creationAt: "2023-01-03T16:51:33.000Z",
      updatedAt: "2023-01-03T16:51:33.000Z",
    };

    const resultAction = await store.dispatch(createProductAsync(newProduct));
    const loadingState = store.getState().usersReducer.loading;
    expect(loadingState).toBe(false);
    expect(resultAction.payload).toEqual(expectedProduct)
  })

  test("should not create product with wrong id", async () => {
    const input: ProductToCreate = {
      "title": "New Product",
      "price": 10,
      "description": "A description",
      "categoryId": 0,
      "images": ["https://placeimg.com/640/480/any"],
    };

    const expectedResponse = {                                                                                                                                                                                    
      message: [                                                                                                                                                                         
        'price must be a positive number',                                                                                                                                               
        'images must contain at least 1 elements',                                                                                                                                       
        'each value in images must be a URL address',                                                                                                                                    
        'images must be an array'
      ],
      error: 'Bad Request',
      statusCode: 400
    }

    const resultAction = await store.dispatch(createProductAsync(input));
    const loadingState = store.getState().usersReducer.loading;
    expect(loadingState).toBe(false);
    expect(resultAction.payload).toEqual(expectedResponse)
  })

  test("Should update product", async () => {
    const input: UpdationOfProductRequest = {
      id: 1,
      update: {
        price: 200,
        title: "Updated product"
      }
    }
    const action = await store.dispatch(updateProductAsync(input));
    const loadingState = store.getState().usersReducer.loading;
    expect(loadingState).toBe(false);
    expect(action.payload).toMatchObject(
      {
        id: 1,
        title: "Updated product",
        price: 200,
        description: "A very powerful computer",
        images: [
          "https://i.imgur.com/PK1WFTJ.jpeg"
        ],
        creationAt: "2023-10-04T10:07:52.000Z",
        updatedAt: "2023-10-04T10:17:07.000Z",
        category: {
          id: 16,
          name: "Electronics",
          image: "https://i.imgur.com/F1XLwX4.jpeg",
          creationAt: "2023-10-04T03:53:27.000Z",
          updatedAt: "2023-10-04T03:53:27.000Z"
        }
      },
    )
  })

  test("should not update product with wrong id", async () => {
    const input: UpdationOfProductRequest = {
      id: 150,
      update: {
        price: 200,
        title: "Updated product"
      }
    }

    const expectedResponse = {                                                                                                                                                                                    
      message: [                                                                                                                                                                         
        'price must be a positive number',                                                                                                                                               
        'images must contain at least 1 elements',                                                                                                                                       
        'each value in images must be a URL address',                                                                                                                                    
        'images must be an array'
      ],
      error: 'Bad Request',
      statusCode: 400
    }

    const resultAction = await store.dispatch(updateProductAsync(input));
    const loadingState = store.getState().usersReducer.loading;
    expect(loadingState).toBe(false);
    expect(resultAction.payload).toEqual(expectedResponse)
  })
})