import { HealthAppointmentSystemTemplatePage } from './app.po';

describe('HealthAppointmentSystem App', function() {
  let page: HealthAppointmentSystemTemplatePage;

  beforeEach(() => {
    page = new HealthAppointmentSystemTemplatePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
