import { $internal } from "typescript-logging";
import { helper } from "../utils/helper";
import { uploadDir } from "../utils/pathConstants";
import { selectors } from "../utils/Selectors";
import * as fs from 'fs';
import path from 'path';
//to fetch the data from json file
const data = require('../../src/utils/DataReader');

class Calendar {

    async onPageVerify(tab: string, text, page: string, table?: string) {
        await helper.clickBasedOntext(tab, selectors.homePage.tabselectors);
        await helper.addlog('Successfully on Tab', tab);
        await helper.clickBasedOntext(page, selectors.calendars.settingsTabs);
        await helper.pause(1)
        const selector = await helper.selectorBasedOntext(text, selectors.homePage.containsText);
        expect(await helper.ifElementDisplayed(selector)).toBe(true)
        await helper.addlog('Successfully on Page', page);
        if (table) {
            await helper.pause(1)
            await helper.clickBasedOntext(table, selectors.calendars.staffTabs);
            await helper.addlog('Successfully on tab', table);
        }

    }

    async createTeam(dataArray) {
        console.log("clicking new team button")
        await helper.click(selectors.calendars.newTeamBtn);
        await helper.pause(1)
        expect(await helper.ifElementDisplayed(selectors.calendars.newTeamText)).toBe(true)
        await helper.addlog('Successfully on page', 'Add New Team');
        await this.fillTeamInfo(dataArray);
        await this.fillCalendarTeamConfig(dataArray);
        await helper.pause(1);
        const a = $$(selectors.calendars.save)
        await a[1].click();
        await helper.addlog('Successfully created Team', dataArray.TeamName);

    }


    async fillTeamInfo(dataArray) {
        console.log("filling new team")
        await helper.click(selectors.calendars.teamInfo);
        expect(await helper.ifElementDisplayed('[for="team_name"]')).toBe(true)
        await helper.inputText(selectors.calendars.teamName, dataArray.TeamName);
        const teamMembers = dataArray.TeamMembers.split(', ')
        for (let i in teamMembers) {
            const members = await helper.selectorBasedOntext(teamMembers[i], selectors.calendars.teamMembers)
            const checkbox = await helper.isChecked(members)
            if (!checkbox) {
                await helper.click(members)
            }
        }
        const applyTeamtoggle = await helper.isToggled(selectors.calendars.applyTeamselectToggle)

        if ((applyTeamtoggle == false) && dataArray.ApplyTeamtoExisting == true) {
            await helper.scrollToElement(selectors.calendars.applyTeamselectToggle)
            await helper.click(selectors.calendars.applyTeamselectToggle)
        }
        else {
            console.log('Already Checked- Apply Team Toggle')
        }

    }

    async fillCalendarTeamConfig(data) {
        console.log("filling fillCalendarTeamConfig")
        await helper.click(selectors.calendars.calendarTeamConfig);
        expect(await helper.ifElementDisplayed('[for="provider_name"]')).toBe(true)
        await helper.inputText(selectors.calendars.name, data.CalendarName);
        await helper.inputText(selectors.calendars.desc, data.CalendarDesc);
        await helper.inputText(selectors.calendars.slugUrl, data.Slug);
        await helper.pause(1);
        const assignContact = await helper.isToggled(selectors.calendars.assignContactsToggl)
        // console.log(assignContact)
        await helper.scrollToElement(selectors.calendars.assignContactsToggl)
        await helper.click(selectors.calendars.assignContactsToggl)
        // expect(await helper.ifElementDisplayed(selectors.calendars.slugTick)).toBe(true);
    }


    async veiwOnGrid(tabName: string, data) {
        const a = `//*[contains(text(),\' ${data} \')]`;
        await helper.scrollToElement(a);
        // console.log(data)
        await helper.pause(1)
        expect(await helper.ifElementDisplayed(a)).toBe(true);
        helper.addlog("Successfully viewed on", "teams grid")
    }


