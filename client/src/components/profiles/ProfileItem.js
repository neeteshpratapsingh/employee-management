import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import { Link } from 'react-router-dom';

class ProfileItem extends Component {
	render() {
		const { profile } = this.props;
		const { serial } = this.props;

		console.log(profile);

		return (
			<tr>
				<th>{serial}</th>
				<th scope="row">
					<td>{profile.user.name}</td>{' '}
				</th>
				<td>{profile.user.email}</td>
				<td>{profile.currentbranch}</td>
				<td>{profile.department}</td>
				<td>{profile.designation}</td>
				<td>{profile.salary}</td>
				<td>{profile.address}</td>
				<td>{profile.gender}</td>
				<td>{profile.maritalstatus}</td>
				<td>{profile.mobile}</td>

				{/* <td>
					{' '}
					<Link to={`/profile/edit/${profile.user._id}`} className="btn btn-info">
						Edit Profile
					</Link>
				</td>
				<td>
					{' '}
					<Link to={`/leave/${profile.user._id}`} className="btn btn-info">
						Apply Leave
					</Link>
				</td> */}
			</tr>
		);
	}
}

ProfileItem.propTypes = {
	profile: PropTypes.object.isRequired
};

export default ProfileItem;
