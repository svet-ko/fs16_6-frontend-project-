import React from "react";
import useAppSelector from "../hooks/useAppSelector";
import { Navigate } from "react-router-dom";

const CheckAuth = (props: any) => {
  const { children } = props;
  const { currentUser } = useAppSelector((state) => state.usersReducer);
  return currentUser ? children : <Navigate to="/login" replace={true} />;
};

export default CheckAuth;