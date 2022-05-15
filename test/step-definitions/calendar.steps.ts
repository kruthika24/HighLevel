import { Given, When, Then } from '@wdio/cucumber-framework';
import { Logger, LoggerConfig } from "log4ts";
import { helper } from '../../src/utils/Helper';
import { selectors } from '../../src/utils/Selectors';
import { loginPage } from '../../src/pages/login.page';
import { automationPage } from '../../src/pages/automation.page';
import { calendarPage } from '../../src/pages/calendar.page';
import _ from 'lodash';

var randomstring = require("randomstring");
import { $internal } from 'typescript-logging';
import { appbaseURL } from '../../config/wdio.conf';
const logger = Logger.getLogger();
const path = require('path');
//to fetch the data from json file
const data = require('../../src/utils/DataReader');

Then(/^Navigate to the calendar tab and (.+) (.+) for the below$/, { wrapperOptions: { retry: 2 } }, async function (action, flow, details) {
    let data1 = details.hashes();
    let dataTeamArray = [];

    for (const i of data1) {
        const r = randomstring.generate(4)
        dataTeamArray.push({
            Index: i.Index,
            TeamName: i.TeamName + r,
            TeamMembers: i.TeamMembers,
            CalendarName: i.CalendarName + r,
            CalendarDesc: i.CalendarDesc + r,
            Slug: i.Slug + r,
            ApplyTeamtoExisting: i.ApplyTeamtoExisting,
            AssignContacts: i.AssignContacts,
            SkipContacts: i.SkipContacts,
        });
        // console.log(i)
        const l = dataTeamArray.length - 1
        if (flow == 'my-staff') {
            await calendarPage.onPageVerify('settings', ' My Staff ', flow, 'teams');
            // await helper.pause(1);
            await calendarPage.createTeam(dataTeamArray[l]);
            await calendarPage.veiwOnGrid('teams', dataTeamArray[l].TeamName);
            if (action.includes('/edit/delete')) {
                await calendarPage.editTeam('teams', dataTeamArray[l].TeamName);
                await calendarPage.deleteTeam(dataTeamArray[l].TeamName);
            }

        }
        else {
            await helper.addlog('__!! INVALID FLOW !!__', 'fail')
        }

        //<---- store the below values to use for further steps ----->
        this.dataTeamArray = dataTeamArray;
        // console.log(this.dataArray);
    }
});


Then(/^Navigate to the calendar-team Management tab and create-view (.+) for the below$/, { wrapperOptions: { retry: 2 } }, async function (flow, details) {
    let data1 = details.hashes();
    let dataTeamMgmtArray = [];

    for (const i of data1) {
        const a = randomstring.generate(5)
        dataTeamMgmtArray.push({
            Index: i.Index,
            FirstName: i.FirstName,
            LastName: a,
            Email: a + '@abc.com',
            Password: i.Password,
            EnableSignature: i.EnableSignature,
            IncludeSignature: i.IncludeSignature,
        });
        // console.log(i)
        const l = dataTeamMgmtArray.length - 1
        if (flow == 'my-staff') {
            await calendarPage.onPageVerify('settings', ' My Staff ', flow, 'team-management');
            await calendarPage.createEmployee(dataTeamMgmtArray[l]);
            await helper.clickBasedOntext('team-management', selectors.calendars.staffTabs);
            await helper.pause(1);
            const a = `//*[text()=\'${dataTeamMgmtArray[l].FirstName + " " + dataTeamMgmtArray[l].LastName}\']`;
            // console.log(a)
            await helper.scrollToElement(a);
            await helper.pause(1)
            expect(await helper.ifElementDisplayed(a)).toBe(true);
        }
        else {
            await helper.addlog('__!! INVALID FLOW !!__', 'fail')
        }

        //<---- declare global to use for further steps ----->
        this.dataTeamMgmtArray = dataTeamMgmtArray;
        // console.log(this.dataArray);
    }
});

