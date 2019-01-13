import React from 'react';
import ReactDOM from 'react-dom';
import {Provider } from 'react-redux';
import {createStore, applyMiddleware } from 'redux';
import {Route, Switch,BrowserRouter } from 'react-router-dom';
import thunk from 'redux-thunk';

import reducers from './Components/Reducers/reducers';
import LoginPage from './Components/Pages/LoginPage/loginpage';
import NewPage from './Components/Pages/NewPage/newPage';  		

const store = createStore(reducers,applyMiddleware(thunk));

ReactDOM.render(
	<Provider store={store}>
		<BrowserRouter>
			<div>
				<Switch>

				    <Route exact path="/login" component={LoginPage} />
					<Route exact path="/" component={NewPage} />		
				</Switch>
			</div>
		</BrowserRouter>
	</Provider>,
  document.getElementById("root")
);
