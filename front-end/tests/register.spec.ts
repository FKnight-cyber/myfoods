import { test, expect } from '@playwright/test';
import __userFactory from '../cypress/factories/userFactory';

const baseUrl = "http://localhost:5000";

test('Successfull register tests', async ({ page }) => {
  const user = __userFactory();

  const request_register = `${baseUrl}/sign-up`

  const request = page.waitForResponse(promise => promise.url() === request_register);

  await page.goto('http://localhost:3000/');
  await page.getByRole('link', { name: 'Clique aqui e faça seu' }).click();
  await page.getByPlaceholder('Nome').click();
  await page.getByPlaceholder('Nome').fill(user.name);
  await page.getByPlaceholder('Valid CEP, Example:').click();
  await page.getByPlaceholder('Valid CEP, Example:').fill(user.cep);
  await page.getByPlaceholder('Número da casa').click();
  await page.getByPlaceholder('Número da casa').fill(user.houseNumber.toString());
  await page.getByPlaceholder('E-mail').click();
  await page.getByPlaceholder('E-mail').fill(user.email);
  await page.getByPlaceholder('Senha').click();
  await page.getByPlaceholder('Senha').fill(user.password);
  await page.getByRole('button', { name: 'Register' }).click();

  const response = await request;

  await expect(page.getByRole('button', { name: 'Login' })).toBeVisible();
  expect(page.url()).toEqual('http://localhost:3000/');

  await page.goto('https://platreparacao-dev.azurewebsites.net/#/gestao-reparacao/planos');
  await page.goto('https://platreparacao-dev.azurewebsites.net/#/login');
  await page.getByRole('button', { name: '' }).click();
});