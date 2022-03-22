import React, { Component } from "react";

class Event extends Component {
	state = {
		expanded: false,
		eventDetailsButtonText: "More details",
	};

	handleClickDetailsButton = (e) => {
		const current = this.state.expanded;
		this.setState({
			expanded: current ? false : true,
			eventDetailsButtonText: current ? "More details" : "Hide details",
		});
	};

	render() {
		const { event } = this.props;
		const { expanded, eventDetailsButtonText } = this.state;
		return (
			<div className="event">
				<h2 className="summary">{event.summary}</h2>

				<p className="start-date">
					{event.start.dateTime} ({event.start.timeZone})
				</p>

				<p className="location">{event.location}</p>

				{expanded && (
					<div className="event__more-detail">
						<h3 className="event__more-detail__header">Info</h3>
						<p className="event__more-details__description">
							{event.description}
						</p>
						<div className="event__more-detail__link-line">
							<a className="event__more-detail__link" href={event.htmlLink}>
								{event.htmlLink}
							</a>
						</div>
					</div>
				)}

				<button
					className="event__details-button"
					onClick={(e) => this.handleClickDetailsButton(e)}
				>
					{eventDetailsButtonText}
				</button>
			</div>
		);
	}
}
export default Event;
