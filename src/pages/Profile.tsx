import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, ButtonGroup, Container, Typography } from "@mui/material";

import useAppSelector from "../hooks/useAppSelector";
import StyledImage from "../styles/components/StyledImage";
import LoadBox from "../components/LoadBox";
import AdminDashboard from "../components/AdminDashboard";
import OrdersTable from "../components/OrdersTable";
import useAppDispatch from "../hooks/useDispatch";
import { fetchUserByIdAsync } from "../redux/slices/userSlice";
import UpdateUserForm from "../components/UpdateUserForm";
import Error from "./Error";

const ProfilePage = () => {
  const { currentUser, loading, error } = useAppSelector(
    (state) => state.usersReducer
  );

  // const dispatch = useAppDispatch();
  // const navigate = useNavigate();
  // const jwt = localStorage.getItem("token");
  const [isUpdateForm, setIsUpdateForm] = useState<boolean>(false);
  const [isUpdatePassword, setIsUpdatePassword] = useState<boolean>(false);

  // useEffect(() => {
  //   getUser();
  // }, []);

  // const getUser = async () => {
  //   dispatch(fetchUserByIdAsync({
  //     accessToken: jwt as string,
  //     userId: currentUser?._id as string
  //   }))
  //     .unwrap()
  //     .then(() => {})
  //     .catch((err) => {
  //       navigate("error");
  //     });
  // };

  return (
    <Container
      sx={{
        bgcolor: "background.paper",
        pt: 8,
        pb: 6,
        minHeight: "100vh",
      }}
    >
      {error && !loading && <Error message={error} />}
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
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "left",
                flexWrap: "wrap",
                p: "2em",
                mb: "2em",
                rowGap: "1em",
              }}
            >
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
              <ButtonGroup>
                <Button
                  sx={{
                    borderColor: "primary.dark",
                    color: "primary.dark",
                  }}
                  variant="outlined"
                  onClick={() => setIsUpdateForm(true)}
                >
                  Update my profile
                </Button>
                <Button
                  sx={{
                    borderColor: "primary.dark",
                    color: "primary.dark",
                  }}
                  variant="outlined"
                  onClick={() => setIsUpdatePassword(true)}
                >
                  Update password
                </Button>
              </ButtonGroup>

              {isUpdateForm && (
                <>
                  <UpdateUserForm userId={currentUser._id} />
                  <Button onClick={() => setIsUpdateForm(false)}>
                    Hide form
                  </Button>
                </>
              )}
              {currentUser.role === "CUSTOMER" && (
                <Box>
                  <Typography
                    variant="body1"
                    color="primary.dark"
                    gutterBottom
                    fontSize={20}
                  >
                    Previous Orders:
                  </Typography>
                  <OrdersTable />
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
