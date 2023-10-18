import React from "react";
import useAppSelector from "../hooks/useAppSelector";
import { Box, Button, Container, Typography } from "@mui/material";
import StyledImage from "../styles/components/StyledImage";
import { Link } from "react-router-dom";
import LoadBox from "../components/LoadBox";
import CreateProductForm from "../components/CreateProductForm";
import AdminDashboard from "../components/AdminDashboard";
import { relative } from "path";

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
                color="primary"
                gutterBottom
              >
                {currentUser.name}'s profile
              </Typography>
              <StyledImage link={currentUser.avatar} />
              <Typography variant="body1" gutterBottom fontSize={20}>
                My e-mail: {currentUser.email}
              </Typography>
              <Button variant="contained" component={Link} to={`/cart`}>
                Visit cart
              </Button>
            </Box>
            <Box>
              <CreateProductForm />
            </Box>
          </Box>
          {currentUser.role === "admin" && (
            <Box sx={{mb: "5em"}}>
              <AdminDashboard />
            </Box>
          )}
        </>
      )}
    </Container>
  );
};

export default ProfilePage;
