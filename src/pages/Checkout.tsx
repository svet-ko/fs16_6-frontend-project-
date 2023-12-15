import React, { useState } from "react";
// redux
import { AppState } from "../redux/store";

// MUI
import {
  Box,
  Button,
  Container,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Step,
  StepLabel,
  Stepper,
  TextField,
  Typography,
} from "@mui/material";

// components
import { useNavigate } from "react-router-dom";
import useAppDispatch from "../hooks/useDispatch";
import useAppSelector from "../hooks/useAppSelector";
import { createPaymentAsync } from "../redux/slices/paymentSlice";
import PaymentToCreate from "../types/PaymentToCreate";
import ShipmentForm from "../components/ShipmentForm";
import Method from "../types/Method";

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
  
  const [activeStep, setActiveStep] = useState(0);

  const [method, setMethod] = useState<Method>("credit_card");
  const methods = ["credit_card", "bank_transfer", "paypal"];
  const [bankName, setBankName] = useState<string | undefined>();
  const [accountNumber, setAccountNumber] = useState<string | undefined>();

  const isPaymentFormValid =!!method && !!bankName && !!accountNumber;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handlePaymentSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const payment: PaymentToCreate = {
      userId: currentUser?._id as string,
      orderId: currentOrder?._id as string,
      shipmentInfo: {
        shippingPrice: 10
      },
      method: method,
      bankName: bankName as string,
      accountNumber: accountNumber as string
    }

    dispatch(createPaymentAsync({
      accessToken: jwt as string,
      payment
    }))
      .unwrap()
      .then((response) => {
        console.log(response);
        navigate("/profile");
      })
      .catch(() => {
        navigate("/error")
      })
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
              <ShipmentForm onItemChange={handleNext}/>
            ) : (
              <Box>
                <Typography variant="h5" gutterBottom>
                  Input payment details:
                </Typography>
                <Box component="form" noValidate onSubmit={handlePaymentSubmit} sx={{ mt: 3 }}>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        id="bankName"
                        label="BankName"
                        name="bankName"
                        value={bankName || ""}
                        onChange={(e) => setBankName(e.target.value)}
                        sx={{ zIndex: 0 }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        id="accountNumber"
                        label="Account number"
                        name="accountNumber"
                        value={accountNumber || ""}
                        onChange={(e) => setAccountNumber(e.target.value)}
                        sx={{ zIndex: 0 }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                    <FormControl fullWidth>
                      <InputLabel color="secondary">Methods</InputLabel>
                      <Select
                        color="secondary"
                        labelId="form-select-category-label"
                        value={method}
                        label="Methods"
                        onChange={(e: SelectChangeEvent<Method>) => {
                          const method = e.target.value as Method;
                          setMethod(method)
                        }}
                      >
                        {methods.map((method) => (
                          <MenuItem key={method} value={method}>
                            {method}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                    </Grid>
                  </Grid>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    disabled={!isPaymentFormValid}
                  >
                    Proceed to payment
                  </Button>
                </Box>
              </Box>  
            )}
          </Box>
        </Box>
    </Container>
  );
}

export default Checkout;