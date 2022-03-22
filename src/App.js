import React, { Component } from "react";
import "./App.css";
import "./nprogress.css";
import { getEvents, extractLocations } from "./api";
import EventList from "./EventList";
import CitySearch from "./CitySearch";
import EventGenre from "./EventGenre";
import NumberOfEvents from "./NumberOfEvents";
import { WarningAlert } from "./Alert";
import {
	ScatterChart,
	Scatter,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	ResponsiveContainer,
} from "recharts";

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
	updateEvents = async (location, eventCount = this.state.numberOfEvents) => {
		getEvents().then((events) => {
			const locationEvents =
				location === "all"
					? events
					: events.filter((event) => event.location === location);
			if (this.mounted) {
				this.setState({
					events: locationEvents.slice(0, eventCount),
					currentLocation: location,
				});
			}
		});
	};

	//4.4
	updateEventNumbers = (eventNumbers) => {
		this.setState({
			numberOfEvents: eventNumbers,
		});
		this.updateEvents(this.state.location, eventNumbers);
	};

	//4.9
	getData = () => {
		const { locations, events } = this.state;
		const data = locations.map((location) => {
			const number = events.filter(
				(event) => event.location === location
			).length;
			const city = location.split(", ").shift();
			return { city, number };
		});
		return data;
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
				<NumberOfEvents
					// 4.4
					updateEventNumbers={this.updateEventNumbers}
					numberOfEvents={this.state.numberOfEvents}
				/>

				<h4>Events in each city</h4>

				<div className="data-vis-wrapper">
					<EventGenre events={this.state.events} />
					<ResponsiveContainer height={400}>
						<ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
							<CartesianGrid />
							<XAxis type="category" dataKey="city" name="city" />
							<YAxis
								allowDecimals={false}
								type="number"
								dataKey="number"
								name="number of events"
							/>
							<Tooltip cursor={{ strokeDasharray: "3 3" }} />
							<Scatter data={this.getData()} fill="#8884d8" />
						</ScatterChart>
					</ResponsiveContainer>
				</div>

				<EventList events={this.state.events} />
			</div>
		);
	}
}

export default App;
