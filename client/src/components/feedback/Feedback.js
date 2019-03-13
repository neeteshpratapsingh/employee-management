import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import FeedbackForm from './FeedbackForm';
import feedbackFeed from './FeedbackFeed';
import { getFeedback } from '../../actions/feedbackActions';

class Feedback extends Component {
	componentDidMount() {
		this.props.getFeedback();
	}

	render() {
		const { feedback, loading } = this.props.feedback;
		let feedbackContent;

		if (feedback === null || loading) {
		} else {
			feedbackContent = <FeedbackFeed feedback={feedback} />;
		}

		return (
			<div className="feedback">
				<div className="container">
					<div className="row">
						<div className="col-md-12">
							<FeedbackForm />
							{feedbackContent}
						</div>
					</div>
				</div>
			</div>
		);
	}
}

Feedback.propTypes = {
	getFeedback: PropTypes.func.isRequired,
	post: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
	post: state.post
});

export default connect(mapStateToProps, { getfeedback })(Feedback);
