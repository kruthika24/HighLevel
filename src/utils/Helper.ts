const path = require('path');
import * as fs from 'fs';
import { isReturnStatement } from 'typescript';
import { selectors } from './Selectors';
import report from '@wdio/allure-reporter';
import { WebdriverIO } from '@wdio/types/build/Options';

class Helper {

    openURL(url) {
        console.log(`Inside URL : ${url}`);
        browser.url(`${url}`);
        // browser.maximizeWindow();
    }

    async closebrowser() {
        await browser.closeWindow()
    }

    getTitle() {
        helper.pause(2);
        return browser.getTitle();
    }
    async pause(time) {
        await browser.pause(time * 1000);
    }

    async click(selector) {
        const elem = await $(selector);
        await elem.waitForDisplayed();
        await elem.click();
    }
    async clicks(element: WebdriverIO.Element) {

    }

    async inputText(selector, text) {
        const elem = await $(selector);
        await elem.waitForDisplayed();
        await elem.clearValue();
        await elem.setValue(text);
    }

    async waitForDisplayed(selector, timeout?, reverse?) {
        await browser.pause(1500);
        const elem = await $(selector);
        await elem.waitForDisplayed({
            timeout: timeout ? timeout * 1000 : 4000,
            reverse: reverse || false,
        });
    }

    async waitForDisplayedandClick(selector, timeout?, reverse?) {
        await browser.pause(1500);
        const elem = await $(selector);
        await elem.waitForDisplayed({
            timeout: timeout ? timeout * 1000 : 4000,
            reverse: reverse || false,
        });
        await this.click(selector)
    }

    async waitforVisible(elem) {
        elem = $('#elem');
        elem.waitForVisible(3000)
    }

    async waitForPresent(selector, timeout?, reverse?) {
        await browser.pause(1500);
        const elem = await $(selector);
        await elem.waitForExist({
            timeout: timeout ? timeout * 1000 : 4000,
            reverse: reverse || false,
        });
    }

    async refresh() {
        await browser.refresh();
    }
    async ifElementExisting(selector) {
        const elem = $(selector)
        await elem.isExisting()
    }


    async ifElementDisplayed(selector) {
        const elem = $(selector)
        return elem.isDisplayed();
    }

    async waituntilPageloads(timeout) {
        await browser.setTimeout({ 'pageLoad': timeout })
    }

    async waitforClickable(selector, timeout?, reverse?) {
        const elem = $(selector);
        await elem.waitForClickable({
            timeout: timeout ? timeout * 1000 : 4000,
            reverse: reverse || false
        });
    }

    async selectorBasedOntext(objElement: string, label) {
        const xelement = await label.replace('obj', objElement);
        const elem = await $(xelement);
        // console.log(elem)
        await this.waitForDisplayed(elem.selector, 1000);
        return elem.selector;

    }

    async selectBasedOntext(selector1, label, objElement: string) {
        const xelement = await label.replace('obj', objElement);
        const elem = await $(xelement);
        await this.click(selector1);
        await this.waitForDisplayed(elem.selector, 1000);
        const element = `${elem.selector}`
        await this.click(element)

    }

    async clickBasedOntext(objElement: string, label) {
        const xelement = await label.replace('obj', objElement);
        const elem = await $(xelement);
        // console.log(elem.selector)
        await this.waitForDisplayed(elem.selector, 1000);
        await this.click(elem.selector);
    }


    async selectDropdown(elements, value) {
        for (let i = 0; i < (await elements).length; i++) {
            const elem = await elements[i].getAttribute('value');
            if (elem === value) {
                await elements[i].click()
                console.log(`Selected dropdown value: ${value}`)
                break;
            }
        }
    }


    async selectDropdownBasedText(element, value) {
        // console.log(element)
        await element.selectByVisibleText(value)
        // await elements[i].click()
        this.addlog(`Selected dropdown value`, value)
    }


    async waitforElementToAppear(selector, timeout) {
        await browser.waitUntil(
            async () => {
                let a = await $(selector)
                return await a.isDisplayed() === true
            },
            {
                timeout: timeout * 1000,
                timeoutMsg: 'Element Still not Present',
                interval: 500,
            },
        );
    }

    async selectByVisibleText(selector, text, timeout) {
        this.waitforElementToAppear(selector, 1000);
        const elem = await $(selector);
        await elem.selectByVisibleText(text);
    }


    async scrollToElement(selector) {
        await this.waitForDisplayed(selector);
        const elem = await $(selector)
        await elem.scrollIntoView();
    }

    async acceptAlert() {
        await browser.acceptAlert();
    }

    async mouseHover(element) {
        await browser.moveToElement(element, 0, 0);
    }

    async fileUpload(fileUploadselector, filePath) {
        // fileUploadselector.setValue(filePath);
        const submit = $('#file-sumbit')
        const remoteFilePath = browser.uploadFile(filePath);
        browser.url('/upload');
        fileUploadselector.setValue(remoteFilePath);
        submit.click();
        await helper.pause(2);
    }


    async parseJsonFile(datapath: string) {
        let data = fs.readFileSync(datapath, "utf-8");
        return JSON.parse(data)
    }

    async deleteDirectory(path: string) {
        if (fs.existsSync(path)) {
            fs.rmdirSync(path, { recursive: true })
            console.log(`Directory Deleted: ${path}`)
        }
    }

    async toContain(actual: string | string[], expected: string) {
        expect(actual).toContain(expected)
        console.log(`Assertion >> ${actual} to contain ${expected}`)
    }

    async screenshot() {
        await browser.takeScreenshot()
    }

    addlog(mesg: string, value: any) {
        console.log(mesg + " : " + value);
        report.addStep(mesg + " : " + value);
    }

}

const helper = new Helper();
export { helper };

