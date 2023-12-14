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

const UpdatePasswordForm = () => {
  const dispatch = useAppDispatch();

  const [oldPassword, setOldPassword] = useState<string | undefined>();
  const [newPassword, setNewPassword] = useState<string | undefined>();
  const [duplicatePassword, setDuplicatePassword] = useState<string | undefined>();

  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState<boolean>(false);
  const [isInfoTooltipSuccessed, setIsInfoTooltipSuccessed] =
    useState<boolean>(false);
  const [errorText, setErrorText] = useState<string>("Something went wrong");

  const { currentUser, loading, error } = useAppSelector(
    (state) => state.usersReducer
  );

  const jwt = localStorage.getItem('token');

  const isFormValid =
    !!oldPassword && !!newPassword && !!duplicatePassword && newPassword===duplicatePassword;

  const userToUpdate: Partial<UserToCreate> = {};

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
      userToUpdate.password = newPassword as string;

    dispatch(updateUserAsync({ 
      accessToken: jwt as string,
      userId: currentUser?._id as string,
      userUpdates: userToUpdate
    }))
      .unwrap()
      .then(() => {
        setIsInfoTooltipSuccessed(true);
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
                autoComplete="old password"
                name="oldPassword"
                fullWidth
                id="oldPassword"
                label="Old password"
                autoFocus
                value={oldPassword || ""}
                onChange={(e) => setOldPassword(e.target.value)}
                sx={{ zIndex: 0 }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="newPassword"
                label="New password"
                name="newPassword"
                value={newPassword || ""}
                onChange={(e) => setNewPassword(e.target.value)}
                sx={{ zIndex: 0 }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="duplicatePassword"
                label="Duplicate new password"
                name="duplicatePassword"
                value={duplicatePassword || ""}
                onChange={(e) => setDuplicatePassword(e.target.value)}
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
            update password
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

export default UpdatePasswordForm;