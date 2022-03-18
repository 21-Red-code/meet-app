import { loadFeature, defineFeature } from "jest-cucumber";
import React from "react";
import { mount } from "enzyme";

import App from "../App";

const feature = loadFeature("./src/features/showHideAnEventsDetails.feature");

defineFeature(feature, (test) => {
	test("All event elements are collapsed by default", ({
		given,
		when,
		then,
	}) => {
		let AppWrapper;
		given("the main page is open", () => {
			AppWrapper = mount(<App />);
			AppWrapper.update();
		});

		when("events are displayed", () => {});

		then("the events details should be collapsed", () => {
			expect(AppWrapper.find(".event__more-detail")).toHaveLength(0);
		});
	});

	test("User clicked to expand an event to see its details", ({
		given,
		when,
		then,
	}) => {
		let AppWrapper;
		given("the list of events are displayed", async () => {
			AppWrapper = await mount(<App />);
		});

		when("the user clicks on show details from an event", () => {
			AppWrapper.update();
			expect(AppWrapper.find(".event__details-button")).toHaveLength(2);
			AppWrapper.find(".event__details-button").at(0).simulate("click");
		});

		then("the event details will be displayed", () => {
			expect(AppWrapper.find(".event__more-detail")).toHaveLength(1);
		});
	});

	test("User closes an event details", ({ given, when, then }) => {
		let AppWrapper;
		given("the user has clicked on an event to display details", async () => {
			AppWrapper = await mount(<App />);
			AppWrapper.update();
			AppWrapper.find(".event__details-button").at(0).simulate("click");
		});

		when("the user clicks on “hide details” button", () => {
			AppWrapper.find(".event__details-button").at(0).simulate("click");
			expect(AppWrapper.find(".event__more-detail")).toHaveLength(0);
		});

		then("the event details will be hidden", () => {
			expect(AppWrapper.find(".event__more-detail")).toHaveLength(0);
		});
	});
});
