import React from 'react';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

//import HomePage from './pages/HomePage'
import ProductsPage from './pages/ProductsPage'
import Root from './pages/Root';
import ErrorPage from './pages/ErrorPage';
import About from './pages/About';
import Cart from './pages/Cart';
import HomePage from './pages/HomePage';
import ProfilePage from './pages/ProfilePage';
import Login from './pages/Login';
import Register from './pages/Register';

const App = () => {
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
          element: <Cart />
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
          element: <ProfilePage />
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