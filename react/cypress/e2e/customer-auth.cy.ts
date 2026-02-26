describe("Customer auth flow", () => {
  it("allows create account and login", () => {
    cy.visit("/customer/register");
    cy.get("#register-name").type("Test User");
    cy.get("#register-email").type("test-user@example.com");
    cy.get("#register-password").type("Test@123");
    cy.get("#register-confirm-password").type("Test@123");
    cy.contains("button", "Submit").click();
    cy.url().should("include", "/customer/home");
  });

  it("protects customer home route", () => {
    cy.visit("/customer/home");
    cy.url().should("include", "/customer/login");
  });
});

