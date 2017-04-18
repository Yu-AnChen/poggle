import { PogglePage } from './app.po';

describe('poggle App', () => {
  let page: PogglePage;

  beforeEach(() => {
    page = new PogglePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
