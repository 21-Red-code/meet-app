import React, { Component } from "react";
import "./App.css";
import EventList from "./EventList";
import CitySearch from "./CitySearch ";

class App extends Component {
	state = {
		events: [],
		locations: [],
		currentLocation: "all",
		numberOfEvents: 32,
		showWelcomeScreen: undefined,
	};
	render() {
		const { events, numberOfEvents } = this.state;
		return (
			<div className="App">
				<CitySearch />
				<EventList events={events} numberOfEvents={numberOfEvents} />
			</div>
		);
	}
}

export default App;
