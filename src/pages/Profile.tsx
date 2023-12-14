import React, { useEffect, useState } from "react";
import { Box, Button, ButtonGroup, Container, Popover, Typography } from "@mui/material";

import useAppSelector from "../hooks/useAppSelector";
import StyledImage from "../styles/components/StyledImage";
import LoadBox from "../components/LoadBox";
import AdminDashboard from "../components/AdminDashboard";
import OrdersTable from "../components/OrdersTable";
import UpdateUserForm from "../components/UpdateUserForm";
import Error from "./Error";
import UpdatePasswordForm from "../components/UpdatePasswordForm";

const ProfilePage = () => {
  const { currentUser, loading, error } = useAppSelector(
    (state) => state.usersReducer
  );

  const [isUpdateForm, setIsUpdateForm] = useState<boolean>(false);
  const [isUpdatePassword, setIsUpdatePassword] = useState<boolean>(false);

  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | undefined>(undefined);
  
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
                  aria-describedby='no-password'
                  variant="outlined"
                  onClick={(event) => {
                    isUpdatePassword ? setIsUpdatePassword(false) : setIsUpdatePassword(true);
                    setAnchorEl(event.currentTarget);
                  }}
                >
                  Update password
                </Button>
                
              </ButtonGroup>

              {isUpdateForm && (
                <Box>
                  <UpdateUserForm userId={currentUser._id}/>
                  <Button onClick={() => setIsUpdateForm(false)}>
                    Hide form
                  </Button>
                </Box>
              )}

              {currentUser.password ? isUpdatePassword && (
                <Box>
                  <UpdatePasswordForm />
                  <Button onClick={() => setIsUpdatePassword(false)}>
                    Hide form
                  </Button>
                </Box>
              ) : isUpdatePassword && (
                <Popover
                  id='no-password'
                  open={isUpdatePassword}
                  anchorEl={anchorEl}
                  onClick={() => setIsUpdatePassword(false)}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                  }}
                >
                  <Typography
                    color="primary.dark"
                    p={3}
                  >
                    You've logged in with google. You don't have password in the system.
                  </Typography>
                </Popover>
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
