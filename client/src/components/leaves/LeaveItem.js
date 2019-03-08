import React, { Component } from 'react';
import PropTypes from 'prop-types';

class LeaveItem extends Component {
	render() {
		const { leaves } = this.props;
		const { serial } = this.props;
		console.log('leave', leaves);
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

		return (
			<tr>
				<th>{serial}</th>
				{<th scope="row">{leaves.email}</th>}
				{<td>{leaves.name}</td>}
				<td>{leaves.leavetype}</td>
				<td>{leaves.fromdate}</td>
				<td>{leaves.todate}</td>
				<td>{leaves.applyto}</td>
				<td>{leaves.reason}</td>
				<td>{leaves.contactdetails}</td>
				<td>{leaves.designation}</td>
				<td>{leaves.department}</td>
				<td>{leaves.branch1}</td>
				<td>{leaves.branch2}</td>
				<td>{leaves.branch3}</td>
				<td>{formatDate(leaves.date)} </td>
			</tr>
		);
	}
}

LeaveItem.propTypes = {
	leaves: PropTypes.object.isRequired
};

export default LeaveItem;