    async editTeam(value: string, data) {
        const a = `//*[contains(text(),\' ${data} \')]`;
        await helper.scrollToElement(a);
        // console.log(data)
        await helper.pause(1)
        const selector = await helper.clickBasedOntext(data, selectors.calendars.edit)
        await helper.inputText(selectors.calendars.desc, 'newDescription')
        const b = $$(selectors.calendars.save)
        await b[1].click();
        await helper.addlog("Successfully edited calendar description as", 'newDescription')
    }

    async deleteTeam(data) {
        const a = `//*[contains(text(),\' ${data} \')]`;
        await helper.scrollToElement(a);
        console.log(data)
        await helper.pause(1)
        await helper.clickBasedOntextandEnter(data, selectors.calendars.delete)
        // console.log('enter keys')
        // console.log(await helper.ifElementDisplayed(a))
        // expect (await helper.ifElementDisplayed(a)).toBe(true)
        await helper.addlog("Successfully deleted", data)
    }



    async createEmployee(dataArray) {
        console.log("clicking add employee button")
        await helper.click(selectors.calendars.addemployee);
        await helper.pause(1)
        expect(await helper.ifElementDisplayed(selectors.calendars.newEmployeeText)).toBe(true)
        await helper.addlog('Successfully on page', 'Add New employee');
        await this.fillUserInfo(dataArray);
        await helper.pause(1);
        const a = $$(selectors.calendars.save)
        await a[1].scrollIntoView
        await a[1].click();
        await helper.addlog('Successfully created Team', dataArray.FirstName + ' ' + dataArray.LastName);

    }

    async fillUserInfo(dataArray) {
        console.log("filling user info")
        if ((await helper.ifElementDisplayed('//*[text()=\'Personal Logo\']')) == false) {
            await helper.click(selectors.calendars.userinfo);
        }
        expect(await helper.ifElementDisplayed('//*[text()=\'Personal Logo\']')).toBe(true)
        await $(selectors.calendars.firstName).clearValue();
        await helper.pause(1)
        await helper.inputText(selectors.calendars.firstName, dataArray.FirstName);
        // await helper.enterKeys();
        await helper.pause(1)
        await helper.inputText(selectors.calendars.lastName, dataArray.LastName);
        await helper.inputText(selectors.calendars.password, dataArray.Password);
        await helper.inputText(selectors.calendars.emailId, dataArray.Email);
        if ((await helper.isChecked(selectors.calendars.enableSignature) == false) && dataArray.EnableSignature == 'true') {
            await helper.click(selectors.calendars.enableSignature)
        } else {
            console.log("Already enable signature checked")
        }
        if ((await helper.isChecked(selectors.calendars.includeSignature) == false) && dataArray.IncludeSignature == 'true') {
            await helper.click(selectors.calendars.includeSignature)
        } else {
            console.log("Already inlcude signature checked")
        }
    }

    async editEmployee(data) {
        await helper.pause(1);
        const s = await helper.selectorBasedOntext(data, selectors.calendars.editEmployee)
        // console.log(s)
        await $(s).waitForClickable(1000)
        await helper.click(s)
        if ((await helper.ifElementDisplayed('//*[text()=\'Personal Logo\']')) == false) {
            await helper.click(selectors.calendars.userinfo);
        }
        expect(await helper.ifElementDisplayed('//*[text()=\'Personal Logo\']')).toBe(true)
        await helper.waitForDisplayed(selectors.calendars.enableSignature)
        await helper.click(selectors.calendars.enableSignature)
        const b = $$(selectors.calendars.save)
        await b[1].click();
        await helper.addlog("Successfully edited team", 'info')
    }

