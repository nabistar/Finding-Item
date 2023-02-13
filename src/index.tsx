import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import Meta from './Meta';
import GlobalStyled from './GlobalStyled';
import store from './Store';

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
	<Provider store={store}>
		<BrowserRouter>
		<GlobalStyled />
			<Meta />
			<App />
		</BrowserRouter>
	</Provider>
);