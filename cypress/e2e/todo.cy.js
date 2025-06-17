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
  it.skip(`Update the item number tracker when deleting a todo`, () => {
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
  it.skip(`The list only shows active todos when the user click on 'Active'`, () => {
    tasks.forEach((task) => {
      addTask(task);
    });
    //check some of the tasks
    [0, 2, 5].forEach((index) => {
      cy.get(`@list`).children().eq(index).find(`[type=checkbox]`).click();
      cy.get(`@list`)
        .children()
        .eq(index)
        .should(`have.attr`, `class`, `completed`);
    });
    //click on active filter and verify existence in DOM
    cy.get(`.filters`).find(`[href="#/active"]`).click();
    cy.get(`.completed`).should(`not.exist`);

    //verify the innactive todos are still present
    cy.get(`@list`)
      .children()
      .should(`have.length.lessThan`, tasks.length)
      .each((element) => {
        cy.wrap(element).should(`not.have.attr`, `class`, `completed`);
      });
    cy.get(`[href="#/"]`).click();
    cy.get(`@list`).children().should(`have.length`, tasks.length);
  });
  it.skip(`The list only shows completed todos when the user click on 'Completed'`, () => {
    tasks.forEach((task) => {
      addTask(task);
    });
    //check some of the tasks
    [0, 2, 5].forEach((index) => {
      cy.get(`@list`).children().eq(index).find(`[type=checkbox]`).click();
      cy.get(`@list`)
        .children()
        .eq(index)
        .should(`have.attr`, `class`, `completed`);
    });
    //click on completed filter and verify existence in DOM
    cy.get(`.filters`).find(`[href="#/completed"]`).click();
    cy.get(`.completed`).should(`exist`);
    cy.get(`@list`).children().should(`exist`);

    //verify the completed todos are still present
    cy.get(`@list`)
      .children()
      .should(`have.length`, 3)
      .each((element) => {
        cy.wrap(element).should(`have.attr`, `class`, `completed`);
      });
    cy.get(`[href="#/"]`).click();
    cy.get(`@list`).children().should(`have.length`, tasks.length);
  });
  it.skip(`The "CLear completed" button only appears is there is 1 or more todo checked`, () => {
    tasks.forEach((task) => {
      addTask(task);
    });
    cy.get(`.footer`).find(`.clear-completed`).should(`not.be.visible`);
    cy.get(`@list`).children().first().find(`[type=checkbox]`).check();
    cy.get(`.footer`).find(`.clear-completed`).should(`be.visible`);
  });
  it.skip(`The "Clear completed" button delete the checked todos`, () => {
    tasks.forEach((task) => {
      addTask(task);
    });
    cy.get(`@list`)
      .children()
      .each((li) => {
        cy.wrap(li).find(`[type=checkbox]`).check();
      })
      .then(() => {
        cy.get(".clear-completed").click();
        cy.get(`@list`).children().should(`have.length`, 0);
      });
  });
  it(`the "Clear completed" button deleted the checked todos even when using the filter`, () => {
    /* ==== Generated with Cypress Studio ==== */
    cy.get(".new-todo").clear("W");
    cy.get(".new-todo").type("Workout{enter}");
    cy.get(".new-todo").clear("W");
    cy.get(".new-todo").type("Web{enter}");
    cy.get(".new-todo").clear("T");
    cy.get(".new-todo").type("Swim{enter}");
    cy.get('[data-id="3"] > .view > .toggle').check();
    cy.get('[data-id="2"] > .view > .toggle').check();
    cy.get(":nth-child(2) > a").click();
    cy.get(".clear-completed").click();
    cy.get(":nth-child(1) > a").click();
    cy.get(`@list`).children().should(`have.length`, 1);
    /* ==== End Cypress Studio ==== */
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
  it.skip(`Clear completed prompt appear at the right-most end of the footer when 1 or more todo are checked`, () => {
    cy.get(`@list`).children().first().find(`[type=checkbox]`).click();
    cy.get(`.footer`).find(`.clear-completed`).should(`be.visible`);
    clearTodos();
    cy.get(`.footer`).find(`.clear-completed`).should(`not.be.visible`);
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
