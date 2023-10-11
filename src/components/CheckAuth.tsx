import React from "react";
import { Navigate } from "react-router-dom";

const CheckAuth = (props: any) => {
  const { children } = props;
  const jwt = localStorage.getItem('token');
  return jwt ? children : <Navigate to="/login" replace={true} />;
};

export default CheckAuth;