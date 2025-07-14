function generateId() {
  return Date.now() + Math.floor(Math.random() * 10);
}
console.log(generateId());

let allTasks = JSON.parse(localStorage.getItem("tasks")) || [
  {
    id: generateId(),
    name: "Go To Gym",
    complete: false,
  },
  {
    id: generateId(),
    name: "Coding Study",
    complete: false,
  },
];
function updateLocalStorage() {
  localStorage.setItem("tasks", JSON.stringify(allTasks));
}

let addBtn = document.getElementById("addBtn");
let taskList = document.getElementById("taskLists");
let userInput = document.getElementById("input");

const renderTaskList = () => {
  taskList.innerHTML = "";

  let sortTask = [...allTasks].sort((a, b) => a.complete - b.complete);

  sortTask.forEach((item) => {
    let li = document.createElement("li");
    li.setAttribute("data-id", item.id);
    li.classList =
      "taskItem flex items-center justify-between h-15 border-0 border-b-2 border-gray-500 transition-opacity duration-300 ease-in";
    li.innerHTML = `
          <div class="flex items-center">
            <div
              class="checkBtn h-6 w-6 rounded-full flex justify-center border-2 border-gray-600 mr-3 cursor-pointer "
            >
              <i
                style="display: ${item.complete ? "block" : "none"}"
                class="fa-solid fa-check self-center text-gray-600 rightIcn"
              ></i>
            </div>
            <p class="taskName text-2xl font-semibold text-gray-600">
              ${item.name}
            </p>
          </div>
          <div class="taskBtn">
            <button
              class="edit bg-blue-700 h-9 w-9 rounded-2xl mr-2 active:bg-blue-800 active:scale-[0.97] active:shadow-md transition-all duration-100"
            >
              <i class="fa-solid fa-pen-to-square text-white"></i>
            </button>
            <button
              class="delete bg-red-700 h-9 w-9 rounded-2xl active:bg-red-800 active:scale-[0.97] active:shadow-md transition-all duration-100"
            >
              <i class="fa-solid fa-trash text-white"></i>
            </button>
          </div>
    `;
    if (item.complete) {
      li.querySelector(".taskName").classList.add("line-through");
      li.style.opacity = "0.5";
    } else {
      li.style.opacity = "1";
    }
    taskList.append(li);
  });
};
const addToList = () => {
  let inputValue = userInput.value.trim();

  if (inputValue.length > 20) {
    console.log("Input name too long!");
    return;
  } else {
    allTasks.push({
      id: Date.now(),
      name: inputValue,
      complete: false,
    });
    updateLocalStorage();
    renderTaskList();
  }

  userInput.value = "";
};

addBtn.addEventListener("click", addToList);

userInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    addToList();
  }
});

// Delete Logic
taskList.addEventListener("click", (e) => {
  const li = e.target.closest("li");

  if (!li) return;

  let taskId = parseInt(li.dataset.id);

  if (e.target.closest(".delete")) {
    allTasks = allTasks.filter((task) => task.id !== taskId);
    updateLocalStorage();
    renderTaskList();
  }
  if (e.target.closest(".checkBtn")) {
    const task = allTasks.find((task) => task.id === taskId);
    if (task) {
      task.complete = !task.complete;
      updateLocalStorage();
      renderTaskList();
    }
  }

  if (e.target.closest(".edit")) {
    const newName = prompt(
      "Edit Your Task",
      li.querySelector(".taskName").textContent
    );
    if (newName !== null) {
      const task = allTasks.find((task) => task.id === taskId);
      if (task) {
        task.name = newName.trim();
        updateLocalStorage();
        renderTaskList();
      }
    }
  }
});

renderTaskList();
