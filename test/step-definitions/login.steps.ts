
import { Given, When, Then } from '@wdio/cucumber-framework';
import { helper } from '../../src/utils/helper';
import { selectors } from '../../src/utils/Selectors';
import { loginPage } from '../../src/pages/login.page';
import * as path from 'path';
import * as fs from 'fs';

import { downloadDir } from '../../src/utils/pathConstants'

//to fetch the data from json file
const data = require('../../src/utils/DataReader');


Given(/^I am on the (.*) page$/, { wrapperOptions: { retry: 2 } }, async (loginurl) => {
  if (loginurl = 'gohighlevel') {

    await helper.openURL(data.getData('loginUrl'));
  }
  else {
    console.log('!!====INVALID URL====!!')
  }
});


Then(/^I am on login page and see a header with text (.+) and title - (.+)$/, async (headerText, titleText) => {
  await helper.pause(2);
  const header = await selectors.loginPage.headingText;
  const title = await helper.getTitle();
  let expectedText, expectedTitle
  if (headerText == 'loginPageText') {
    expectedText = data.getData(headerText)
  } else {
    expectedText = headerText
  }
  if (titleText == 'login') {
    expectedTitle = data.getData(titleText)
  } else {
    expectedTitle = titleText
  }

  await expect(await header.getText()).toEqual(expectedText);
  await expect(title).toEqual(expectedTitle);
  await helper.addlog('Validated heading on the login', `${await header.getText()}`);
  await helper.addlog('Validated Title on the login', `${title}`);

});


Then(/^Log in with credentials - (.+) and (.+) having (.+)$/, async (email, password, pageTitleText) => {

  await loginPage.loginWithCredentials(email, password);
  await helper.addlog('Entering email and password', `${email} , ${password}`)

  const dashboard = await helper.selectorBasedOntext('dashboard', selectors.homePage.tabselectors);
  await helper.waitForDisplayed(dashboard, 1000)

  const receivedtitle = await helper.getTitle();
  let expectedTitle

  if (pageTitleText == 'HomePageTitle') {
    expectedTitle = data.getData('homePagetitle')
  } else {
    expectedTitle = pageTitleText
  }
  await expect(receivedtitle).toEqual(expectedTitle);
  await helper.addlog('Validating the Page Title', `${receivedtitle}`)
  console.log('******** SUCCESSFULLY LOGGED IN ********');

});


Given(/^I open the browser and load the url (.+)$/, { wrapperOptions: { retry: 2 } }, async function (homepageurl: string) {
  await helper.openURL(homepageurl)
  await helper.addlog('Loading URL', `${homepageurl}`)
});


When(/^I click on first file$/, async () => {
  const fileElement = selectors.homePage.download;
  await helper.click(fileElement)
  await helper.pause(6);
});

Then(/^I validate downloaded file extension$/, async () => {
  const extensions = ['.jpg', '.txt', '.pdf', '.png', '.json', '.jpeg', '.xlsx']
  const files = fs.readdirSync(downloadDir)
  files.forEach(file => {
    helper.toContain(extensions, path.extname(file))
  })
  await helper.deleteDirectory(downloadDir)
});


Then(/^Log out of the application$/, async function () {
  await helper.waitForDisplayed(selectors.homePage.profileDropdwn, 1000)
  await helper.click(selectors.homePage.profileDropdwn);
  await helper.click(selectors.homePage.signout);
  await helper.pause(2);
  // await helper.closebrowser();
});