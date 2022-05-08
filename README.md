## HighLevel
Automation-Assessment

# Requirements
- Typescript 
- Node v16 or higher
- WebdriverIO 7.19
- VSCode 
- Cucumber-Gherkins Support extension

# Browser Support 
1. Chrome - configured here to run on maximised and incognito mode by default

# Project Structure
- config
  --wdio.config.ts
- src
  --pages
    -- samplepages.ts
  --uploads
  --utils
    --helper.ts
- test
  --features
    -- sample.feature
  --step-definitions
    -- sample.steps.ts
- package.json
- tsconfig.json

# Getting Started
# Install the dependancies
1. Clone the project from the git repository into your local machine.
2. npm install or npm i
3. npm test or npm run test
4. npm test -- --cucumberOpts.tagExpressions='@tag' --spec='./features/<featurefilename>.feature' (To run specific test scenario)
5. npm run report - for reporting

  
# Reporting
The framework publishes allure, cucumber.json and video reports
1. Execute the command : "npm run report"  - to generate a clean allure report after the end of test execution
2. Error or failed screenshots will be captured in the allure-report

# Key Features
- Cucumber BDD framework
- Page Object Design pattern
- Multi envrionment concept
- Allure Report and Video reporting feature
- Custome file download folder
- File/Data utilities
- Selectors/Helper classes
- Steps Logging mechanism
- Data tables

# Screenshots- Report
![image](https://user-images.githubusercontent.com/32395872/167259001-aeeba269-2486-4241-9513-6bf63f28ff39.png)
![image](https://user-images.githubusercontent.com/32395872/167259015-640e51ad-b264-42e3-8ac4-8af0875454c9.png)

  
# References
1. WebdriverIO - https://webdriver.io/
