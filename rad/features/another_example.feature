# Created by colinwren at 12/03/2016
Feature: Another Example
  As a Victor developer
  In order to show off my idea
  I want to have an example feature to render

  Scenario: Multiplication
    Given I have "2" apples
    When I multiply my apples by "2"
    Then I should have "4" apples

  Scenario: Division
    Given I have "4" apples
    When I divide my apples by "2"
    Then I should have "2" apples