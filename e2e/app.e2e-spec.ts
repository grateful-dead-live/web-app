import { GratefulDeadPage } from './app.po';

describe('Grateful Dead App', () => {
  let page: GratefulDeadPage;

  beforeEach(() => {
    page = new GratefulDeadPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