Then(/^Navigate to the calendar-team Management tab and (.+) (.+) for below$/, async function (action, flow, details) {
    let data1 = details.hashes();
    let dataArray = []
    if (action == 'edit') {
        let temp
        for (const i of data1) {
            dataArray.push({
                Index: i.Index
            });
            const l = dataArray.length - 1
            for (const j in this.dataTeamMgmtArray) {
                temp = dataArray.map(item => item.Index === this.dataTeamMgmtArray[j].Index ? this.dataTeamMgmtArray[j].FirstName + ' ' + this.dataTeamMgmtArray[j].LastName : undefined)[0]
            }
            console.log(temp)
            await calendarPage.editEmployee(temp);
        }

    }
    else if (action == 'delete') {
        let temp1
        for (const i of data1) {
            dataArray.push({
                Index: i.Index
            });
            const l = dataArray.length - 1
            for (const j in this.dataTeamMgmtArray) {
                temp1 = dataArray.map(item => item.Index === this.dataTeamMgmtArray[j].Index ? this.dataTeamMgmtArray[j].FirstName + ' ' + this.dataTeamMgmtArray[j].LastName : undefined)[0]
            }
            // console.log(temp1)
            await calendarPage.deleteEmployee(temp1);
        }
    }

});


Then(/^Navigate to the calendar page and schedule for the below$/, async function (details) {

    let data1 = details.hashes();
    let calendarArray = [];

    for (const i of data1) {
        const a = randomstring.generate(4)
        calendarArray.push({
            Index: i.Index,
            ScheduleName: i.ScheduleName + a,
            Desc: i.Desc + a,
            urlSlug: i.urlSlug + a,
            CustomCode: i.CustomCode + a,
            Priority :i.Priority,
            TeamIndex: i.TeamIndex,
            Date: i.Date,
            Time: i.Time,
            FirstName: i.FirstName,
            LastName: i.LastName + a,
            Email: a + i.Email,
            Phone: i.Phone
        });
        let temp, teamName, slug
        for (const j in this.dataTeamArray) {
            temp = calendarArray.map(item => item.TeamIndex === this.dataTeamArray[j].Index ? this.dataTeamArray[j].CalendarName : undefined)[0]
            teamName = calendarArray.map(item => item.TeamIndex === this.dataTeamArray[j].Index ? this.dataTeamArray[j].TeamName : undefined)[0]
            slug = calendarArray.map(item => item.TeamIndex === this.dataTeamArray[j].Index ? this.dataTeamArray[j].Slug : undefined)[0]
        }
        // console.log(i)
        const l = calendarArray.length - 1
        const url = (`/${slug}/${calendarArray[l].urlSlug}`).toLowerCase()
        const b = `//*[text()=\' ${calendarArray[l].ScheduleName}\']/following-sibling::div/*[text()='\ ${url} '\]`
        const link = `https://link.gohighlevel.com/widget/appointment${url}`
        await helper.clickBasedOntext('settings', selectors.homePage.tabselectors);
        await helper.pause(1)
        await helper.clickBasedOntext('calendar', selectors.calendars.settingsTabs);
        await helper.pause(1)
        const selector = `//*[text()='\ ${temp}'\]`
        expect(await helper.ifElementDisplayed(selector)).toBe(true)
        await calendarPage.createSchedule(calendarArray[l], temp, teamName);
        await helper.pause(1)
        await helper.scrollToElementAndClick(b)
        await helper.switchWindow(link);
        await helper.addlog('Successfully on window', url)
        await calendarPage.scheduleDateTime(calendarArray[l].Date, calendarArray[l].Time);
        await helper.pause(1)
        await helper.click(selectors.calendars.continue);
        await calendarPage.fillScheduleInfo(calendarArray[l]);
        await helper.switchWindow(appbaseURL);
        await helper.addlog('Successfully added the Patient schedule', calendarArray[l].LastName)
    }

    this.calendarArray = calendarArray;
    console.log(this.calendarArray)
});