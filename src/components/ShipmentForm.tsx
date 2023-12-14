import { Box, Button, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

import useAppSelector from '../hooks/useAppSelector';
import UserToCreate from '../types/UserToCreate';
import useAppDispatch from '../hooks/useDispatch';
import { updateUserAsync } from '../redux/slices/userSlice';

interface ShipmentFormProps {
  onItemChange: () => void;
}

const ShipmentForm = ({onItemChange}: ShipmentFormProps) => {
  const { currentUser } = useAppSelector(
    (state) => state.usersReducer
  );
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  
  const jwt = localStorage.getItem('token');
  const [address, setAddress] = useState<string | undefined>(currentUser && currentUser.address ? currentUser.address : undefined);
  const userToUpdate: Partial<UserToCreate> = {};
  const isShipmentFormValid =!!address;

  const handleShipmentSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    userToUpdate.address = address as string;

    dispatch(updateUserAsync({ 
      accessToken: jwt as string,
      userId: currentUser?._id as string,
      userUpdates: userToUpdate
    }))
      .unwrap()
      .then(() => {
        onItemChange()
      })
      .catch(() => {
        navigate("/error")
      })
  };

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Your current address is:
      </Typography>
      <Box component="form" noValidate onSubmit={handleShipmentSubmit} sx={{ mt: 3 }}>
        <TextField
          fullWidth
          id="address"
          label="Address"
          name="address"
          value={address || ""}
          onChange={(e) => setAddress(e.target.value)}
          sx={{ zIndex: 0 }}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          disabled={!isShipmentFormValid}
        >
          update shipment address
        </Button>
      </Box>
    </Box>
  )
}

export default ShipmentForm