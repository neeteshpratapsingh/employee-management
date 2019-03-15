import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { deleteFeedback } from '../../actions/feedbackActions';

class FeedbackItem extends Component {
	onDeleteClick(id) {
		this.props.deleteFeedback(id);
	}

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
						{showActions ? (
							<span>
								{feedback.user === auth.user.id ? (
									<button
										onClick={this.onDeleteClick.bind(this, feedback._id)}
										type="button"
										className="btn btn-danger mr-1"
									>
										<i className="fas fa-times" />
									</button>
								) : null}
							</span>
						) : null}
					</div>
				</div>
			</div>
		);
	}
}

FeedbackItem.defaultProps = {
	showActions: true
};

FeedbackItem.propTypes = {
	deleteFeedback: PropTypes.func.isRequired,
	feedback: PropTypes.object.isRequired,
	auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
	auth: state.auth
});

export default connect(mapStateToProps, { deleteFeedback })(FeedbackItem);
