describe("Home page navigation", () => {
  beforeEach(() => {
    cy.clearLocalStorage();
  });

  it("navigates to customer and admin pages", () => {
    cy.visit("/");

    cy.contains("a", "Customer Login").click();
    cy.url().should("include", "/customer/login");

    cy.visit("/");
    cy.contains("a", "Admin Login").click();
    cy.url().should("include", "/admin/login");
  });

  it("toggles theme using header button", () => {
    cy.visit("/");

    cy.get('button[aria-label="Switch to dark mode"]').click();
    cy.get("html").should("have.class", "dark");

    cy.get('button[aria-label="Switch to light mode"]').click();
    cy.get("html").should("not.have.class", "dark");
  });
});
