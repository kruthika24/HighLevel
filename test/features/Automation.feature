@AutomationTab
Feature: The Assessment Automation - To test the 'gohighlevel' Automation Tab/Menu

    @Test @HighLevel @AutomationTab
    Scenario Outline: 01. As a user, I Verify the given <Menu Bars> Tabs on 'gohighlevel' website
        Given I am on the "gohighlevel" page
        When I am on login page and see a header with text loginPageText and title - Login
        And Log in with credentials - <Email> and <Password> having HomePageTitle
        Then Verify the <Menu-bars> tabs
        Then Log out of the application
        @qa
        Examples:
            | Email                  | Password | Menu-bars                                    |
            | kruthika.t24@gmail.com | Test@123 | launchpad,dashboard,opportunities,automation |


    @Test @AutomationTab
    Scenario Outline: 02. As a user, I perform the Automation workflow on 'gohighlevel' website
        Given I am on the "gohighlevel" page
        When I am on login page and see a header with text loginPageText and title - Login
        And Log in with credentials - <Email> and <Password> having HomePageTitle
        Then Navigate to the automation tab and create <Flow> for the below
            | Index | Name     | User        | Actions | FromName | LeadValue | AllowMultiple | ActionName | Window | Condition |
            | 1     | Test1Kru | Kruthika QA | SMS     | TesterK1 | 1000      | true          | Engineer1  | true   | If        |
        # | 2     | Test2Kru | Kruthika QA | Email   | TesterK2 | 2000      | false         | Engineer2  | false  |           |
        Then Navigate to the automation tab and remove <Flow> for the below data
            | Index |
            | 1     |

        Then Navigate to the automation tab and delete <Flow> for the below data
            | Index |
            | 1     |

        @qa
        Examples:
            | Email                  | Password | Flow     |
            | kruthika.t24@gmail.com | Test@123 | campaign |

