/* eslint-disable no-tabs */
import React from 'react';
// import ReactDOM from 'react-dom';
import { createRoot } from 'react-dom/client';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material';
import { Provider } from 'react-redux';
import App from './App';
import theme from './assets/theme';
import store from './redux/store';

const rootContainer = document.getElementById('root');
const root = createRoot(rootContainer);

root.render(
	<React.StrictMode>
		<Provider store={store}>
			<ThemeProvider theme={theme}>
				<BrowserRouter>
					<App />
				</BrowserRouter>
			</ThemeProvider>
		</Provider>
	</React.StrictMode>,
);
