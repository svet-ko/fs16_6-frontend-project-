import React, { useEffect } from 'react';
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";

import Products from './pages/Products'
import Root from './pages/Root';
import Error from './pages/Error';
import About from './pages/About';
import Cart from './pages/Cart';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Register from './pages/Register';
import CheckAuth from './components/CheckAuth';
import useAppDispatch from './hooks/useDispatch';
import { getUserProfile } from './redux/slices/userSlice';
import Home from './pages/Home';
import SingleProduct from './pages/SingleProduct';
import { fetchAllCategoriesAsync } from './redux/slices/categoriesSlice';
import { ThemeProvider } from './ThemeProvider';

const App = () => {

  const dispatch = useAppDispatch();

  useEffect(() => {
    const jwt = localStorage.getItem('token');
    if (jwt) {
      dispatch(getUserProfile(jwt))
        .then(() => {
        })
        .catch((err: string) => {
          <Navigate to="/login" />
        })
    }
  }, []);

  useEffect(() => {
    dispatch(fetchAllCategoriesAsync());
  }, [])

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      errorElement: <Error message="Page not found" />,
      children: [
        {
          path: "",
          element: <Home />,
        },
        {
          path: "products",
          element: <Products />,
        },
        {
          path: "products/:productID",
          element: <SingleProduct />
        },
        {
          path: "about",
          element: <About />
        },
        {
          path: "cart",
          element: 
          <CheckAuth>
            <Cart />
          </CheckAuth>
        },
        {
          path: "login",
          element: <Login />
        },
        {
          path: "register",
          element: <Register />
        },
        {
          path: "profile",
          element:  
          <CheckAuth>
            <Profile />
          </CheckAuth>
        },
        {
          path: "error",
          element: <Error message="Page not found" />
        }
      ]
    }
  ]);
  return (
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  )
}

export default App