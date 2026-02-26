describe("Customer home and product details", () => {
  beforeEach(() => {
    cy.clearLocalStorage();
  });

  it("allows authenticated customer to add item to cart", () => {
    cy.visit("/customer/home", {
      onBeforeLoad(win) {
        win.localStorage.setItem(
          "sr-store-customers",
          JSON.stringify([{ name: "Test User", email: "test-user@example.com", password: "Test@123" }]),
        );
        win.localStorage.setItem("sr-store-current-customer", "test-user@example.com");
      },
    });

    cy.contains("Welcome, Test User").should("be.visible");
    cy.contains("Cart: 0").should("be.visible");

    cy.contains("button", "Add to cart").first().click();
    cy.contains("Cart: 1").should("be.visible");
  });

  it("opens product details page from home", () => {
    cy.visit("/customer/home", {
      onBeforeLoad(win) {
        win.localStorage.setItem(
          "sr-store-customers",
          JSON.stringify([{ name: "Test User", email: "test-user@example.com", password: "Test@123" }]),
        );
        win.localStorage.setItem("sr-store-current-customer", "test-user@example.com");
      },
    });

    cy.contains("a", "More details").first().click();
    cy.url().should("include", "/customer/product/");
    cy.contains("a", "Back").should("be.visible");
    cy.contains("button", "Add to cart").should("not.exist");
  });
});
