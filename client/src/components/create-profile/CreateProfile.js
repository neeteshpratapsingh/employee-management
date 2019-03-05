import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import SelectListGroup from '../common/SelectListGroup';
import { createProfile } from '../../actions/profileActions';

class CreateProfile extends Component {
	constructor(props) {
		super(props);
		this.state = {
			user: this.props.match.params.id,

			currentbranch: '',
			designation: '',
			department: '',
			salary: '',
			gender: '',
			maritalstatus: '',
			dateofbirth: '',
			dateofjoining: '',
			bloodgroup: '',
			mobile: '',
			address: '',
			errors: {}
		};

		// this.onChange = this.onChange.bind(this);
		// this.onSubmit = this.onSubmit.bind(this);
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.errors) {
			this.setState({ errors: nextProps.errors });
		}
	}

	onSubmit = async (e) => {
		// e.preventdefault();
		const profileData = {
			currentbranch: this.state.currentbranch,
			department: this.state.department,
			designation: this.state.designation,
			salary: this.state.salary,
			dateofjoining: this.state.dateofjoining,
			dateofbirth: this.state.dateofbirth,
			gender: this.state.gender,
			maritalstatus: this.state.maritalstatus,
			bloodgroup: this.state.bloodgroup,
			mobile: this.state.mobile,
			address: this.state.address
		};
		// await this.props.createProfile(profileData, this.props.history);
		await this.props.history.push('/profiles');
		// this.props.createProfile(profileData, this.props.history);
	};

	onChange = (e) => {
		this.setState({ [e.target.name]: e.target.value });
	};

	render() {
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

		const genderoptions = [
			{ label: '* Select Gender', value: 0 },
			{ label: 'Male', value: 'Male' },
			{ label: 'Female', value: 'Female' }
		];

		const maritalstatusoptions = [
			{ label: '* Select Marital Status', value: 0 },
			{ label: 'Married', value: 'Married' },
			{ label: 'Single', value: 'Single' }
		];

		return (
			<div className="create-profile">
				<div className="container">
					<div className="row">
						<div className="col-md-8 m-auto">
							<h1 className="dispaly-4 text-center"> Create your Profile</h1>
							<p className="lead teaxt-center">Employee Profile</p>
							<small className="d-block pb-3">*= required fields</small>
							{/* <form onSubmit={this.onSubmit}> */}
							<SelectListGroup
								placeholder="Current Branch"
								name="currentbranch"
								value={this.state.currentbranch}
								onChange={this.onChange}
								options={branchoptions}
								error={errors.currentbranch}
								info="Select Employee cadre"
							/>
							<SelectListGroup
								placeholder="designation"
								name="designation"
								value={this.state.designation}
								onChange={this.onChange}
								options={designationoptions}
								error={errors.designation}
								info="select Employee designation"
							/>
							<SelectListGroup
								placeholder="department"
								name="department"
								value={this.state.department}
								onChange={this.onChange}
								options={departmentoptions}
								error={errors.department}
								info="select Employee department"
							/>
							<SelectListGroup
								placeholder="Gender"
								name="gender"
								value={this.state.gender}
								onChange={this.onChange}
								options={genderoptions}
								error={errors.gender}
								info="select Employee Gender"
							/>
							<SelectListGroup
								placeholder="Marital Status"
								name="maritalstatus"
								value={this.state.maritalstatus}
								onChange={this.onChange}
								options={maritalstatusoptions}
								error={errors.maritalstatus}
								info="select Employee Marital Status"
							/>
							<p>Date of Joining</p>
							<input
								type="date"
								name="dateofjoining"
								value={this.state.dateofjoining}
								onChange={this.onChange}
							/>
							<br />
							<br />
							<p>Date of Birth</p>

							<input
								type="date"
								name="dateofbirth"
								value={this.state.dateofbirth}
								onChange={this.onChange}
							/>
							<br />
							<br />
							<TextFieldGroup
								placeholder="Blood Group"
								name="bloodgroup"
								value={`${this.state.bloodgroup}`}
								onChange={this.onChange}
								error={errors.bloodgroup}
								info="Enter Employee Blood Group"
							/>
							<TextFieldGroup
								placeholder="Mobile Number"
								name="mobile"
								value={`${this.state.mobile}`}
								onChange={this.onChange}
								error={errors.mobile}
								info="Enter Employee Mobile Number"
							/>
							<TextAreaFieldGroup
								placeholder="Address"
								name="address"
								value={this.state.address}
								onChange={this.onChange}
								error={errors.address}
								info="Enter the Employee Address"
							/>
							<button onClick={this.onSubmit} className="btn btn-info btn-block mt-4">
								Submit
							</button>
							{/* </form> */}
						</div>
					</div>
				</div>
			</div>
		);
	}
}

CreateProfile.propTypes = {
	profile: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
	profile: state.profile,
	errors: state.errors
});

export default connect(mapStateToProps, createProfile)(withRouter(CreateProfile));
