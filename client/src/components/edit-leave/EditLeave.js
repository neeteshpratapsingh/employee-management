import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import TextFieldGroup from '../common/TextFieldGroup';
import SelectListGroup from '../common/SelectListGroup';
import { createLeave, getLeaves } from '../../actions/leaveActions';
import { getProfileByHandle } from '../../actions/profileActions';
import isEmpty from '../../validations/is-empty';

class CreateLeave extends Component {
	constructor(props) {
		super(props);
		this.state = {
			user: this.props.match.params.id,
			designation: '',
			department: '',
			branch1: '',
			branch2: '',
			branch3: '',
			errors: {}
		};

		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}

	componentDidMount() {
		this.props.getLeaves();
		this.props.getProfileByHandle(this.props.match.params.id);
		if (!this.props.auth.isAuthenticated) {
			this.props.history.push('/login');
		}
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.errors) {
			this.setState({ errors: nextProps.errors });
		}

		if (nextProps.profile.profile) {
			const profile = nextProps.profile.profile;

			profile.designation = !isEmpty(profile.designation) ? profile.designation : '';
			profile.department = !isEmpty(profile.department) ? profile.department : '';

			this.setState({
				user: this.props.match.params.id,
				name: profile.user.name,
				email: profile.user.email,
				designation: profile.designation,
				department: profile.department
			});
		}
	}

	onSubmit(e) {
		e.preventDefault();

		const leaveData = {
			user: this.state.user,
			designation: this.state.designation,
			department: this.state.department,
			branch1: this.state.branch1,
			branch2: this.state.branch2,
			branch3: this.state.branch3
		};

		this.props.createLeave(leaveData, this.props.history);
	}

	onChange(e) {
		this.setState({ [e.target.name]: e.target.value });
	}

	render() {
		// ......................................

		const filterleaves = (branchname) => {
			const { leaves, loading } = this.props.leave;

			let filterleave = [];

			if (leaves === null || loading) {
			} else {
				if (leaves.length > 0) {
					leaves.map((leaves) => {
						if (
							leaves.branch1 === branchname ||
							leaves.branch2 === branchname ||
							leaves.branch3 === branchname
						) {
							filterleave.push(leaves);
						} else {
							console.log('No Leave in this Branch');
						}

						return false;
					});
				} else {
					console.log('no Leave found');
				}
			}
			return filterleave.length;
		};

		// .................................

		const { errors } = this.state;

		const branchoptions = [
			{ label: '* Select Branch', value: 0 },
			{ label: 'chennai', value: 'chennai' },
			{ label: 'madurai', value: 'madurai' },
			{ label: 'bangalore', value: 'bangalore' }
		];

		const designationoptions = [
			{ label: '* Select Designation', value: 0 },
			{ label: 'CEO', value: 'CEO' },
			{ label: 'Manager', value: 'Manager' },
			{ label: 'Web Developer', value: 'Web Developer' },
			{ label: 'Software Testing', value: 'Software Testing' }
		];

		const departmentoptions = [
			{ label: '* Select Department', value: 0 },
			{ label: 'Management', value: 'Management' },
			{ label: 'HR Department', value: 'HR Department' },
			{ label: 'Development', value: 'Development' }
		];

		return (
			<div className="create-leave">
				<div className="container">
					<div className="row">
						<div className="col-md-8 m-auto">
							<Link to="/leaves" className="btn btn-light">
								Go Back
							</Link>
							<h1 className="display-4 text-center">Create Leave Request</h1>
							<form onSubmit={this.onSubmit}>
								<TextFieldGroup
									placeholder="email"
									name="email"
									value={`${this.state.email}`}
									onChange={this.onChange}
									info="email of employee"
									disabled="disabled"
									error={errors.email}
								/>
								<TextFieldGroup
									placeholder="Name"
									name="name"
									value={`${this.state.name}`}
									onChange={this.onChange}
									info="Name of Employee"
									disabled="disabled"
								/>

								<SelectListGroup
									placeholder="designation"
									name="designation"
									value={this.state.designation}
									onChange={this.onChange}
									options={designationoptions}
									error={errors.designation}
									info="select your designation"
								/>
								<SelectListGroup
									placeholder="department"
									name="department"
									value={this.state.department}
									onChange={this.onChange}
									options={departmentoptions}
									error={errors.department}
									info="select your department"
								/>
								<div className="row">
									<div className="col-8">
										<br />
										<SelectListGroup
											placeholder="Branch 1"
											name="branch1"
											value={`${this.state.branch1}`}
											onChange={this.onChange}
											options={branchoptions}
											error={errors.branch1}
											info="select your 1st Branch Preference"
										/>
									</div>
									<div className="col-4">
										<TextFieldGroup
											name="already applied"
											value={`${filterleaves(this.state.branch1) + 1}`}
											onChange={this.onChange}
											info={`Your Application in ${this.state.branch1} Branch `}
											disabled="disabled"
										/>
									</div>
								</div>

								<div className="row">
									<div className="col-8">
										<br />

										<SelectListGroup
											placeholder="Branch 2"
											name="branch2"
											value={this.state.branch2}
											onChange={this.onChange}
											options={branchoptions}
											error={errors.branch2}
											info="select your 2nd Branch Preference"
										/>
									</div>
									<div className="col-4">
										<TextFieldGroup
											name="already applied"
											value={`${filterleaves(this.state.branch2) + 1}`}
											onChange={this.onChange}
											info={`Your Application in ${this.state.branch2} Branch `}
											disabled="disabled"
										/>
									</div>
								</div>

								<div className="row">
									<div className="col-8">
										<br />
										<SelectListGroup
											placeholder="Branch 3"
											name="branch3"
											value={this.state.branch3}
											onChange={this.onChange}
											options={branchoptions}
											error={errors.branch3}
											info="select your 3rd Branch Preference"
										/>
									</div>
									<div className="col-4">
										<TextFieldGroup
											name="already applied"
											value={`${filterleaves(this.state.branch3) + 1}`}
											onChange={this.onChange}
											info={`Your Application in ${this.state.branch3} Branch `}
											disabled="disabled"
										/>
									</div>
								</div>

								{errors.email}
								<input type="submit" value="Submit" className="btn btn-info btn-block mt-4" />
							</form>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

CreateLeave.propTypes = {
	createLeave: PropTypes.func.isRequired,
	getProfileByHandle: PropTypes.func.isRequired,
	leave: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired,
	auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
	leave: state.leave,
	errors: state.errors,
	auth: state.auth,
	profile: state.profile
});

export default connect(mapStateToProps, { createLeave, getProfileByHandle, getLeaves })(withRouter(CreateLeave));
