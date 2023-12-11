import React from "react";
import useAppSelector from "../hooks/useAppSelector";
import { Box, Button, Container, Typography } from "@mui/material";
import StyledImage from "../styles/components/StyledImage";
import { Link } from "react-router-dom";
import LoadBox from "../components/LoadBox";
import CreateProductForm from "../components/CreateProductForm";
import AdminDashboard from "../components/AdminDashboard";
import OrdersTable from "../components/OrdersTable";

const ProfilePage = () => {
  const { currentUser, loading, error } = useAppSelector(
    (state) => state.usersReducer
  );

  return (
    <Container
      sx={{
        bgcolor: "background.paper",
        pt: 8,
        pb: 6,
        minHeight: "100vh",
      }}
    >
      {loading && !error && <LoadBox />}

      {!error && !loading && currentUser && (
        <>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              flexWrap: "wrap",
              bgcolor: "primary.light",
              borderRadius: "0.3em",
              p: "2em",
              mb: "2em",
              rowGap: "1em",
            }}
          >
            <Box>
              <Typography
                variant="h2"
                component="h1"
                color="primary.dark"
                gutterBottom
              >
                {currentUser.name}'s profile
              </Typography>
              <StyledImage link={currentUser.avatar} />
              <Typography
                variant="body1"
                color="primary.dark"
                gutterBottom
                fontSize={20}
              >
                My e-mail: {currentUser.email}
              </Typography>
              {currentUser.role === "CUSTOMER" && (
                <Box>
                  <Typography
                    variant="body1"
                    color="primary.dark"
                    gutterBottom
                    fontSize={20}
                  >Previous Orders:</Typography>
                  <OrdersTable/>
                </Box>  
              )}
            </Box>
          </Box>
          {currentUser.role === "ADMIN" && (
            <Box sx={{ mb: "8em" }}>
              <AdminDashboard />
            </Box>
          )}
        </>
      )}
    </Container>
  );
};

export default ProfilePage;
