// import React, { Component } from 'react';
// import { notify } from 'react-notify-toast';
// import Spinner from './Spinner';
// import { API_URL } from '../../../config';

// export default class Landing extends Component {
// 	state = {
// 		sendingEmail: false
// 	};

// 	onSubmit = (event) => {
// 		event.preventDefault();
// 		this.state({ sendingEmail: true });

// 		fetch(`${API_URL}/email`, {
// 			method: 'post',
// 			headers: {
// 				accept: 'application/json',
// 				'content-type': 'application/json'
// 			},
// 			body: JSON.stringify({ email: this.email.value })
// 		})
// 			.then((res) => res.json())
// 			.then((data) => {
// 				this.setState({ sendingEmail: false });
// 				notify.show(data.msg);
// 				this.form.reset();
// 			})
// 			.catch((err) => console.log(err));
// 	};
// 	render = () => {
// 		const { sendingEmail } = this.state;

// 		return (
// 			<form onSubmit={this.onSubmit} ref={(form) => (this.form = form)}>
// 				<div>
// 					<input type="email" name="email" ref={(input) => (this.email = input)} required />
// 					<label htmlFor="email">email</label>
// 				</div>

// 				<div>
// 					<button type="submit" className="btn" disabled={sendingEmail}>
// 						{sendingEmail ? <Spinner size="lg" spinning="spinning" /> : 'Submit'}
// 					</button>
// 				</div>
// 			</form>
// 		);
// 	};
// }
