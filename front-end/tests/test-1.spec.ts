import { test, expect } from '@playwright/test';
import __userFactory from '../cypress/factories/userFactory';

const baseUrl = 'http://localhost:5000';

test('Successfull user register', async ({ page }) => {
  const user = __userFactory();

  page.goto('http://localhost:3000/');
  const register_endpoint = `${baseUrl}/sign-up`;
  const login_endpoint = `${baseUrl}/sign-in`;

  const registerPromise = page.waitForResponse(response => response.url() === register_endpoint);
  const loginPromise = page.waitForResponse(response => response.url() === login_endpoint);

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

  const response = await registerPromise;

  await expect(page.getByRole('button', { name: 'Login' })).toBeVisible();
  expect(response.status()).toEqual(201);

  await page.getByPlaceholder('E-mail').click();
  await page.getByPlaceholder('E-mail').fill(user.email);
  await page.getByPlaceholder('Senha').click();
  await page.getByPlaceholder('Senha').fill(user.password);
  await page.getByRole('button', { name: 'Login' }).click();

  const response2 = await loginPromise;

  const responseBody = await response2.text();

  // Check if the token is a non-empty string
  expect(responseBody).toBeDefined();
  expect(responseBody).not.toBe('');
  expect(page.url()).toBe('http://localhost:3000/initialpage');


  await page.goto('http://localhost:3000/');
  await page.getByRole('link', { name: 'Clique aqui e faça seu' }).click();

  await page.getByPlaceholder('Nome').click();
  await page.getByPlaceholder('Nome').fill('Ryan');
  await page.getByPlaceholder('Valid CEP, Example:').click();
  await page.getByPlaceholder('Valid CEP, Example:').fill('60720096');
  await page.getByPlaceholder('Número da casa').click();
  await page.getByPlaceholder('Número da casa').fill('1452');
  await page.getByPlaceholder('E-mail').click();
  await page.getByPlaceholder('E-mail').fill('ryan@gmail.com');
  await page.getByPlaceholder('Senha').click();
  await page.getByPlaceholder('Senha').fill('1234');
  await page.getByPlaceholder('E-mail').click();
  await page.getByPlaceholder('E-mail').click();
  await page.getByPlaceholder('E-mail').fill('ryan10@gmail.com');
  await page.getByRole('button', { name: 'Register' }).click();
  await expect(page.getByRole('button', { name: 'Login' })).toBeVisible();
  await page.getByPlaceholder('E-mail').click();
  await page.getByPlaceholder('E-mail').fill('ryan@gmail.com');
  await page.getByPlaceholder('Senha').click();
  await page.getByPlaceholder('E-mail').click();
  await page.getByPlaceholder('E-mail').press('ArrowLeft');
  await page.getByPlaceholder('E-mail').press('ArrowLeft');
  await page.getByPlaceholder('E-mail').press('ArrowLeft');
  await page.getByPlaceholder('E-mail').press('ArrowLeft');
  await page.getByPlaceholder('E-mail').press('ArrowLeft');
  await page.getByPlaceholder('E-mail').press('ArrowLeft');
  await page.getByPlaceholder('E-mail').press('ArrowLeft');
  await page.getByPlaceholder('E-mail').press('ArrowLeft');
  await page.getByPlaceholder('E-mail').press('ArrowRight');
  await page.getByPlaceholder('E-mail').fill('ryan10@gmail.com');
  await page.getByPlaceholder('Senha').click();
  await page.getByPlaceholder('Senha').fill('1234');
  await page.getByRole('button', { name: 'Login' }).click();
});




`
 const [getAllAssistants, getAllCounties, getAllProjects, getAllMeetings] = await Promise.all([
    responsePromise,
    responsePromise2,
    responsePromise3,
    responsePromise4,
  ]);
`