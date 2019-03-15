import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import FeedbackForm from './FeedbackForm';
import FeedbackFeed from './FeedbackFeed';
import { getFeedbacks } from '../../actions/feedbackActions';

class Feedbacks extends Component {
	componentDidMount() {
		this.props.getFeedbacks();
	}

	render() {
		const { feedbacks, loading } = this.props;
		let feedbackContent;

		if (feedbacks === null || loading) {
		} else {
			feedbackContent = <FeedbackFeed feedbacks={feedbacks} />;
		}

		return (
			<div className="feedbacks">
				<div className="container">
					<div className="row">
						<div className="col-md-12">
							<Link to="/dashboard" className="btn btn-light mb-3">
								Back to Dashboard
							</Link>
							<FeedbackForm />

							{feedbackContent}
						</div>
					</div>
				</div>
			</div>
		);
	}
}

Feedbacks.propTypes = {
	getFeedbacks: PropTypes.func.isRequired,
	feedback: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
	feedback: state.feedback
});

export default connect(mapStateToProps, { getFeedbacks })(Feedbacks);
