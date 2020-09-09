import { browser, by, element, Key } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get(browser.baseUrl) as Promise<any>;
  }

  getTitleText() {
    return element(by.css('app-root h1')).getText() as Promise<string>;
  }

  setInputTitle(value) {
    let input =  element(by.id('title_input'))
    input.sendKeys(value);
    input.sendKeys(Key.TAB);
  }

  getInputTitle() {
    return element(by.id('title_output')).getAttribute('value');
  }

  setInputKeywords(value) {
    let input = element(by.id('keywords_input'))
    input.sendKeys(value);
    input.sendKeys(Key.TAB);
  }

  async getInputKeywords() {
    let value = await element(by.id('keywords_output')).getAttribute('value')
    return value.split(',').map(Function.prototype.call, String.prototype.trim).sort();
  }

  setInputDesription(value) {
    browser.executeScript(`
      const button = document.getElementById('description_input_div');
      button.click();
    `);
    //element(by.id('description_input_div')).click();
    let input = element(by.id('description_input'))
    input.sendKeys(value);
    input.sendKeys(Key.TAB);
  }

  getInputDescription() {
    return element(by.id('description_output')).getAttribute('value')
  }
}
