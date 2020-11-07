import { AppPage } from './app.po';
import { browser, logging } from 'protractor';

describe('synonimizator', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display page', () => {
    page.navigateTo();
    expect(page.getTitleText()).toEqual('Synonimizator online');
  });

  it('should show random title', async () => {
    page.setInputTitle('Tytuł 1\nTytuł 2\nTytuł 3');
    const value = await page.getInputTitle()
    expect(
      ['Tytuł 1','Tytuł 2','Tytuł 3'].includes(value)
    ).toBe(true);
  });

  it('should show random keywords', () => {
    const keywords = ['Słowo 3', 'Słowo 2', 'Słowo 1'];
    page.setInputKeywords(keywords.join(','));
    expect(page.getInputKeywords()).toEqual(keywords.sort());
  });

  it('should show random description', async() => {
    page.setInputDesription('Ala ma {kota|kotka|zwierzątko}');
    const value = await page.getInputDescription()
    expect(
      ['Ala ma kota','Ala ma kotka','Ala ma zwierzątko'].includes(value)
    ).toBe(true);
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});
