import React, { useEffect, useState } from "react";
// redux
import { useSelector } from "react-redux";
import { AppState } from "../redux/store";

// MUI
import {
  Box,
  Button,
  Container,
  Grid,
  Step,
  StepLabel,
  Stepper,
  TextField,
  Typography,
} from "@mui/material";

// components
import PaymentForm from "../components/PaymentForm";
//import ShippingStep from "../components/checkout/ShippingStep";
//import PaymentStep from "../components/checkout/PaymentStep";
import { useNavigate } from "react-router-dom";
import useAppDispatch from "../hooks/useDispatch";
import useAppSelector from "../hooks/useAppSelector";
import UserToCreate from "../types/UserToCreate";
import { updateUserAsync } from "../redux/slices/userSlice";

// form stepper steps
const steps = ["Shipping Address", "Payment Details"];

function Checkout() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const jwt = localStorage.getItem('token');
  const { currentUser } = useAppSelector(
    (state) => state.usersReducer
  );
  const { currentOrder } = useAppSelector((state: AppState) => state.ordersReducer); 

  // active step
  const [activeStep, setActiveStep] = React.useState(0);
  // address
  const [address, setAddress] = useState<string | undefined>(currentUser && currentUser.address ? currentUser.address : undefined);
  const userToUpdate: Partial<UserToCreate> = {};
  const isFormValid =!!address;

  // handle next step in stepper
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  // submit handler

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
        handleNext()
      })
      .catch(() => {
        navigate("/error")
      })
  };

  const handleSubmit = async () => {
    // const formData = {
    //   cart: items.map((c) => c._id),
    //   payment: paymentData,
    //   shipping: shippingId,
    // };
    // const { payload } = await dispatch(createPayment(formData));
    //dispatch(emptyCart());
    navigate(`/profile`);
  };

  return (
    <Container maxWidth="md"
      sx={{
        bgcolor: "background.paper",
        pt: 8,
        pb: 6,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        minHeight: "100vh",
    }}>
        <Box sx={{ width: "80%" }}>
          <Typography variant="h4" gutterBottom sx={{ mb: 4 }}>
            Checkout - {steps[activeStep]}
          </Typography>
          <Stepper activeStep={activeStep}>
            {steps.map((label, index) => {
              const stepProps: { completed?: boolean } = {};
              return (
                <Step key={label} {...stepProps}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              );
            })}
          </Stepper>

          <Box sx={{ paddingTop: 4 }}>
            {activeStep === 0 ? (
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
                    disabled={!isFormValid}
                  >
                    update shipment address
                  </Button>
                </Box>
              </Box>
            ) : (
              <Box>
                
              </Box>
              //<PaymentStep handleSubmit={handleSubmit} />
            )}
          </Box>
        </Box>
    </Container>
  );
}

export default Checkout;