describe("Forgot password flow", () => {
  beforeEach(() => {
    cy.clearLocalStorage();
  });

  it("shows validation when confirmation does not match", () => {
    cy.visit("/customer/forgot-password", {
      onBeforeLoad(win) {
        win.localStorage.setItem(
          "sr-store-customers",
          JSON.stringify([{ name: "Test User", email: "test-user@example.com", password: "Old@123" }]),
        );
      },
    });

    cy.get("#forgot-email").type("test-user@example.com");
    cy.get("#new-password").type("New@123");
    cy.get("#confirm-new-password").type("Mismatch@123");
    cy.contains("button", "Submit").click();

    cy.contains("New password and confirm password must match.").should("be.visible");
  });

  it("resets password and allows login with the new password", () => {
    cy.visit("/customer/forgot-password", {
      onBeforeLoad(win) {
        win.localStorage.setItem(
          "sr-store-customers",
          JSON.stringify([{ name: "Test User", email: "test-user@example.com", password: "Old@123" }]),
        );
      },
    });

    cy.get("#forgot-email").type("test-user@example.com");
    cy.get("#new-password").type("New@123");
    cy.get("#confirm-new-password").type("New@123");
    cy.contains("button", "Submit").click();

    cy.contains("Password reset successful. You can log in now.").should("be.visible");

    cy.contains("a", "Back to Login").click();
    cy.get("#login-email").type("test-user@example.com");
    cy.get("#login-password").type("New@123");
    cy.contains("button", "Login").click();
    cy.url().should("include", "/customer/home");
  });
});
