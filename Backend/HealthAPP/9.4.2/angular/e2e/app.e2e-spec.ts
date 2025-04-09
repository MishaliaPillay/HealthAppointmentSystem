import { HealthAPPTemplatePage } from './app.po';

describe('HealthAPP App', function() {
  let page: HealthAPPTemplatePage;

  beforeEach(() => {
    page = new HealthAPPTemplatePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
