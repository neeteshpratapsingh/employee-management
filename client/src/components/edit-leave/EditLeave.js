import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import SelectListGroup from '../common/SelectListGroup';
import { createLeave, getLeaves } from '../../actions/leaveActions';
import { getProfileByHandle } from '../../actions/profileActions';
import isEmpty from '../../validations/is-empty';

class CreateLeave extends Component {
	constructor(props) {
		super(props);
		this.state = {
			user: this.props.userid,
			email: '',
			name: '',
			leavetype: '',
			fromdate: '',
			todate: '',
			applyto: '',
			reason: '',
			contactdetails: '',
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

	componentWillReceiveProps(nextProps) {
		if (nextProps.errors) {
			this.setState({ errors: nextProps.errors });
		}

		if (nextProps.profile.profile) {
			const profile = nextProps.profile.profile;

			profile.leavetype = !isEmpty(profile.leavetype) ? profile.leavetype : '';
			profile.fromdate = !isEmpty(profile.fromdate) ? profile.fromdate : '';
			profile.todate = !isEmpty(profile.todate) ? profile.todate : '';
			profile.applyto = !isEmpty(profile.applyto) ? profile.applyto : '';
			profile.reason = !isEmpty(profile.reason) ? profile.reason : '';
			profile.contactdetails = !isEmpty(profile.contactdetails) ? profile.contactdetails : '';
			profile.designation = !isEmpty(profile.designation) ? profile.designation : '';
			profile.department = !isEmpty(profile.department) ? profile.department : '';
			profile.branch1 = !isEmpty(profile.branch1) ? profile.branch1 : '';
			profile.branch2 = !isEmpty(profile.branch2) ? profile.branch2 : '';
			profile.branch3 = !isEmpty(profile.branch3) ? profile.branch3 : '';

			const formatDate = (date) => {
				var MyDate = new Date(date);
				var MyDateString;

				MyDateString =
					MyDate.getFullYear() +
					'-' +
					('0' + (MyDate.getMonth() + 1)).slice(-2) +
					'-' +
					('0' + MyDate.getDate()).slice(-2);
				return MyDateString;
			};

			this.setState({
				user: this.props.match.params.id,
				name: profile.user.name,
				email: profile.user.email,
				leavetype: profile.leavetype,
				fromdate: formatDate(profile.fromdate),
				todate: formatDate(profile.todate),
				applyto: profile.applyto,
				reason: profile.reason,
				contactdetails: profile.contactdetails,
				designation: profile.designation,
				department: profile.department,
				branch1: profile.branch1,
				branch2: profile.branch2,
				branch3: profile.branch3
			});
		}
	}

	onSubmit(e) {
		e.preventDefault();
		console.log(this.state.user);

		const leaveData = {
			user: this.state.user,
			name: this.state.name,
			email: this.state.email,
			leavetype: this.state.leavetype,
			fromdate: this.state.fromdate,
			todate: this.state.todate,
			applyto: this.state.applyto,
			reason: this.state.reason,
			contactdetails: this.state.contactdetails,
			designation: this.state.designation,
			department: this.state.department,
			branch1: this.state.branch1,
			branch2: this.state.branch2,
			branch3: this.state.branch3
		};
		console.log('leave', leaveData);

		this.props.createLeave(leaveData, this.props.history);
	}

	onChange(e) {
		console.log(e.target);
		this.setState({ [e.target.name]: e.target.value });
	}

	render() {
		const { errors } = this.state;

		const leaveoptions = [
			{ label: ' Select Leave Type', value: 0 },
			{ label: 'Loss Of Pay', value: 'Loss Of Pay' },
			{ label: 'Comp Off', value: 'Comp Off' },
			{ label: 'Paid Leave', value: 'Paid Leave' }
		];
		const applyoptions = [
			{ label: ' Apply To', value: 0 },
			{ label: 'CEO', value: 'CEO' },
			{ label: 'HR Manager', value: 'HR Manager' },
			{ label: 'Executive Manager', value: 'Executive Manager' }
		];
		const branchoptions = [
			{ label: ' Select Branch', value: 0 },
			{ label: 'chennai', value: 'chennai' },
			{ label: 'madurai', value: 'madurai' },
			{ label: 'bangalore', value: 'bangalore' }
		];

		const designationoptions = [
			{ label: ' Select Designation', value: 0 },
			{ label: 'CEO', value: 'CEO' },
			{ label: 'Manager', value: 'Manager' },
			{ label: 'Web Developer', value: 'Web Developer' },
			{ label: 'Software Testing', value: 'Software Testing' }
		];

		const departmentoptions = [
			{ label: 'Select Department', value: 0 },
			{ label: 'Management', value: 'Management' },
			{ label: 'HR Department', value: 'HR Department' },
			{ label: 'Development', value: 'Development' }
		];

		return (
			<div className="create-leave">
				<div className="container">
					<div className="row">
						<div className="col-md-8 m-auto">
							<Link to="/profiles" className="btn btn-light">
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
									enabled="enabled"
									error={errors.email}
								/>
								<TextFieldGroup
									placeholder="Name"
									name="name"
									value={`${this.state.name}`}
									onChange={this.onChange}
									info="Name of Employee"
									enabled="enabled"
								/>
								<SelectListGroup
									placeholder="Leave type"
									name="leavetype"
									value={this.state.leavetype}
									onChange={this.onChange}
									options={leaveoptions}
									error={errors.leavetype}
									info="select your Leave Type"
								/>
								<p>From Date</p>
								<input
									type="date"
									name="fromdate"
									value={this.state.fromdate}
									onChange={this.onChange}
								/>
								<br />
								<br />
								<p>To Date</p>
								<input type="date" name="todate" value={this.state.todate} onChange={this.onChange} />
								<br />
								<br />
								<SelectListGroup
									placeholder="Apply To"
									name="applyto"
									value={`${this.state.applyto}`}
									onChange={this.onChange}
									options={applyoptions}
									error={errors.applyto}
									info="select your Apply option"
								/>
								<TextAreaFieldGroup
									placeholder="Reason"
									name="reason"
									value={`${this.state.reason}`}
									onChange={this.onChange}
									error={errors.reason}
									info="Please specifie your reason"
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
								<TextAreaFieldGroup
									placeholder="contactdetails"
									name="contactdetails"
									value={this.state.contactdetails}
									onChange={this.onChange}
									error={errors.contactdetails}
									info="Enter your contact details"
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
									{/* <div className="col-4">
										<TextFieldGroup
											name="already applied"
											value={`${filterleaves(this.state.branch3) + 1}`}
											onChange={this.onChange}
											info={`Your Application in ${this.state.branch3} Branch `}
											enabled="enabled"
										/>
									</div> */}
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
	userid: state.auth.user.id,
	leave: state.leave,
	errors: state.errors,
	auth: state.auth,
	profile: state.profile
});

export default connect(mapStateToProps, { createLeave, getProfileByHandle, getLeaves })(withRouter(CreateLeave));
