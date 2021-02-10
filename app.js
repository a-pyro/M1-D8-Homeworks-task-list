console.log('Hi there! 🔥');
window.addEventListener('DOMContentLoaded', () => {
  // memoria
  const tasksMemory = [];

  //dom reference
  const form = document.getElementById('form');
  const userInputDOM = document.getElementById('inputText');
  const colorSelectorDOM = document.querySelector('.form-select');
  const filterInputDOM = document.getElementById('filterInput');
  const sortBtn = document.getElementById('sortBtn');
  const taskListDOM = document.getElementById('taskList');

  //eventlisteners
  form.addEventListener('submit', addTask);
  taskListDOM.addEventListener('click', removeTask);
  sortBtn.addEventListener('click', sortList);
  filterInputDOM.addEventListener('keyup', filterTasks);

  //functions

  function addTask(e) {
    const taskBody = userInputDOM.value;
    if (!taskBody) {
      console.log('task needed');
      clearInput(userInputDOM);

      e.preventDefault();
      return;
    }
    const taskColor = colorSelectorDOM.value;

    tasksMemory.push({ taskBody, taskColor, taskiD: null });
    console.table(tasksMemory);

    clearInput(userInputDOM);
    showTasks(tasksMemory);
    e.preventDefault();
  }

  function removeTask(e) {
    if (e.target.className === 'delete-task') {
      console.log(e.target.parentElement);
      const taskiD = parseInt(document.querySelector('.task-id').innerText);

      tasksMemory.splice(taskiD - 1, 1);
      showTasks(tasksMemory);
    } else {
      console.log('no way ');
    }
  }
  function sortList() {}

  function filterTasks() {
    if (filterInputDOM.value) {
      const filtered = tasksMemory.filter((task) =>
        task.taskBody.includes(filterInputDOM.value)
      );
      showTasks(filtered);
    } else {
      showTasks(tasksMemory);
    }
  }

  function showTasks(taskList) {
    taskListDOM.innerHTML = '';
    taskList.forEach((task, idx) => {
      const { taskBody, taskColor } = task;
      const html = `<li class='task'>
          <span class='task-color-task ${taskColor}'></span> <span class="task-id">${
        idx + 1
      }</span> - ${taskBody}
          <span class='delete-task'>x</span>
        </li>`;
      taskListDOM.insertAdjacentHTML('beforeend', html);
    });
  }
  function clearInput(input) {
    input.value = '';
    input.focus();
  }

  //storage
  function addStorage(params) {}

  function getStore() {
    const taskInStore = localStorage.getItem('taskList');
    if (taskInStore) return JSON.parse(taskInStore);
  }
});
