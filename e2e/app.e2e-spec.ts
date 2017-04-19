import { CustomInputPage } from './app.po';

describe('custom-input App', () => {
  let page: CustomInputPage;

  beforeEach(() => {
    page = new CustomInputPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
