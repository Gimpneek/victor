# Created by colinwren at 12/03/2016
Feature: Example feature
  As a Victor developer
  In order to show off my idea
  I want to have an example feature to render

  Scenario: Addition
    Given I have "2" apples
    When I get given "3" apples
    Then I should have "5" apples

  Scenario: Subtraction
    Given I have "5" apples
    When I give away "2" apples
    Then I should have "3" apples