import { $internal } from "typescript-logging";
import { helper } from "../utils/helper";
import { uploadDir } from "../utils/pathConstants";
import { selectors } from "../utils/Selectors";
import * as fs from 'fs';
import path from 'path';
//to fetch the data from json file
const data = require('../../src/utils/DataReader');

class Automation {
    async verifyTabs(items) {
        for (let i in items) {
            await helper.pause(2);
            await helper.clickBasedOntext(`${items[i]}`, selectors.homePage.tabselectors);
            await helper.addlog('Successfully verified to tab', `${items[i]}`)
        }

    }

    async onPageVerify(page: string) {
        await helper.clickBasedOntext(page, selectors.homePage.tabselectors);
        const value = page + 'Text'
        const text = data.getData(value);
        // console.log(text)
        const selector = await helper.selectorBasedOntext(text, selectors.homePage.containsText);
        expect(await helper.ifElementDisplayed(selector)).toBe(true)
        await helper.addlog('Successfully on Page', page);
    }


    async selectTemplate(value) {
        const elem = await helper.selectorBasedOntext(value, selectors.automationPage);
        // console.log(elem);
        await helper.click(elem)
    }


    async createCampaign(name) {
        await helper.clickBasedOntext(' Campaigns ', selectors.homePage.containsText);
        await helper.addlog('Campaign Tab ', 'navigated');

        await helper.clickBasedOntext(' Create Campaign ', selectors.homePage.containsText);

        await helper.inputText('//*[contains(text(),\'Campaign Name\')]/../following-sibling::div/input', name);

        await helper.click(selectors.automationPage.campaign.saveBtn);

    }

    async fillCampaignConfiguration(array) {

        await helper.clickBasedOntext(' Campaign Configuration ', selectors.homePage.containsText);
        if (array.Window == 'true') {
            await helper.click(selectors.automationPage.campaign.windowToggle);
            const label = await helper.selectorBasedOntext('Condition', selectors.common.labelText);
            expect(await helper.ifElementDisplayed(label)).toBe(true);
            await helper.addlog('On Conditions tab', 'success');
            await this.fillCampaignConfigWindow(array.Condition);
        } else {
            console.log('No Window Selected');
        }
        await helper.click(selectors.automationPage.campaign.adduser);
        await helper.waitForDisplayed(`(//*[text()=\'${array.User}\'])[2]`)
        await helper.click(`(//*[text()=\'${array.User}\'])[2]`)
        await helper.inputText(selectors.automationPage.campaign.fromName, array.FromName);
        await helper.inputText(selectors.automationPage.campaign.leadValue, array.LeadValue);
        await helper.scrollToElement(selectors.automationPage.campaign.saveBtn)
        await helper.click(selectors.automationPage.campaign.saveBtn);
        await helper.addlog('Added and saved the campaign config', 'successfully');
        await this.backBtn();
    }


    async veiwOnGrid(tabName: string, name) {
        const a = `//*[contains(text(),\'${tabName}\')]`;
        await helper.scrollToElement(a);
        await helper.click(a);
        // await helper.clickBasedOntext(` ${tabName} `, selectors.homePage.containsText);
        await helper.scrollToElement(`//*[contains(text(),\'${name}\')]`);
        const b = await helper.selectorBasedOntext(`${name}`, selectors.common.spaceText);
        expect(await helper.ifElementDisplayed(b)).toBe(true);
        helper.addlog("Successfully viewed on", "Campaign grid")
    }

    async addSMSEvent(event, name) {

        await helper.waitForDisplayed(selectors.automationPage.campaign.addEventBtn, 1000);
        await helper.click(selectors.automationPage.campaign.addEventBtn);
        await helper.waitForDisplayed(selectors.automationPage.campaign.addNewEventText, 1000);
        await helper.clickBasedOntext(event, selectors.common.istext);
        await helper.inputText(selectors.automationPage.campaign.smsName, name);
        await helper.click(selectors.automationPage.campaign.saveSms);
        await helper.pause(1)
        expect(await helper.ifElementDisplayed(`//*[text()=\'${name}\']`)).toBe(true);
        await helper.addlog('Successfully created event', event);

    }

    async addEmailEvent(event, name) {

        await helper.waitForDisplayed(selectors.automationPage.campaign.addEventBtn, 1000);
        await helper.click(selectors.automationPage.campaign.addEventBtn);
        await helper.waitForDisplayed(selectors.automationPage.campaign.addNewEventText, 1000);
        await helper.clickBasedOntext(event, selectors.common.istext);
        await helper.pause(1)
        await $(selectors.automationPage.campaign.emailSubject).clearValue();
        await helper.pause(1)
        await helper.inputText(selectors.automationPage.campaign.emailName, name);
        await helper.inputText(selectors.automationPage.campaign.emailSubject, "SubjectText");
        await helper.click(selectors.automationPage.campaign.savemail);
        expect(await helper.ifElementDisplayed(`//*[text()=\'${name}\']`)).toBe(true);
        await helper.addlog('Successfully created event', event);
    }

    async fillCampaignConfigWindow(condition) {

        const dropdown = await selectors.automationPage.campaign.conditionDropdown;
        const startime = await selectors.automationPage.campaign.startTime
        const endTime = await selectors.automationPage.campaign.endTime
        await helper.selectDropdownBasedText(dropdown, condition);
        await helper.selectDropdownBasedText(startime, data.getData("defaultStartTime"))
        await helper.selectDropdownBasedText(endTime, data.getData("defaultEndTime"))

    }

    async backBtn() {
        await helper.pause(1);
        await helper.waitForDisplayedandClick(selectors.automationPage.campaign.back);
    }

    async publish(name) {
        await helper.click(selectors.automationPage.campaign.draft);
        await helper.pause(1)
        // expect(await helper.ifElementDisplayed(`//*[contains(text(),\'${name}\')]`)).toBe(true)
        await helper.click(selectors.automationPage.campaign.published);
    }

    async removeTemplate(name) {
        const a = await helper.selectorBasedOntext(name, selectors.automationPage.campaign.removeTemplate)
        // await helper.scrollToElement(a);
        await helper.click(a);
        expect(await helper.ifElementDisplayed(`//*[contains(text(),\'${name}\')]`)).toBe(false)
        await helper.addlog('Removed temlate successfully', name);
    }

    async deleteCampaign(name) {

        const c = `//*[contains(text(),\'${name}\')]`;
        await helper.scrollToElement(c);
        const del1 = `//*[contains(text(),\'${name}\')]/parent::div[1]/following-sibling::div[2]/div[2]/button`
        const del2 = `//*[contains(text(),\'${name}\')]/parent::div[1]/following-sibling::div[2]/div[2]/div/a[contains(text(),\'Delete\')]`
        await helper.click(await del1)
        await helper.pause(1)
        await helper.click(del2)
        await helper.enterKeys();
        await helper.pause(2);
        await helper.addlog('Deleted Campaign successfully', name);
    }
}


const automationPage = new Automation();
export { automationPage }

