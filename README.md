## HighLevel
Automation-Assessment

# Requirements
Typescript 
Node v16 or higher
WebdriverIO 7.19
VSCode 
Cucumber-Gherkins Support extension

# Browser Support 
1. Chrome

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
1. npm install or npm i
2. npm test or npm run test
3. npm test -- --cucumberOpts.tagExpressions='@tag' --spec='./features/<featurefilename>.feature' (To run specific test scenario)
4. npm run report - for reporting

  
# Reporting
The framework publishes allure, cucumber.json and video reports
1. Execute the command : "npm run report"  - to generate a clean allure report after the end of test execution
2. Error or failed screenshots will be captured in the allure-report

# Key Features
- Cucumber BDD framework
- Page Object Design pattern
- SuperTest API Integration
- Multi envrionment support
- Allure Report
- Custome file download folder
- File/Folder utilities
- Assertion utilites
- Steps Logging mechanism
  
# References
1. WebdriverIO - https://webdriver.io/
