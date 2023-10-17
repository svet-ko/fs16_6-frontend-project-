import React from "react";
import { Outlet } from "react-router-dom";
import { CssBaseline } from "@mui/material";

import Header from "../components/Header";
import Footer from "../components/Footer";

const Root = () => {
  return (
    <>
      <CssBaseline />
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};

export default Root;
