import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FeedbackItem from './FeedbackItem';

class feedbackFeed extends Component {
	render() {
		const { feedback } = this.props;

		return feedback.map((feedback) => <feedbackItem key={post._id} feedback={feedback} />);
	}
}

FeedbackFeed.propTypes = {
	feedback: PropTypes.array.isRequired
};

export default FeedbackFeed;
