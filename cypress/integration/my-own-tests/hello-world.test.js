/// <reference types="cypress" />

describe("Basic Desktop Test", () => {
  beforeEach(() => {
    cy.viewport(1280, 720);
    cy.visit("https://codedamn.com");
  });

  it("login page render well", () => {
    cy.contains("Sign in").click();
    cy.contains("Sign in to codedamn").should("exist");
  });

  it("login page links works well", () => {
    cy.contains("Sign in").click();

    cy.contains("Forgot your password?").click({ force: true });
    cy.url().should("include", "/password-reset");

    cy.url().then((value) => cy.log("the new URL:" + value));
    cy.go("back");

    cy.contains("Register").should("exist");
    cy.contains("Register").click();
    cy.url().should("include", "/register");
  });

  it("login should display correct error ", () => {
    cy.get("[data-testid=username]").type("admin@gmail.com", { force: true });
    cy.get("[data-testid=password]").type("admin", { force: true });

    cy.get("[data-testid=login]").click({ force: true });

    cy.contains("Unable to authorize").should("exist");
  });

  it.only("should login correctly ", () => {
    cy.contains("Sign in").click();

    cy.get("[data-testid=username]").type("BassemEssam", {
      force: true,
    });
    cy.get("[data-testid=password]").type("C1(^UaIvx_", { force: true });

    cy.get("[data-testid=login]").click({ force: true });

    cy.url().should("include", "/dashboard");
  });
});
