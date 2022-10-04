import {reloadApp} from

describe('Exhibition Screen', () => {
  // beforeAll(async () => {
  //   await device.launchApp();
  // });

  beforeEach(async () => {
    await reloadApp()
  });

  it('"Exhibition" screen should be visible', async () => {
    await expect(element(by.id('Exhibition-Screen'))).toBeVisible();
  });


  it('"Exhibition" item should be visible', async () => {
    await expect(element(by.id('exhibition-item'))).toBeVisible();
  });

  it(' "Title" text should be visible"', async () => {
    await element(by.id('exhibition-time-title')).tap();
  });

  it(' "Date" text should be visible"', async () => {
    await element(by.id('exhibition-date')).tap();
  });

  it(' "Date" text should be visible"', async () => {
    await element(by.id('exhibition-venue')).tap();
  });
});