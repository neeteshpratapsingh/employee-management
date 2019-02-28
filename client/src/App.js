import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser, logoutUser } from './actions/authActions';
import './App.css';

import PrivateRoute from './components/common/PrivateRoute';

import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Footer from './components/layout/Footer';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Dashboard from './components/dashboard/Dashboard';
import Profiles from './components/profiles/Profiles';
import EditProfile from './components/edit-profile/EditProfile';
import Posts from './components/posts/Posts';
import Post from './components/post/Post';
import EditLeave from './components/edit-leave/EditLeave';
import Leaves from './components/leaves/Leaves';

if (localStorage.jwtToken) {
	setAuthToken(localStorage.jwtToken);

	const decoded = jwt_decode(localStorage.jwtToken);

	store.dispatch(setCurrentUser(decoded));

	const currentTime = Date.now() / 1000;
	if (decoded.exp < currentTime) {
		store.dispatch(logoutUser());

		window.location.href = '/login';
	}
}

class App extends Component {
	render() {
		return (
			<Provider store={store}>
				<Router>
					<div className="App">
						<Navbar />
						<Route exact path="/" component={Landing} />
						<div className="container">
							<Route exact path="/login" component={Login} />
							<Route exact path="/register" component={Register} />
							<Route exact path="/dashboard" component={Dashboard} />
							<Route exact path="/profiles" component={Profiles} />

							<Switch>
								<PrivateRoute exact path="/profile/edit/:id" component={EditProfile} />
							</Switch>

							<Switch>
								<PrivateRoute exact path="/feed" component={Posts} />
							</Switch>

							<Switch>
								<PrivateRoute exact path="/post/:id" component={Post} />
							</Switch>

							<Switch>
								<PrivateRoute exact path="/leave/:id" component={EditLeave} />
							</Switch>
							<Switch>
								<PrivateRoute exact path="/leave" component={Leaves} />
							</Switch>
						</div>
						<Footer />
					</div>
				</Router>
			</Provider>
		);
	}
}

export default App;
