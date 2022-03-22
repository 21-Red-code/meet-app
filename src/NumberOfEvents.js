import React, { Component } from "react";
import { ErrorAlert } from "./Alert";
import "./App.css";

class NumberOfEvents extends Component {
	state = {
		numberOfEvents: "32",
		infoText: "",
	};

	handleInputChange = (event) => {
		const number = event.target.value;
		this.setState({
			numberOfEvents: event.target.value,
		});

		if (number < 1 || number > 32) {
			this.setState({
				infoText: "Please enter a number only in range of 1-32",
			});

		} else {
			return this.setState({
				numberOfEvents: number,
				infoText: "",
			});
		}
		this.props.updateEventNumbers(event.target.value);
	};

	render() {
		return (
			<div className="NumberOfEvents">
				<ErrorAlert text={this.state.infoText} />
				<p>Number Of Events</p>
				<input
					type="number"
					onChange={this.handleInputChange}
					value={this.state.numberOfEvents}
					className="eventsNumber"
				/>
			</div>
		);
	}
}

export default NumberOfEvents;
