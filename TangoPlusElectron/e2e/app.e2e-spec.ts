import { TangoPlusElectronPage } from './app.po';

describe('tango-plus-electron App', () => {
  let page: TangoPlusElectronPage;

  beforeEach(() => {
    page = new TangoPlusElectronPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
