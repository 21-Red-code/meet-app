import React, { Component } from "react";

class Alert extends Component {
	constructor(props) {
		super(props);
		this.color = null;
	}

	getStyle = () => {
		return {
			color: this.color,
		};
	};

	render() {
		return (
			<div className="Alert">
				<p style={this.getStyle()}>{this.props.text}</p>
			</div>
		);
	}
}

class InfoAlert extends Alert {
	constructor(props) {
		super(props);
		this.color = "blue";
		this.background = "#9dc5f9";
	}

	getStyle = () => {
		return {
			color: this.color,
			textDecorationLine: "underline",
			background: this.background,
		};
	};
}

class WarningAlert extends Alert {
	constructor(props) {
		super(props);
		this.color = "orange";
		this.background = "#fce08d";
	}

	getStyle = () => {
		return {
			color: this.color,
			textDecorationLine: "underline",
			background: this.background,
		};
	};
}

class ErrorAlert extends Alert {
	constructor(props) {
		super(props);
		this.color = "red";
		this.background = "#f5abb0";
	}

	getStyle = () => {
		return {
			color: this.color,
			background: this.background,
			textDecorationLine: "underline",
		};
	};
}

export { InfoAlert, WarningAlert, ErrorAlert };
