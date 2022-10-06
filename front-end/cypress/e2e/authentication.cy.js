import __userFactory from "../factories/userFactory";

const URL = "http://localhost:3000";
const server = "http://localhost:5000";

beforeEach(() => {
    cy.resetDatabase();
})

describe("Authentication", () => {
    it("should successfully register an user and than sign-in", () => {
        const user = __userFactory();

        cy.visit(`${URL}/`);

        cy.get('[data-cy="cy-register"]').click();

        cy.url().should('eq', `${URL}/sign-up`);

        cy.get('[data-cy="cy-name"]').type(user.name);
        cy.get('[data-cy="cy-cep"]').type(user.cep);
        cy.get('[data-cy="cy-house-number"]').type(user.houseNumber);
        cy.get('[data-cy="cy-email"]').type(user.email);
        cy.get('[data-cy="cy-pass"]').type(user.password);

        cy.intercept("POST", `${server}/sign-up`).as("sign-up");

        cy.get('[data-cy="cy-submit-register"]').click();

        cy.wait("@sign-up").then((interception) => {
            expect(interception.response.statusCode).eq(201);

            cy.url().should('eq', `${URL}/`);

            cy.get('[data-cy="login-email"]').type(user.email);
            cy.get('[data-cy="login-pass"]').type(user.password);

            cy.intercept("POST", `${server}/sign-in`).as("sign-in");

            cy.get('[data-cy="submit-login"]').click();

            cy.wait("@sign-in").then(interception => {
                expect(interception.response.statusCode).eq(200);
                expect(typeof(interception.response.body)).to.eq('string');
                cy.url().should('eq', `${URL}/initialpage`);
            });
        });
    });

    it("should fail to register duplicated email", () => {
        Cypress.on('uncaught:exception', (err, runnable) => {
            return false
        });

        const user = __userFactory();

        cy.visit(`${URL}/`);

        cy.get('[data-cy="cy-register"]').click();

        cy.url().should('eq', `${URL}/sign-up`);

        cy.get('[data-cy="cy-name"]').type(user.name);
        cy.get('[data-cy="cy-cep"]').type(user.cep);
        cy.get('[data-cy="cy-house-number"]').type(user.houseNumber);
        cy.get('[data-cy="cy-email"]').type(user.email);
        cy.get('[data-cy="cy-pass"]').type(user.password);
        cy.get('[data-cy="cy-submit-register"]').click();

        cy.get('[data-cy="cy-register"]').click();

        cy.get('[data-cy="cy-name"]').type(user.name);
        cy.get('[data-cy="cy-cep"]').type(user.cep);
        cy.get('[data-cy="cy-house-number"]').type(user.houseNumber);
        cy.get('[data-cy="cy-email"]').type(user.email);
        cy.get('[data-cy="cy-pass"]').type(user.password);

        cy.intercept("POST", `${server}/sign-up`).as("sign-up");

        cy.get('[data-cy="cy-submit-register"]').click();

        cy.wait("@sign-up").then((interception) => {
            expect(interception.response.statusCode).eq(409);
        });
    });

    it("should fail to register user with cep out of delivery range", () => {
        Cypress.on('uncaught:exception', (err, runnable) => {
            return false
        });

        const user = __userFactory();

        cy.visit(`${URL}/`);

        cy.get('[data-cy="cy-register"]').click();

        cy.get('[data-cy="cy-name"]').type(user.name);
        cy.get('[data-cy="cy-cep"]').type("60540096");
        cy.get('[data-cy="cy-house-number"]').type(user.houseNumber);
        cy.get('[data-cy="cy-email"]').type(user.email);
        cy.get('[data-cy="cy-pass"]').type(user.password);

        cy.intercept("POST", `${server}/sign-up`).as("sign-up");

        cy.get('[data-cy="cy-submit-register"]').click();

        cy.wait("@sign-up").then((interception) => {
            expect(interception.response.statusCode).eq(403);
        });
    });
});