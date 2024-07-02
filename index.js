const TODO_TAB_BUTTON_ID = {
  personal: "personal-tab",
  professional: "professional-tab",
};

const todoAppData = {
  currentTabId: TODO_TAB_BUTTON_ID.personal,
  personalTodoList: [
    {
      id: 1,
      name: "Personal Work No. 1",
      completed: true,
    },
    {
      id: 2,
      name: "Personal Work No. 2",
      completed: false,
    },
    {
      id: 3,
      name: "Personal Work No. 3",
      completed: false,
    },
    {
      id: 4,
      name: "Personal Work No. 4",
      completed: true,
    },
    {
      id: 5,
      name: "Personal Work No. 5",
      completed: false,
    },
  ],
  professionalTodoList: [
    {
      id: 1,
      name: "Professional Work No. 1",
      completed: true,
    },
    {
      id: 2,
      name: "Professional Work No. 2",
      completed: false,
    },
    {
      id: 3,
      name: "Professional Work No. 3",
      completed: false,
    },
    {
      id: 4,
      name: "Professional Work No. 4",
      completed: true,
    },
    {
      id: 5,
      name: "Professional Work No. 5",
      completed: false,
    },
  ],
};

const tabPath = ".content-wrapper > .content-container > .tab-list > .button";
const addButtonElement = document.querySelector(
  ".content-wrapper > .content-container > .form > .button"
);
const inputElement = document.querySelector(
  ".content-wrapper > .content-container > .form > .input"
);
const totoListElement = document.querySelector(
  ".content-wrapper > .content-container > .todo-list > .list"
);

function getCurrentToDoListItem() {
  const { currentTabId, personalTodoList, professionalTodoList } = todoAppData;
  const totoListItem =
    currentTabId === TODO_TAB_BUTTON_ID.personal
      ? personalTodoList
      : professionalTodoList;

  return totoListItem;
}

function toggleTodoItem(checkbox, itemId) {
  const { currentTabId, personalTodoList, professionalTodoList } = todoAppData;
  const totoListItem =
    currentTabId === TODO_TAB_BUTTON_ID.personal
      ? personalTodoList
      : professionalTodoList;
  const selectedItemIndex = totoListItem.findIndex(
    (item) => item.id === itemId
  );
  totoListItem[selectedItemIndex].completed = checkbox.checked;
}

function updateListContent() {
  const totoListItem = getCurrentToDoListItem();
  let totoListItemElementString = "";

  totoListItem.forEach((item) => {
    const itemId = `item-${item.id}`;

    totoListItemElementString += `<div class="item">
      <input id="${itemId}" ${
      item.completed ? "checked" : ""
    } hidden onClick="toggleTodoItem(this,${
      item.id
    })" class="checkbox" type="checkbox" />
      <label for="${itemId}" class="label">
        <img class="icon -check" src="./assets/icons/check-circle.svg" />
        <img
          class="icon -uncheck"
          src="./assets/icons/radio-button-unchecked.svg"
        />
        <span class="text">${item.name}</span>
      </label>
      <button onClick="removeTodoItem(${item.id})" class="button">
        <img
          class="icon -delete"
          src="./assets/icons/delete-outline.svg"
        />
      </button>
    </div>`;
  });

  totoListElement.innerHTML = totoListItemElementString;
}

function removeTodoItem(itemId) {
  const totoListItem = getCurrentToDoListItem();
  const deleteItemIndex = totoListItem.findIndex((item) => item.id === itemId);
  const confirmMessage = `${totoListItem[deleteItemIndex].name} will be deleted. Are you sure?`;
  const isConfirmed = confirm(confirmMessage);

  if (!isConfirmed) {
    return;
  }

  totoListItem.splice(deleteItemIndex, 1);
  updateListContent();
}

function addMoreTodoItem() {
  const inputValue = inputElement.value;
  const inputTrimmedValue = inputValue.trim();

  if (!inputTrimmedValue) {
    return;
  }

  const totoListItem = getCurrentToDoListItem();

  const isExistTodoItem = totoListItem.find(
    (item) => item.name === inputTrimmedValue
  );

  if (isExistTodoItem) {
    return;
  }

  const lastToDOItem = totoListItem.at(-1);
  const newToDoItem = {
    id: lastToDOItem.id + 1,
    completed: false,
    name: inputTrimmedValue,
  };
  const newItemId = `item-${newToDoItem.id}`;
  const newToDoItemElement = `<div class="item">
      <input id="${newItemId}" hidden onClick="toggleTodoItem(this, ${newToDoItem.id})" class="checkbox" type="checkbox" />
      <label for="${newItemId}" class="label">
        <img class="icon -check" src="./assets/icons/check-circle.svg" />
        <img
          class="icon -uncheck"
          src="./assets/icons/radio-button-unchecked.svg"
        />
        <span class="text">${newToDoItem.name}</span>
      </label>
      <button onClick="removeTodoItem(${newToDoItem.id})" class="button">
        <img
          class="icon -delete"
          src="./assets/icons/delete-outline.svg"
        />
      </button>
    </div>`;

  totoListItem.push(newToDoItem);
  totoListElement.insertAdjacentHTML("beforeend", newToDoItemElement);
  inputElement.value = "";
  addButtonElement.classList.add("-disable");
}

function validateInput(value) {
  const trimValue = value.trim();
  if (!trimValue) {
    addButtonElement.classList.add("-disable");
  } else {
    addButtonElement.classList.remove("-disable");
  }
}

function selectTabButton(buttonId) {
  const tabButtons = document.querySelectorAll(tabPath);
  tabButtons.forEach((buttonEl) => {
    if (buttonEl.classList.contains("-active")) {
      buttonEl.classList.remove("-active");
    }
  });

  const activeTabButton = document.getElementById(buttonId);
  activeTabButton.classList.add("-active");
  todoAppData.currentTabId = buttonId;
  updateListContent();
}

function clearCompletedTodo() {
  const confirmMessage = "All completed tasks will be deleted. Are you sure?";
  const isConfirmed = confirm(confirmMessage);

  if (!isConfirmed) {
    return;
  }

  const totoListItem = getCurrentToDoListItem();
  const uncompletedTodoItems = totoListItem.filter((item) => !item.completed);
  totoListItem.splice(0, totoListItem.length);
  totoListItem.push(...uncompletedTodoItems);
  updateListContent();
}

document.addEventListener("DOMContentLoaded", () => {
  updateListContent();
});
