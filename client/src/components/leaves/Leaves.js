import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Spinner from '../common/Spinner';
import { getLeaves } from '../../actions/leaveActions';
import LeaveItem from './LeaveItem';

class Profiles extends Component {
	componentDidMount() {
		this.props.getLeaves();
		if (!this.props.auth.isAuthenticated) {
			this.props.history.push('/login');
		}
	}

	render() {
		const { leaves, loading } = this.props.leave;
		let leaveItems;
		let spinners;
		if (leaves === null || loading) {
			spinners = <Spinner />;
		} else {
			if (leaves.length > 0) {
				let a = 0;

				leaveItems = leaves.map((leaves) => (
					<LeaveItem serial={(a = a + 1)} key={leaves._id} leaves={leaves} />
				));
			} else {
				leaveItems = <h4>No leaves found...</h4>;
			}
		}

		return (
			<div className="leaves">
				<div className="container">
					<div className="row">
						<div className="col-md-12">
							<h1 className="display-4 text-center">Leave Applied </h1>
							<p className="lead text-center">List of Employee Leave Applications details</p>
							{spinners}
							<table className="table">
								<thead className="thead-dark">
									<tr>
										<th scope="col">S.No</th>
										<th scope="col">Email</th>
										<th scope="col">Name</th>
										<th scope="col">Designation</th>
										<th scope="col">Department</th>
										<th scope="col">Branch 1</th>
										<th scope="col">Branch 2</th>
										<th scope="col">Branch 3</th>
										<th scope="col">Applied Date </th>
									</tr>
								</thead>
								<tbody>{leaveItems}</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

Profiles.propTypes = {
	getLeaves: PropTypes.func.isRequired,
	leave: PropTypes.object.isRequired,
	auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
	leave: state.leave,
	auth: state.auth
});

export default connect(mapStateToProps, { getLeaves })(Profiles);
