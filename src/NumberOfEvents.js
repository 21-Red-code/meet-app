import React, { Component } from "react";

class NumberOfEvents extends Component {
	state = {
		numberOfEvents: "32",
	};

	handleInputChange = (event) => {
		const value = event.target.value;
		this.setState({
			numberOfEvents: event.target.value,
		});
	};

	render() {
		const { numberOfEvents } = this.state;
		return (
			<div className="NumberOfEvents">
				<h4>Number Of Events</h4>
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