    async deleteEmployee(data) {
        const a = `//*[contains(text(),\'${data}\')]`;
        // await helper.scrollToElement(a);
        await helper.pause(1);
        const s1 = await helper.selectorBasedOntext(data, selectors.calendars.deleteoption)
        await helper.waitForDisplayed(s1);
        await $(s1).waitForClickable(1000)
        await helper.click(s1)
        const s2 = await helper.selectorBasedOntext(data, selectors.calendars.deleteEmployee)
        await $(s2).waitForClickable(1000)
        await helper.click(s2)
        await helper.pause(2)
       if( await helper.ifElementDisplayed(selectors.calendars.consent)){
        await helper.waitForDisplayed(selectors.calendars.consentText)
        // await $(selectors.calendars.consentText).clearValue();
        // await helper.pause(1)
        await helper.inputText(selectors.calendars.consentText, 'Delete');
        await helper.pause(2)
        await helper.click(selectors.calendars.confirmDelete)
        await helper.pause(1)
        await browser.refresh();
        await helper.pause(3);
        // console.log(await helper.ifElementDisplayed(a))
        expect(await helper.ifElementDisplayed(a)).toBe(false)
        await helper.addlog("Successfully deleted", data)
       }
        else{
            console.log('UNABLE TO DELETE')
        }
        
    }

    async createSchedule(dataArray, temp, teamName){
        await helper.pause(1);
        await helper.clickBasedOntext(temp,selectors.calendars.newCalendar);
        // await this.setPriority(dataArray.Priority);
        await helper.pause(1)
        await helper.inputText(selectors.calendars.calenName, dataArray.ScheduleName);
        await helper.pause(1)
        await helper.inputText(selectors.calendars.calenDesc, dataArray.Desc);
        await helper.pause(1)
        await helper.inputText(selectors.calendars.calenslug, dataArray.urlSlug);
        await helper.pause(1);
        await helper.click('[title="Blueberry"]');
        await helper.pause(2);
        await helper.click(selectors.calendars.saveAndContinue);
        await helper.pause(3);
        expect(await helper.ifElementDisplayed(selectors.calendars.availabilityText)).toBe(true);
        await helper.inputText(selectors.calendars.bufferDuration, '1');
        // await helper.inputText(selectors.calendars.appointmentPerDay, '1');
        // await helper.inputText(selectors.calendars.minSchedule, '1');
        await helper.waitForDisplayed(selectors.calendars.completeBtn);
        await helper.click(selectors.calendars.saveAndContinue);
        await helper.pause(3);
        expect(await helper.ifElementDisplayed(selectors.calendars.additionalOptText)).toBe(true);
        await helper.waitForDisplayed(selectors.calendars.completeBtn);
        await helper.click(selectors.calendars.completeBtn);
        await helper.pause(2);
        await helper.addlog("Successfully created schedule", dataArray.ScheduleName)
        await helper.pause(1);
    }

    async scheduleDateTime(date, time){
        await helper.pause(1);
        await helper.clickBasedOntext(date, selectors.calendars.date);
        await helper.pause(1)
        await helper.clickBasedOntext(time, selectors.calendars.time);
        await helper.pause(1)
    }

    async setPriority(value){
        await helper.pause(1)
        const a = await helper.selectorBasedOntext(value, selectors.calendars.priority);
        await $(a).selectByVisibleText('1');

    }

    async fillScheduleInfo(data){
        await helper.pause(1)
        await helper.inputText(selectors.calendars.patientFirstName, data.FirstName);
        await helper.pause(1)
        await helper.inputText(selectors.calendars.patientLastName, data.LastName);
        await helper.pause(1)
        await helper.inputText(selectors.calendars.patientMail, data.Email);
        await helper.pause(1)
        await helper.inputText(selectors.calendars.patientPhone, data.Phone);
        await helper.pause(1)
        await helper.click(selectors.calendars.scheduleMeeting);
        await helper.pause(2)
        expect(await helper.ifElementDisplayed(selectors.calendars.bookingInfo)).toBe(true);
        expect(await helper.ifElementDisplayed(selectors.calendars.scheduleConfirmMesg)).toBe(true);
        await helper.pause(1)
    }
}


const calendarPage = new Calendar();
export { calendarPage }