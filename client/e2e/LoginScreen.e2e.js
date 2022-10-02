
import {reloadApp} from 'detox-expo-helpers'

describe('Login Screen', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  beforeEach(async () => {
    await reloadApp()
  });

  it('"Login" screen should be visible', async () => {
    await expect(element(by.id('Login'))).toBeVisible();
  });

  it('"Log In" button should be visible', async () => {
    await expect(element(by.id('log-in-button'))).toBeVisible();
  });
  it('"Register" button should be visible', async () => {
    await expect(element(by.id('register-button'))).toBeVisible();
  });

  it('shows "Home Screen" after tapping "Log In"', async () => {
    await element(by.id('log-in-button')).tap();
    await expect(element(by.id('Home'))).toBeVisible();
  });
});