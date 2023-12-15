import { jwtFixture } from "../../config/jwtFixture";
import usersReducer, {
  UserReducerState,
  authUserAsync,
  fetchAllUsersAsync,
  getUserProfile,
  logoutUser,
  registerUserAsync,
} from "../../redux/slices/userSlice";
import { createStore } from "../../redux/store";
import { LoggedUserResponse } from "../../types/LoggedUserResponse";
import UserToCreate from "../../types/UserToCreate";
import usersData from "../data/usersData";
import usersServer from "../shared/usersServer";

let store = createStore();

beforeEach(() => {
  store = createStore();
});

// Enable API mocking before tests.
beforeAll(() => usersServer.listen());

// Reset any runtime request handlers we may add during the tests.
afterEach(() => usersServer.resetHandlers());

// Disable API mocking after the tests are done.
afterAll(() => usersServer.close());

describe("Test regular user actions", () => {
  test("Should remove currentUser on logout", () => {
    const state: UserReducerState = {
      users: usersData,
      currentUser: usersData[0],
      loading: false,
    };
    const newState = usersReducer(state, logoutUser());
    expect(newState.currentUser).toBe(undefined);
  });
});

describe("Test async thunk actions in usersReducer", () => {
  test("Should fetch all users", async () => {
    await store.dispatch(fetchAllUsersAsync());
    const usersAmount = store.getState().usersReducer.users.length;
    expect(usersAmount).toBe(3);
  });

  test("Should change loading to false after fetch all users", async () => {
    await store.dispatch(fetchAllUsersAsync());
    const loadingState = store.getState().usersReducer.loading;
    expect(loadingState).toBe(false);
  });

  test("Should return user by jwt", async () => {
    const response = await store.dispatch(
      authUserAsync({
        email: usersData[0].email,
        password: usersData[0].password,
      })
    );
    const checkUser = response.payload as LoggedUserResponse;
    expect(Number(checkUser.token.split("_")[1])).toBe(+usersData[0]._id);
  });

  test("Should authenticate with right token", async () => {
    const response = await store.dispatch(
      getUserProfile(jwtFixture.access_token + "_2")
    );
    expect(response.payload).toMatchObject(usersData[1]);
  });

  test("Should change loading and error to falsy after authentication", async () => {
    await store.dispatch(getUserProfile(jwtFixture.access_token + "_2"));
    const { loading, error } = store.getState().usersReducer;
    expect(loading).toBe(false);
    expect(error).toBe(undefined);
  });

  test("Should not authenticate with wrong token", async () => {
    const response = await store.dispatch(getUserProfile("wrong"));
    expect(response.payload).toBe("Cannot authenticate user");
  });

  test("Should change loading to false after false authentication", async () => {
    await store.dispatch(getUserProfile("wrong"));
    const loadingState = store.getState().usersReducer.loading;
    expect(loadingState).toBe(false);
  });

  test("Should not login user with wrong credentials", async () => {
    await store.dispatch(
      authUserAsync({ email: usersData[0].email, password: "wrongPassword" })
    );
    const response = store.getState().usersReducer.error;
    expect(response).toBe("User was not authenticated");
  });

  test("Should change loading to false after not login user with wrong credentials", async () => {
    await store.dispatch(
      authUserAsync({ email: usersData[0].email, password: "wrongPassword" })
    );
    const loadingState = store.getState().usersReducer.loading;
    expect(loadingState).toBe(false);
  });

  test("Should register user", async () => {
    const newUser: UserToCreate = {
      email: "newUserEmail@mail.com",
      password: "password",
      name: "Name",
      role: "CUSTOMER",
      avatar: "https://picsum.photos/640/640?r=5207",
    };
    const initialUsersLength = store.getState().usersReducer.users.length;
  await store.dispatch(registerUserAsync(newUser));
    const newLength = store.getState().usersReducer.users.length;
    expect(newLength).toBe(initialUsersLength + 1);
  });

  test("Should change loading to false after register user", async () => {
    const newUser: UserToCreate = {
      email: "newUserEmail@mail.com",
      password: "password",
      name: "Name",
      role: "CUSTOMER",
      avatar: "https://picsum.photos/640/640?r=5207",
    };
    await store.dispatch(registerUserAsync(newUser));
    const loadingState = store.getState().usersReducer.loading;
    expect(loadingState).toBe(false);
  });
});
