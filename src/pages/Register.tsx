import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { unwrapResult } from '@reduxjs/toolkit';
import { Link, useNavigate } from 'react-router-dom';

import useAppDispatch from '../hooks/useDispatch';
import { useState } from 'react';
import { checkInputValidity } from '../selectors/checkInputValidity';
import { registerUserAsync } from '../redux/slices/userSlice';
import avatar from '../images/avatar.jpg'
import InfoTooltip from '../components/InfoTooltip';

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function Register() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [name, setName] = useState<string>('');
  const [surname, setSurname] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const [isEmailInputValid, setIsEmailInputValid] = useState<boolean>(true);
  const [emailChangeValidationMessage, setEmailChangeValidationMessage] = useState<string>('');

  const [isPasswordInputValid, setIsPasswordInputValid] = useState<boolean>(true);
  const [passwordChangeValidationMessage, setPasswordChangeValidationMessage] = useState<string>('');

  const [isFormValid, setFormValid] = useState<boolean>(false);

  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);

  function onPasswordChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setPassword(e.target.value);
    checkInputValidity(e, isPasswordInputValid, setIsPasswordInputValid, setPasswordChangeValidationMessage);
    setFormValid(isEmailInputValid && isPasswordInputValid);
  }

 function onEmailChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
   setEmail(e.target.value);
   checkInputValidity(e, isEmailInputValid, setIsEmailInputValid, setEmailChangeValidationMessage);
   setFormValid(isEmailInputValid && isPasswordInputValid);
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(registerUserAsync({
      email: email,
      password: password,
      name: name.concat(surname),
      role: 'customer',
      avatar: 'https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=1380&t=st=1696950657~exp=1696951257~hmac=e04326d0c3456f9c687d0fc5d8153f2ba7b8c913d16f064dc4df6793f88f74fd'
    }))
    .unwrap()
    .then(() => {
      navigate("/login");
    })
    .catch((err) => {
      setIsInfoTooltipOpen(true);
    })
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  sx={{zIndex: 0}}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                  value={surname}
                  onChange={(e) => setSurname(e.target.value)}
                  //sx={{zIndex: 0}}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  onChange={onEmailChange}
                  error={!isEmailInputValid}
                  helperText={emailChangeValidationMessage}
                  type="email"
                  sx={{zIndex: 0}}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  value={password}
                  onChange={onPasswordChange}
                  error={!isPasswordInputValid}
                  helperText={passwordChangeValidationMessage}
                  sx={{zIndex: 0}}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="I want to receive inspiration, marketing promotions and updates via email."
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
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Button
                  variant="text"
                  component={Link} to={`/login`}
                >
                  "Already have an account? Sign In"
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
      <InfoTooltip
        isOpen={isInfoTooltipOpen}
        onClose={()=>setIsInfoTooltipOpen(false)}
        errorText='Something went wrong! Try again.'
      />
    </ThemeProvider>
  );
}