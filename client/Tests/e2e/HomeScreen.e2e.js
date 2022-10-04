import {}

describe('Home Screen', () => {
  // beforeAll(async () => {
  //   await device.launchApp();
  // });

  beforeEach(async () => {
    await reloadApp()
  });

  it('"Home" screen should be visible', async () => {
    await expect(element(by.id('Home'))).toBeVisible();
  });

  it('"Hello Collector" title should be visible', async () => {
    await expect(element(by.id('hello-collector'))).toBeVisible();
  });
  it('"highlist" text should be visible', async () => {
    await expect(element(by.id('highlight-text'))).toBeVisible();
  });

  it(' "Home item" should be visible"', async () => {
    await element(by.id('home-item')).tap();
  });
});