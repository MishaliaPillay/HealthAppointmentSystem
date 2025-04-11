import { healthapTemplatePage } from './app.po';

describe('healthap App', function() {
  let page: healthapTemplatePage;

  beforeEach(() => {
    page = new healthapTemplatePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
