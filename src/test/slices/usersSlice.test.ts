import { authenticateUser, fetchAllUsersAsync, loginUserAsync } from "../../redux/slices/userSlice"
import { createStore } from "../../redux/store"
import usersData from "../data/usersData"
import usersServer, { accessToken } from "../shared/usersServer"

let store = createStore()

beforeEach(() => {
  store = createStore()
})

// Enable API mocking before tests.
beforeAll(() => usersServer.listen())

// Reset any runtime request handlers we may add during the tests.
afterEach(() => usersServer.resetHandlers())

// Disable API mocking after the tests are done.
afterAll(() => usersServer.close())

describe("Test async thunk actions in usersReducer", () => {
  test("Should fetch all users", async () => {
    await store.dispatch(fetchAllUsersAsync())
    const usersAmount = store.getState().usersReducer.users.length;
    expect(usersAmount).toBe(3);
  })

  test("Should login user with right credentials", async () => {
    await store.dispatch(loginUserAsync({email: usersData[0].email, password: usersData[0].password }));
    console.log(store.getState().usersReducer);
    const response = store.getState().usersReducer.currentUser;
    expect(response).toMatchObject(usersData[0]);
  })

  test("Should authenticate with right token", async () => {
    const response = await store.dispatch(authenticateUser(accessToken + "_2"));
    expect(response.payload).toMatchObject(usersData[1])
  })

  test("Should not login user with wrong credentials", async () => {
    await store.dispatch(loginUserAsync({email: usersData[0].email, password: 'wrongPassword' }));
    const response = store.getState().usersReducer.error;
    expect(response).toBe('Request failed with status code 401');
  })
})