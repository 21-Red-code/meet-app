Feature: Specify number of events

  Scenario: The app should display 32 events by default
    Given the user is on main page
    When the user hasn’t specified a number of events
    Then default number of events should be displayed

  Scenario: When the user wants to change number of events
    Given the main page is open
    When the user Specifies number events
    Then the number of events displayed should match with what the user typed