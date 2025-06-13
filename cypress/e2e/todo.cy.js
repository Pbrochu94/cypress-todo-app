//utilities
function addTask(task) {
  cy.get("@todoBar")
    .should("have.attr", "placeholder", "What needs to be done?")
    .click()
    .type(`${task}{enter}`);
}

function clearTodos() {
  cy.visit("/index.html");
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
describe.skip("add todo functionalities", () => {
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
  it("check circle successfully appears next to the new todo", () => {
    cy.get("@list")
      .children()
      .each((li) => {
        cy.wrap(li).find(`[type=checkbox]`).should(`exist`);
      });
  });
  it(`check circle appears unchecked upon invocation`, () => {
    cy.get("@list")
      .children()
      .each((li) => {
        cy.wrap(li).find(`[type=checkbox]`).should(`not.be.checked`);
      });
  });
  it("check that checkboxes can be check and the todo text has a strikethrough", () => {
    cy.get(`@list`)
      .children()
      .each((li) => {
        cy.wrap(li).find(`[type=checkbox]`).check();
        cy.wrap(li).find(`[type=checkbox]`).should("be.checked");
        cy.wrap(li)
          .find(`label`)
          .should(
            `have.css`,
            `text-decoration`,
            `line-through solid rgb(148, 148, 148)`,
          )
          .and(`have.css`, `color`, `rgb(148, 148, 148)`);
      });
  });
  it.skip(`footer sub-menu is not visible when no todo are present`, () => {
    clearTodos();
    cy.get(`.todoapp`).children(`.footer`).should(`not.be.visible`);
  });
  it(`footer sub-menu is added bellow the list when there is 1 or more todos`, () => {
    cy.get(`.todoapp`).children(`footer`).should(`be.visible`);
  });
});
