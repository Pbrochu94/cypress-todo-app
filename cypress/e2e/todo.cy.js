//utilities
function addTask(task) {
  cy.get("@todoBar").click().type(`${task}{enter}`);
}

function removeTodo() {
  cy.get(`@list`).children().first().find(`.destroy`).invoke(`show`).click();
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
describe("add todo functionalities", () => {
  beforeEach(() => {
    cy.visit("/index.html");
    cy.get(`.todo-list`).as(`list`); //define the list selector as list
    cy.get(`.new-todo`).as(`todoBar`); //define the list selector as list
  });
  it.skip("add new todos to list", () => {
    tasks.forEach((task) => {
      //check for each tasks in the array
      addTask(task);
      cy.get(`@list`).children().first().should(`contain.text`, `${task}`);
    });
    cy.get(".todo-list").children().should("have.length", tasks.length);
  });
  it.skip("user cannot add an empty string", () => {
    cy.get(`@todoBar`).click().type("{enter}");
    cy.get(`@list`).children().should(`have.length`, 0);
    cy.get(`@todoBar`).should(`have.value`, ``);
  });
  it.skip("check that checkboxes can be check and the todo text has a strikethrough", () => {
    tasks.forEach((task) => {
      //check for each tasks in the array
      addTask(task);
    });
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
  it.skip(`A green check appears when the user clicks on the check box next to the todo`, () => {
    tasks.forEach((task) => {
      addTask(task);
    });
    cy.get(`.todo-list`)
      .children()
      .each((li) => {
        cy.wrap(li).find(`[type=checkbox]`).click().should(`be.checked`);
      });
  });
  it.skip(`Removes the todo item upon clicking on the "X" icon`, () => {
    tasks.forEach((task) => {
      addTask(task);
    });
    cy.get(`@list`)
      .children()
      .then((li) => {
        if (li.length > 0) {
          cy.wrap(li).each(() => {
            removeTodo();
          });
        }
      });
  });
  it.skip(`Update the item number tracker when adding a todo`, () => {
    let todoCounter = 0;
    tasks.forEach((task) => {
      addTask(task);
      todoCounter++;
    });
    cy.get(`.todo-count`).should(
      `have.text`,
      `${todoCounter} item${todoCounter > 1 ? "s" : ""} left`,
    );
  });
  it(`Update the item number tracker when deleting a todo`, () => {
    let todoCounter = 0;
    addTask(`Workout`);
    todoCounter++;
    removeTodo();
    todoCounter--;
    cy.get(`.todo-count`).should(
      `have.text`,
      `${todoCounter} item${todoCounter == 1 ? "" : "s"} left`,
    );
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
  it.skip("check circle successfully appears next to the new todo", () => {
    cy.get("@list")
      .children()
      .each((li) => {
        cy.wrap(li).find(`[type=checkbox]`).should(`exist`);
      });
  });
  it.skip(`check circle appears unchecked upon invocation`, () => {
    cy.get("@list")
      .children()
      .each((li) => {
        cy.wrap(li).find(`[type=checkbox]`).should(`not.be.checked`);
      });
  });
  it.skip(`The "select all" arrow is not visible when no todo are added`, () => {
    clearTodos();
    cy.get(`.main`)
      .children()
      .find(`.toggle-all-label`)
      .should(`not.be.visible`);
  });
  it.skip(`The "select all" arrow is visible when there are 1 todo or more`, () => {
    cy.get(`.main`).children().find(`.toggle-all-label`).should(`be.visible`);
  });
  it.skip(`No main section (list section) appears when no to-do are added`, () => {
    clearTodos();
    cy.get(`main`).should(`not.be.visible`);
  });
  it.skip(`The main section (list section) appears when 1 or more todos are added`, () => {
    cy.get(`main`).should(`be.visible`);
  });
  it.skip(`footer sub-menu is not visible when no todo are present`, () => {
    clearTodos();
    cy.get(`.todoapp`).children(`.footer`).should(`not.be.visible`);
  });
  it.skip(`footer sub-menu is added bellow the list when there is 1 or more todos`, () => {
    cy.get(`.todoapp`).children(`footer`).should(`be.visible`);
  });
  it.skip(`Assures the footer has all the correct components/DOM element`, () => {
    cy.get(`.todoapp>.footer`).children(`.todo-count`).should(`be.visible`);
    cy.get(`.todoapp>.footer`).children(`.filters`).should(`be.visible`);
    cy.get(`.todoapp>.footer`)
      .children(`.filters`)
      .children()
      .should(`have.length`, 3);
  });
  it.skip(`Check that the filter DOM element in the footer has the right text for each and that the "all" test is highlighted by default when adding a todo`, () => {
    cy.get(`.filters`)
      .children()
      .first()
      .children()
      .should(`have.class`, "selected")
      .and(`have.text`, `All`);
    cy.get(`.filters`)
      .children()
      .eq(1)
      .children()
      .should(`not.have.class`, "selected")
      .and(`have.text`, `Active`);
    cy.get(`.filters`)
      .children()
      .last()
      .children()
      .should(`not.have.class`, "selected")
      .and(`have.text`, `Completed`);
  });
  it.skip(`The todo item counter display the right text and is successfully updated upon every todo add/remove `, () => {
    let numberOfTodos = 0;
    cy.get(`.todo-list`)
      .children()
      .each(() => {
        numberOfTodos++;
      })
      .then(() => {
        cy.get(`.todo-count`).should(
          `have.text`,
          `${numberOfTodos} item${numberOfTodos > 1 ? "s" : ""} left`,
        );
      });
  });
  it.skip(`The "X" icon correctly appears at the right end of each todos upon hovering the mouse on top of the todo`, () => {
    cy.get(".todo-list")
      .children()
      .each((li) => {
        cy.wrap(li).children().find(`.destroy`).should(`not.be.visible`);
        cy.wrap(li)
          .children()
          .find(`.destroy`)
          .invoke(`show`)
          .should(`be.visible`);
      });
  });
});
