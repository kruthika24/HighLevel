@HighLevel @CalendarTab
Feature: The Assessment Automation - To test the 'gohighlevel' Automation Tab/Menu


    @Test @HighLevel @CalendarTab
    Scenario Outline: 01. As a user, I perform the create/view/edit/delete workflow for Teams on 'gohighlevel' website
        Given I am on the "gohighlevel" page
        When I am on login page and see a header with text loginPageText and title - Login
        And Log in with credentials - <Email> and <Password> having HomePageTitle
        Then Navigate to the calendar tab and create/view/edit/delete <Flow> for the below
            | Index | TeamName | TeamMembers           | CalendarName | CalendarDesc | Slug  | ApplyTeamtoExisting | AssignContacts | SkipContacts |
            | 1     | TeamK    | Kruthika QA, Doctor A | CalenK       | DescK        | SlugK | true                | true           | true         |
        Then Log out of the application
        @qa
        Examples:
            | Email                  | Password | Flow     |
            | kruthika.t24@gmail.com | Test@123 | my-staff |



    @Test @HighLevel @CalendarTab
    Scenario Outline: 02. As a user, I perform the create/view/edit/delete workflow for Employee on 'gohighlevel' website
        Given I am on the "gohighlevel" page
        When I am on login page and see a header with text loginPageText and title - Login
        And Log in with credentials - <Email> and <Password> having HomePageTitle
        Then Navigate to the calendar-team Management tab and create-view <Flow> for the below
            | Index | FirstName | Password | Email    | EnableSignature | IncludeSignature |
            | 1     | DoctorK   | Test@123 | @abc.com | true            | true             |
        Then Navigate to the calendar-team Management tab and edit <Flow> for below
            | Index |
            | 1     |
        Then Navigate to the calendar-team Management tab and delete <Flow> for below
            | Index |
            | 1     |

        @qa
        Examples:
            | Email                  | Password | Flow     |
            | kruthika.t24@gmail.com | Test@123 | my-staff |



    @Test @E2E @HighLevel @CalendarTab
    Scenario Outline: 03. As a user, I want to schedule an appointment on 'gohighlevel' website
        Given Login to the application with <Email> and <Password>
        Then Navigate to the calendar tab and create/view <Flow> for the below
            | Index | TeamName | TeamMembers                     | CalendarName | CalendarDesc | Slug  | ApplyTeamtoExisting | AssignContacts | SkipContacts |
            | 1     | TeamK    | Kruthika QA, Doctor A, Doctor B | CalenK       | DescK        | slugk | true                | true           | true         |
        Then Log out of the application
        And Login to the application with <Email> and <Password>
        Then Navigate to the calendar page and schedule for the below
            | Index | ScheduleName | Desc        | urlSlug | CustomCode | TeamIndex | Date      | Time     | FirstName | LastName | Email    | Phone      |
            | 1     | Schedule     | description | slug    | K123       | 1         | 2022-5-18 | 12:00 PM | Patient   | K        | @abc.com | 9090909090 |

        @qa
        Examples:
            | Email                  | Password | Flow     |
            | kruthika.t24@gmail.com | Test@123 | my-staff |