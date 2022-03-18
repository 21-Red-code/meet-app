Feature: SHOW/HIDE an events details
  Scenario: All event elements are collapsed by default
    Given the main page is open
    When events are displayed
    Then the events details should be collapsed

  Scenario: User clicked to expand an event to see its details
    Given the list of events are displayed
    When the user clicks on show details from an event
    Then the event details will be displayed

  Scenario: User closes an event details
    Given the user has clicked on an event to display details
    When the user clicks on “hide details” button
    Then the event details will be hidden