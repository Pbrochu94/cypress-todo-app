describe("add todo functionalities", () => {
  beforeEach(() => {
    cy.visit("/index.html");
  });
  it("add new todo to list", () => {
    cy.get(".new-todo")
      .should("have.attr", "placeholder", "What needs to be done?")
      .click()
      .type("Workout{enter}");
    cy.get(".todo-list").should("have.length", "1");
  });
});
