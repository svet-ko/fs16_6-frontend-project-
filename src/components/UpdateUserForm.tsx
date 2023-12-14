import React, { useState } from "react";
import {
  Box,
  Button,
  Grid,
  TextField,
  Typography,
} from "@mui/material";

import useAppDispatch from "../hooks/useDispatch";
import InfoTooltip from "./InfoTooltip";
import UserToCreate from "../types/UserToCreate";
import { updateUserAsync } from "../redux/slices/userSlice";
import useAppSelector from "../hooks/useAppSelector";

type UpdateUserFormProps = {
  userId: string;
};

const UpdateUserForm = ({
  userId,
}: UpdateUserFormProps) => {
  const dispatch = useAppDispatch();

  const [name, setName] = useState<string | undefined>();
  const [address, setAddress] = useState<string | undefined>();
  const [avatar, setAvatar] = useState<string | undefined>();

  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState<boolean>(false);
  const [isInfoTooltipSuccessed, setIsInfoTooltipSuccessed] =
    useState<boolean>(false);
  const [errorText, setErrorText] = useState<string>("Something went wrong");

  const { currentUser, loading, error } = useAppSelector(
    (state) => state.usersReducer
  );

  const jwt = localStorage.getItem('token');

  const isFormValid =
    !!name || !!address || !!avatar;

  const userToUpdate: Partial<UserToCreate> = {};

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (name) {
      userToUpdate.name = name as string;
    }

    if (address) {
      userToUpdate.address = address as string;
    }

    if (avatar) {
      userToUpdate.avatar = avatar as string;
    }

    dispatch(updateUserAsync({ 
      accessToken: jwt as string,
      userId: userId,
      userUpdates: userToUpdate
    }))
      .unwrap()
      .then(() => {
        
      })
      .catch((err) => {
        setErrorText(err);
        setIsInfoTooltipSuccessed(false);
      })
      .finally(() => {
        setIsInfoTooltipOpen(true);
      });
  };

  return (
    <Box
      maxWidth="400px"
      sx={{
        borderRadius: "0.3em",
        p: "1em",
        bgcolor: "secondary.light",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5" color="secondary">
          Update my profile
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="name"
                name="name"
                fullWidth
                id="name"
                label="Name"
                autoFocus
                value={currentUser && currentUser.name ? currentUser.name : name || ""}
                onChange={(e) => setName(e.target.value)}
                sx={{ zIndex: 0 }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="address"
                label="Address"
                name="address"
                value={currentUser && currentUser.address ? currentUser.address : address || ""}
                onChange={(e) => setAddress(e.target.value)}
                sx={{ zIndex: 0 }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="avatar"
                label="Avatar"
                name="avatar"
                value={currentUser && currentUser.avatar ? currentUser.avatar : avatar || ""}
                onChange={(e) => setAvatar(e.target.value)}
                sx={{ zIndex: 0 }}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={!isFormValid}
          >
            update user
          </Button>
        </Box>
      </Box>
      <InfoTooltip
        isOpen={isInfoTooltipOpen}
        onClose={() => setIsInfoTooltipOpen(false)}
        isSuccessed={isInfoTooltipSuccessed}
        successText="User successfully updated"
        errorText={errorText}
      />
    </Box>
  );
};

export default UpdateUserForm;
