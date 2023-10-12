import * as React from 'react';
import { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { Link, useNavigate } from 'react-router-dom'

import useAppDispatch from '../hooks/useDispatch';
import { authUserAsync, getUserProfile } from '../redux/slices/userSlice';
import { checkInputValidity } from '../selectors/checkInputValidity';
import InfoTooltip from '../components/InfoTooltip';

export default function Login() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

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

  const getUserData = (accessToken: string) => {
    localStorage.setItem('token', accessToken);
    dispatch(getUserProfile(accessToken))
      .unwrap()
      .then(() => {
        navigate('/profile');
      })
      .catch((err) => {
        setIsInfoTooltipOpen(true);
      })
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(authUserAsync({ email, password }))
    .unwrap()
    .then((data) => {
      getUserData(data.access_token);
    })
    .catch((err) => {
      setIsInfoTooltipOpen(true);
      navigate('/login')
    })
  };

  return (
    <>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://source.unsplash.com/random?wallpapers)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                value={email}
                onChange={onEmailChange}
                error={!isEmailInputValid}
                helperText={emailChangeValidationMessage}
                type="email"
                sx={{zIndex: 0}}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={onPasswordChange}
                error={!isPasswordInputValid}
                helperText={passwordChangeValidationMessage}
                sx={{zIndex: 0}}
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                disabled={!isFormValid}
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Button variant="text">
                    Forgot password?
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    variant="text"
                    component={Link} to={`/register`}
                  >
                    "Don't have an account? Sign Up"
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
      <InfoTooltip
        isOpen={isInfoTooltipOpen}
        onClose={()=>setIsInfoTooltipOpen(false)}
        errorText='Something went wrong! Try again.'
      />
    </>
  );
}