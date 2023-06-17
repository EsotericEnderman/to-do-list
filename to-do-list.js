/* eslint-disable no-use-before-define */
/* eslint-disable func-style */
const toDoLists = JSON.parse(localStorage.getItem("toDoLists")) ?? [];

const toDoListContainerDiv = document.querySelector("div.js-to-do-lists-grid");

renderToDoLists();

const addToDoListButton = document.querySelector(
	"button.js-create-to-do-list-button",
);

addToDoListButton.addEventListener("click", () => {
	toDoLists.push([]);

	renderToDoLists();
});

function renderToDoLists() {
	localStorage.setItem("toDoLists", JSON.stringify(toDoLists));

	toDoListContainerDiv.innerHTML = "";

	toDoLists.forEach((toDoList, index) => {
		toDoListContainerDiv.innerHTML += `

    <div class="to-do-list">

      <div class="close-to-do-list-icon-wrapper">
        <div class="close-to-do-list-tooltip">Delete To-Do List</div>
        <img src="images/close-icon.png" alt="Close Icon" class="close-to-do-list-icon js-close-to-do-list-icon" />
      </div>

      <div class="to-do-list-input-grid">
        <input class="name-input js-name-input-${index}" placeholder="To-Do Name"/>
        <input class="date-input js-date-input-${index}" type="date" />
        <button class="create-to-do-button js-create-to-do-button">Create</button>
      </div>

      <div class="to-do-list-item-grid">
        ${toDoList
					.map(
						// You would expect "checked='false'" to work here, but apparently it doesn't.
						(item) => `

          <div class="to-do-list-item-name">${item.name}</div>
          <div class="to-do-list-item-date">${item.date}</div>

          <input type="checkbox" ${
						item.completed ? "checked='true'" : ""
					} class="js-completed-${index}" />

          <button class="delete-to-do-list-item-button js-delete-to-do-list-item-button-${index}">Delete</button>

        `,
					)
					.join("")}
      </div>
    </div>

    `;
	});

	const closeButtons = document.querySelectorAll(
		"img.js-close-to-do-list-icon",
	);

	closeButtons.forEach((closeButton, index) =>
		closeButton.addEventListener("click", () => {
			toDoLists.splice(index, 1);

			renderToDoLists();
		}),
	);

	// The buttons' events have to be registered separately to avoid the event listeners not working.

	toDoLists.forEach((_toDoList, index) => {
		const deleteItemButtons = document.querySelectorAll(
			`button.js-delete-to-do-list-item-button-${index}`,
		);

		deleteItemButtons.forEach((button, buttonIndex) =>
			button.addEventListener("click", () => {
				toDoLists[index].splice(buttonIndex, 1);

				renderToDoLists();
			}),
		);

		const createElementItemButtons = document.querySelectorAll(
			"button.js-create-to-do-button",
		);

		createElementItemButtons.forEach((createElementButton) =>
			createElementButton.addEventListener("click", () => {
				const nameInput = document.querySelector(
					`input.js-name-input-${index}`,
				);

				const dateInput = document.querySelector(
					`input.js-date-input-${index}`,
				);

				// @ts-ignore
				if (nameInput.value && dateInput.value) {
					// @ts-ignore
					toDoLists[index].push({name: nameInput.value, date: dateInput.value});

					renderToDoLists();
				}
			}),
		);

		const completedElements = document.querySelectorAll(
			`input.js-completed-${index}`,
		);

		completedElements.forEach((element, elementIndex) =>
			element.addEventListener("click", () => {
				// @ts-ignore
				toDoLists[index][elementIndex].completed =
					!toDoLists[index][elementIndex].completed;

				renderToDoLists();
			}),
		);
	});
}
