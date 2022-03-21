import React, { Component } from "react";
import { ErrorAlert } from "./Alert";

class NumberOfEvents extends Component {
	state = {
		numberOfEvents: "32",
		infoText: "",
	};

	handleInputChange = (event) => {
		const value = event.target.value;
		this.setState({
			numberOfEvents: event.target.value,
		});
		if (value < 1 || value > 32) {
			this.setState({
				infoText: "Please enter a number only in range of 1-32",
			});
		} else {
			return this.setState({
				numberOfEvents: event.target.value,
				infoText: "",
			});
		}
	};

	render() {
		const { numberOfEvents } = this.state;
		return (
			<div className="NumberOfEvents">
				<h4>Number Of Events</h4>
				<ErrorAlert text={this.state.infoText} />
				<input
					type="number"
					onChange={this.handleInputChange}
					value={this.state.numberOfEvents}
					className="numberOfEvents"
				/>
			</div>
		);
	}
}

export default NumberOfEvents;
