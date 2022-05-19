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
  - --wdio.config.ts
- src
  - --pages
    - -- samplepages.ts
  - --uploads
  - --utils
    - --helper.ts
- test
  - --features
    - -- sample.feature
  - --step-definitions
    - -- sample.steps.ts
- package.json
- tsconfig.json

# Getting Started
# Install the dependancies
1. Clone the project from the git repository into your local machine.
2. npm install or npm i
3. npm test or npm run test
4. npm test -- --cucumberOpts.tagExpressions='@tag' --spec='./features/<featurefilename>.feature' (To run specific test scenario)
5. npm run report - for reporting
6. By default the video reporter generates the .mp4 video after every successful run under _results_ folder (you comment this feature under wdio.config.ts)

  
# Reporting
The framework publishes allure, cucumber.json and video reports
1. Execute the command : "npm run report"  - to generate a clean allure report after the end of test execution
2. Error or failed screenshots will be captured in the allure-report
3. Execution video also present on allure report
4. By deafault the video folders and other report folders are deleted at the start of run.

# Key Features
- Cucumber BDD framework
- Page Object Design pattern
- Multi envrionment concept
- Allure Report and Video reporting feature
- Custome file download folder
- File/Data and retry utilities
- Selectors/Helper classes
- Steps Logging mechanism
- Data tables

# Screenshots- Report
![image](https://user-images.githubusercontent.com/32395872/167259001-aeeba269-2486-4241-9513-6bf63f28ff39.png)
![image](https://user-images.githubusercontent.com/32395872/167259015-640e51ad-b264-42e3-8ac4-8af0875454c9.png)
![image](https://user-images.githubusercontent.com/32395872/167337835-525c46bb-3e96-4d18-bcfd-7c28d0e1fada.png)

- Video Reporter Sample 
https://user-images.githubusercontent.com/32395872/169315750-b347eb7e-e065-40d3-a52c-f5f688924fc6.mp4


  
# References
1. WebdriverIO - https://webdriver.io/
