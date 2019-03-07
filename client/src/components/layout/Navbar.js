import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/authActions';

class Navbar extends Component {
	onLogoutClick(e) {
		e.preventDefault();
		this.props.logoutUser();
		window.location.href = '/login';
	}

	render() {
		const { isAuthenticated, isAdmin } = this.props.auth;

		const employeeLinks = (
			<ul className="navbar-nav ml-auto">
				{/* <li className="nav-item">
					<Link className="nav-link" to="/register">
						Employer Profile
					</Link>
				</li> */}
				<li className="nav-item">
					<Link className="nav-link" to="/profiles">
						{' '}
						Employees Profiles
					</Link>
				</li>

				<li className="nav-item">
					<Link className="nav-link" to="/feed">
						Post Feed
					</Link>
				</li>
				<li className="nav-item">
					<Link className="nav-link" to="/leave">
						Create Leave Request
					</Link>
				</li>
				<li className="nav-item">
					<Link className="nav-link" to="/Leaves">
						Applied Leaves
					</Link>
				</li>
				<li className="nav-item">
					<Link className="nav-link" to="/dashboard">
						Dashboard
					</Link>
				</li>
				<li className="nav-item">
					<Link className="nav-link" to="/edit-profile">
						Edit Profile
					</Link>
				</li>
				<li className="nav-item">
					<a href="" onClick={this.onLogoutClick.bind(this)} className="nav-link">
						Logout
					</a>
				</li>
			</ul>
		);
		const employerLinks = (
			<ul className="navbar-nav ml-auto">
				<li className="nav-item">
					<Link className="nav-link" to="/dashboard">
						Dashboard
					</Link>
				</li>
				<li className="nav-item">
					<Link className="nav-link" to="/leave">
						Leave Request
					</Link>
				</li>
				<li className="nav-item">
					<a href="" onClick={this.onLogoutClick.bind(this)} className="nav-link">
						Logout
					</a>
				</li>
			</ul>
		);

		const authLinks = isAdmin ? employeeLinks : employerLinks;

		const guestLinks = (
			<ul className="navbar-nav ml-auto">
				<li className="nav-item">
					<Link className="nav-link" to="/login">
						Login
					</Link>
				</li>
				<li className="nav-item">
					<Link className="nav-link" to="/register">
						Register
					</Link>
				</li>
			</ul>
		);

		return (
			<nav className="navbar navbar-sm navbar-dark bg-dark mb-4">
				<div className="container">
					<Link className="navbar-brand" to="/">
						Employee Management System
					</Link>
					<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#mobile-nav">
						<span className="navbar-toggler-icon" />
					</button>

					<div className="collapse navbar-collapse" id="mobile-nav">
						<ul className="navbar-nav mr-auto" />

						{isAuthenticated ? authLinks : guestLinks}
					</div>
				</div>
			</nav>
		);
	}
}
Navbar.propTypes = {
	logoutUser: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
	auth: state.auth
});

export default connect(mapStateToProps, { logoutUser })(Navbar);
