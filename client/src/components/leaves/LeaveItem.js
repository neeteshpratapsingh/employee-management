import React, { Component } from 'react';
import PropTypes from 'prop-types';

class LeaveItem extends Component {
	render() {
		const { leaves } = this.props;
		const { serial } = this.props;

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
				<th scope="row">{leaves.user.email}</th>
				<td>{leaves.user.name}</td>
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
