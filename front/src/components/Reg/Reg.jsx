import * as React from 'react';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Link,
  Paper,
  Box,
  Grid,
  Typography,
} from '@mui/material/';

import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { regUser } from '../../redux/actions/userAC';

const Copyright = (props) => {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {'Copyright © '}
      <Link color="inherit" href="#">
        Galactic miniatures
      </Link>{' '}
      {new Date().getFullYear()}.
    </Typography>
  );
};

const Reg = () => {
  const [regInput, setRegInput] = React.useState({});
  const errorOnReg = useSelector((store) => store.errorOnReg);
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (user.email) {
      navigate('/');
    }
  }, [user.email, navigate]);

  const handleChange = (e) => {
    setRegInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    console.log(regInput);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(regUser(regInput));
  };

  return (
    <Grid container component="main" sx={{ height: '100vh' }}>
      <CssBaseline />
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage: 'url(/images/lowpoly1.png)',
          backgroundRepeat: 'no-repeat',
          backgroundColor: '#0054FF',
          backgroundSize: 'contain',
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
            Sign Up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  name="firstName"
                  autoComplete="First Name"
                  onChange={handleChange}
                  value={regInput.firstName ?? ''}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="lastName"
                  onChange={handleChange}
                  value={regInput.lastName ?? ''}
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
                  onChange={handleChange}
                  value={regInput.email ?? ''}
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
                  placeholder="Min length of password 5 charecters"
                  onChange={handleChange}
                  value={regInput.password ?? ''}
                />
              </Grid>
              {errorOnReg ? (
                <Grid item xs={12} sx={{ color: 'red' }}>
                  {errorOnReg}
                </Grid>
              ) : null}
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/auth/login" variant="body2">
                  Already have an account? &nbsp;Log In
                </Link>
              </Grid>
            </Grid>
          </Box>
          <Copyright sx={{ mt: 5 }} />
        </Box>
      </Grid>
    </Grid>
  );
};

export default Reg;
