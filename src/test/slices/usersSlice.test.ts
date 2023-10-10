import usersReducer, { UserReducerState, authUserAsync, fetchAllUsersAsync, getUserProfile, logoutUser, registerUserAsync } from "../../redux/slices/userSlice"
import { createStore } from "../../redux/store"
import { JWTPair } from "../../types/JwtPair"
import UserToCreate from "../../types/UserToCreate"
import usersData from "../data/usersData"
import usersServer, {jwtFixture} from "../shared/usersServer"

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

describe("Test regular user actions", () => {
  test("Should remove currentUser on logout", () => {
    const state: UserReducerState = {
      users: usersData,
      currentUser: usersData[0],
      loading: false,
    }
    const newState = usersReducer(state, logoutUser());
    expect(newState.currentUser).toBe(undefined)
  })
})

describe("Test async thunk actions in usersReducer", () => {
  test("Should fetch all users", async () => {
    await store.dispatch(fetchAllUsersAsync())
    const usersAmount = store.getState().usersReducer.users.length;
    expect(usersAmount).toBe(3);
  })

  test("Should return user by jwt", async () => {
    const response = await store.dispatch(authUserAsync({email: usersData[0].email, password: usersData[0].password }));
    const checkUser = response.payload as JWTPair;
    expect(Number(checkUser.access_token.split('_')[1])).toBe(usersData[0].id);
  })

  test("Should authenticate with right token", async () => {
    const response = await store.dispatch(getUserProfile(jwtFixture.access_token + "_2"));
    expect(response.payload).toMatchObject(usersData[1])
  })

  test("Should not login user with wrong credentials", async () => {
    await store.dispatch(authUserAsync({email: usersData[0].email, password: 'wrongPassword' }));
    const response = store.getState().usersReducer.error;
    expect(response).toBe('User was not authenticated');
  })

  test("Should register user", async () => {
    const newUser: UserToCreate = {
      email: "newUserEmail@mail.com",
      password: "password",
      name: "Name",
      role: 'customer',
      avatar: "https://picsum.photos/640/640?r=5207",
    }
    const initialUsersLength = store.getState().usersReducer.users.length;
    await store.dispatch(registerUserAsync(newUser));
    const newLength = store.getState().usersReducer.users.length;
    expect(newLength).toBe(initialUsersLength+1);
  })
})