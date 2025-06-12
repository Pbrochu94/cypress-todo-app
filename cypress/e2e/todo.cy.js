//utilities
function addTask(task) {
  cy.get("@todoBar")
    .should("have.attr", "placeholder", "What needs to be done?")
    .click()
    .type(`${task}{enter}`);
}
let tasks = [
  "Workout",
  "Web dev",
  "Laundry",
  "Stream",
  "Take a walk",
  "Invest",
  "Take a 15 min relaxation break",
];

//tests
describe("add todo functionalities", () => {
  beforeEach(() => {
    cy.visit("/index.html");
    cy.get(`.todo-list`).as(`list`); //define the list selector as list
    cy.get(`.new-todo`).as(`todoBar`); //define the list selector as list
  });
  it("add new todos to list", () => {
    tasks.forEach((task) => {
      //check for each tasks in the array
      addTask(task);
      cy.get(`@list`).children().first().should(`contain.text`, `${task}`);
    });
    cy.get(".todo-list").children().should("have.length", tasks.length);
  });
  it("user cannot add an empty string", () => {
    cy.get(`@todoBar`).click().type("{enter}");
    cy.get(`@list`).children().should(`have.length`, 0);
    cy.get(`@todoBar`).should(`have.value`, ``);
  });
});
describe("add todo UI validation", () => {
  beforeEach(() => {
    cy.visit("/index.html");
    cy.get(`.todo-list`).as(`list`); //define the list selector as list
    cy.get(`.new-todo`).as(`todoBar`); //define the list selector as list
    tasks.forEach((task) => {
      addTask(task);
    });
  });
  it("check circle successfully appears next to the new todo", () => {});
});
