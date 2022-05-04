import * as React from 'react';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import {
	Avatar, Button, CssBaseline, TextField, Link, Paper, Box, Grid, Typography,
} from '@mui/material/';

import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logInUser } from '../../redux/actions/userAC';

const Copyright = (props) => {
	return (
		<Typography variant="body2" color="text.secondary" align="center" {...props}>
			{'Copyright © '}
			<Link color="inherit" href="#">
				Galactic miniatures
			</Link>
			{' '}
			{new Date().getFullYear()}
			.
		</Typography>
	);
};

const Login = () => {
	const [loginInputs, setLoginInputs] = React.useState({});
	const errorOnLogin = useSelector((sotre) => sotre.errorOnLogin);
	const user = useSelector((sotre) => sotre.user);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	React.useEffect(() => {
		if (user.email) {
			navigate('/');
		}
	}, [user.email, navigate]);

	const handleChange = (e) => {
		setLoginInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
		// console.log(loginInputs);
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		dispatch(logInUser(loginInputs));
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
						Log In
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
							onChange={handleChange}
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
							onChange={handleChange}
						/>
						{errorOnLogin ? <Grid item xs sx={{ color: 'red' }}>{errorOnLogin}</Grid> : null}
						<Button
							type="submit"
							fullWidth
							variant="contained"
							sx={{ mt: 3, mb: 2 }}
						>
							Log In
						</Button>
						<Grid container justifyContent="flex-end">
							<Grid item>
								<Link href="/auth/registration" variant="body2">
									Don&apos;t have an account? &nbsp;Sign Up
								</Link>
							</Grid>
						</Grid>
						<Copyright sx={{ mt: 5 }} />
					</Box>
				</Box>
			</Grid>
		</Grid>
	);
};

export default Login;
