import { test } from '@playwright/test';

test('e2e test', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.getByPlaceholder('input!').click();
  await page.getByPlaceholder('input!').fill('Lea');
  await page.getByText('Email:Sincere@april.biz').click();
  await page.getByText('BACK').click();
  await page.getByText('Chaim_McDermott@dana.io').click();
  await page.getByText('BACK').click();
  await page.getByText('Chelsey DietrichEmail:').click();
  await page.getByTestId('arrow-left-icon').click();
  await page.getByPlaceholder('input!').click();
  await page.getByPlaceholder('input!').fill('aaaa');
  await page.getByText('No users found matching you').click();
  await page.getByPlaceholder('input!').click();
  await page.getByPlaceholder('input!').fill('');
});
