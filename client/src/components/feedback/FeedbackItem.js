import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { Link } from 'react-router-dom';

class FeedbackItem extends Component {
	render() {
		const { feedback, auth, showActions } = this.props;

		return (
			<div className="card card-body mb-3">
				<div className="row">
					<div className="col-md-2">
						<a href="profile.html">
							<img className="rounded-circle d-none d-md-block" src={feedback.avatar} alt="" />
						</a>
						<br />
						<p className="text-center">{feedback.name}</p>
					</div>
					<div className="col-md-10">
						<p className="lead">{feedback.text}</p>
						) : null}
					</div>
				</div>
			</div>
		);
	}
}

feedbackItem.defaultProps = {
	showActions: true
};

feedbackItem.propTypes = {
	feedback: PropTypes.object.isRequired,
	auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
	auth: state.auth
});

export default connect(mapStateToProps)(FeedbackItem);
