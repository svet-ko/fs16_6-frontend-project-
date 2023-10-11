import React, { useEffect, useState } from 'react';
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";

import ProductsPage from './pages/ProductsPage'
import Root from './pages/Root';
import ErrorPage from './pages/ErrorPage';
import About from './pages/About';
import Cart from './pages/Cart';
import HomePage from './pages/HomePage';
import ProfilePage from './pages/ProfilePage';
import Login from './pages/Login';
import Register from './pages/Register';
import CheckAuth from './components/CheckAuth';
import useAppDispatch from './hooks/useDispatch';
import { getUserProfile } from './redux/slices/userSlice';

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

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      errorElement: <ErrorPage message="Page not found" />,
      children: [
        {
          path: "",
          element: <HomePage />,
        },
        {
          path: "products",
          element: <ProductsPage />,
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
            <ProfilePage />
          </CheckAuth>
        },
        {
          path: "error",
          element: <ErrorPage message="Page not found" />
        }
        // {
        //   path: ":breweryID",
        //   element: <SingleBrewery />
        // },
      ]
    }
  ]);
  return (
    <RouterProvider router={router} />
  )
}

export default App