import React, { Component } from "react";
import "./App.css";
import "./nprogress.css";
import { getEvents, extractLocations } from "./api";
import EventList from "./EventList";
import CitySearch from "./CitySearch";
import NumberOfEvents from "./NumberOfEvents";
import { WarningAlert } from "./Alert";

class App extends Component {
	state = {
		events: [],
		locations: [],
		//4.4
		location: "all",
		numberOfEvents: "32",
	};

	// 4.4
	componentDidMount() {
		this.mounted = true;
		getEvents().then((events) => {
			if (this.mounted) {
				this.setState({
					events: events.slice(0, this.state.numberOfEvents),
					locations: extractLocations(events),
				});
			}
		});
	}

	componentWillUnmount() {
		this.mounted = false;
	}

	//4.4
	updateEvents = (location = "all", eventCount = this.state.numberOfEvents) => {
		//this.mounted = true;
		getEvents().then((events) => {
			const locationEvents =
				location === "all"
					? events.slice(0, eventCount)
					: events
							.filter((event) => event.location === location)
							.slice(0, eventCount);

			this.setState({
				events: locationEvents.slice(0, eventCount),
				location,
			});
		});
	};

	//4.4
	updateEventNumbers = (eventNumbers) => {
		this.setState({
			numberOfEvents: eventNumbers,
		});
		this.updateEvents(this.state.location, eventNumbers);
	};

	render() {
		return (
			<div className="App">
				<h3>Worldwide Events for Full-Stack Web Developers</h3>
				{!navigator.onLine ? (
					<WarningAlert
						style={{ textAlign: "center" }}
						text=" Offline Mode is ON! Only locally saved events will be shown "
					/>
				) : (
					<WarningAlert text="" />
				)}
				<CitySearch
					locations={this.state.locations}
					updateEvents={this.updateEvents}
				/>
				<EventList events={this.state.events} />
				<NumberOfEvents
					// 4.4
					updateEventNumbers={this.updateEventNumbers}
				/>
			</div>
		);
	}
}

export default App;
