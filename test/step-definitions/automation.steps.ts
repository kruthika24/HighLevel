import { Given, When, Then } from '@wdio/cucumber-framework';
import { Logger, LoggerConfig } from "log4ts";
import { helper } from '../../src/utils/Helper';
import { selectors } from '../../src/utils/Selectors';
import { loginPage } from '../../src/pages/login.page';
import { automationPage } from '../../src/pages/automation.page';
import _ from 'lodash';

var randomstring = require("randomstring");
import { $internal } from 'typescript-logging';
const logger = Logger.getLogger();
const path = require('path');
//to fetch the data from json file
const data = require('../../src/utils/DataReader');


Then(/^Verify the (.+) tabs$/, async function (menubar) {
    await helper.pause(2);
    let items = menubar.split(',');
    await automationPage.verifyTabs(items);
});


Then(/^Navigate to the automation tab and create (.+) for the below$/, { wrapperOptions: { retry: 2 } }, async function (flow, details) {
    let data1 = details.hashes();
    let automationDataArray = [];
    if (flow == 'campaign') {

        for (const i of data1) {
            automationDataArray.push({
                Index: i.Index,
                Name: i.Name + randomstring.generate(5),
                User: i.User,
                FromName: i.FromName,
                LeadValue: i.LeadValue,
                AllowMultiple: i.AllowMultiple,
                ActionName: i.ActionName + randomstring.generate(5),
                Condition: i.Condition,
                Window: i.Window,
                Actions: i.Actions,
            });
            // console.log(i)
            const l = automationDataArray.length - 1
            await helper.pause(1);
            await automationPage.onPageVerify('automation');
            await automationPage.createCampaign(automationDataArray[l].Name);
            await automationPage.fillCampaignConfiguration(automationDataArray[l]);
            await automationPage.veiwOnGrid(' Campaigns ', automationDataArray[l].Name);
            await helper.clickBasedOntext(automationDataArray[l].Name, selectors.homePage.containsText);
            switch (automationDataArray[l].Actions) {
                default: console.log("!---INVALID EVENT---!"); break;
                case "SMS": await automationPage.addSMSEvent(automationDataArray[l].Actions, automationDataArray[l].ActionName);
                    break;
                case "Email": await automationPage.addEmailEvent(automationDataArray[l].Actions, automationDataArray[l].ActionName);
                    break;
            }
            await automationPage.publish(automationDataArray[l].Name);
        }

        //<---- store the value to use for further steps ----->
        this.automationDataArray = automationDataArray;
        // console.log(this.automationDataArray);
    }
    else {
        await helper.addlog('__!! INVALID FLOW !!__', 'fail')
    }
});


Then(/^Navigate to the automation tab and (.+) (.+) for the below data$/, async function (action, flow, details) {
    let data1 = details.hashes();
    let automationDataArray = []
    if (action == 'remove') {
        let temp
        for (const i of data1) {
            automationDataArray.push({
                Index: i.Index
            });
            const l = automationDataArray.length - 1
            for (const j in this.automationDataArray) {
                temp = automationDataArray.map(item => item.Index === this.automationDataArray[j].Index ? this.automationDataArray[j].ActionName : undefined)[0]
            }
            console.log(temp)
            await automationPage.removeTemplate(temp);
        }

    }
    else if (action == 'delete') {
        let temp1
        for (const i of data1) {
            automationDataArray.push({
                Index: i.Index
            });
            const l = automationDataArray.length - 1
            for (const j in this.automationDataArray) {
                temp1 = automationDataArray.map(item => item.Index === this.automationDataArray[j].Index ? this.automationDataArray[j].Name : undefined)[0]
            }
            console.log(temp1)
            await helper.clickBasedOntext(' Campaigns ', selectors.homePage.containsText);
            await automationPage.deleteCampaign(temp1);
        }
    }

});
