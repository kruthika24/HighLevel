@HighLevel
Feature: The Assessment Automation - gohighlevel Login/Home Page

    @HighLevel @Test @Login
    Scenario Outline: As a user, I can log into the gohighlevel app
        Given I am on the "gohighlevel" page
        When I am on login page and see a header with text <LoginHeaderText> and title - <LoginTitle>
        And Log in with credentials - <Email> and <password> having <PageTitle>

        Examples:
            | Email                  | password | LoginHeaderText        | LoginTitle | PageTitle        |
            | kruthika.t24@gmail.com | Test@123 | Sign into your account | Login      | Universal Agency |


    @download
    Scenario Outline: Webdriver IO inbuilt Faeture - Test File download
        Given I open the browser and load the url <PageUrl>
        When I click on first file
        Then I validate downloaded file extension

        Examples:
            | PageUrl                                     |
            | https://the-internet.herokuapp.com/download |