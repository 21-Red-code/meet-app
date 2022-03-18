import { loadFeature, defineFeature } from "jest-cucumber";
import React from "react";
import { mount } from "enzyme";

import App from "../App";

// loadFeature expects file path to start from project root
const feature = loadFeature("./src/features/specifyNumberOfEvents.feature");

defineFeature(feature, (test) => {
	test("The app should display 32 events by default", ({
		given,
		when,
		then,
	}) => {
		let AppWrapper;
		given("the user is on main page", () => {
			AppWrapper = mount(<App />);
		});

		when("the user hasn’t specified a number of events", () => {
			AppWrapper.update();
		});

		then("default number of events should be displayed", () => {
			expect(AppWrapper.find(".event")).toHaveLength(2);
		});
	});

	test("When the user wants to change number of events", ({
		given,
		when,
		then,
	}) => {
		let AppWrapper;
		given("the main page is open", () => {
			AppWrapper = mount(<App />);
		});

		when("the user Specifies number events", () => {
			AppWrapper.update();
			AppWrapper.find(".numberOfEvents").simulate("change", {
				target: { value: "1" },
			});
		});
		then(
			"the number of events displayed should match with what the user typed",
			() => {
				AppWrapper.update();
				expect(AppWrapper.find(".event")).toHaveLength(2);
			}
		);
	});
});
