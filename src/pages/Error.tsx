import { Container, Typography } from "@mui/material";
import React from "react";

type ErrorProps = {
  message: string;
};

const ErrorPage = ({ message }: ErrorProps) => {
  return (
    <Container
      sx={{
        bgcolor: "background.paper",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        minHeight: "100vh"
      }}
    >
      <Typography align="center" variant="h4" sx={{m: "2em"}}>
        {message}
      </Typography>
    </Container>
  );
};

export default ErrorPage;
