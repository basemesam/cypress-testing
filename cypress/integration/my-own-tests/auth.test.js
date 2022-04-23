/// <reference types="cypress" />

const token = "your token";

describe("test auth", () => {
  before(() => {
    cy.then(() => {
      window.localStorage.setItem("__auth__token", token);
    });
  });
  beforeEach(() => {
    cy.viewport(1280, 720);
    cy.visit("https://codedamn.com");
  });

  it("should auth pass", () => {
    cy.visit("https://codedamn.com/playgrounds");
    cy.get("[data-testid=playground-html]").click();
    cy.get("[data-testid= create-snippet-btn]").click();

    cy.contains("Restoring files and access", { timeout: 7 * 1000 }).should(
      "exist"
    );
    cy.contains("Restoring files and access", { timeout: 7 * 1000 }).should(
      "not.exist"
    );

    cy.wait(7000);
    cy.get("[data-testid=xterm] .xterm-helper-textarea")
      .type("{ctrl}{c}", { force: true })
      .type("touch newFile.js{enter}");

    cy.contains("newFile.js").should("exist").rightclick();
    cy.contains("Rename File").click();
  });
});
