console.log('Hi there! 🔥');
window.addEventListener('DOMContentLoaded', () => {
  animate('.container');
  // memoria
  const tasksMemory = [];

  //dom reference
  const form = document.getElementById('form');
  const userInputDOM = document.getElementById('inputText');
  const colorSelectorDOM = document.querySelector('.form-select');
  const filterInputDOM = document.getElementById('filterInput');
  const sortBtn = document.getElementById('sortBtn');
  const taskListDOM = document.getElementById('taskList');
  const filterRadio = document.querySelector('.filter-radio');

  //eventlisteners
  form.addEventListener('submit', addTask);
  taskListDOM.addEventListener('click', removeTask);
  sortBtn.addEventListener('click', sortList);
  filterInputDOM.addEventListener('keyup', filterTasks);
  filterRadio.addEventListener('click', filterByColor);

  //functions
  function filterByColor(e) {
    if (e.target.className === 'form-check-input') {
      console.log(e.target);
      const color = e.target.value;
      console.log(color);
      if (color === 'all') {
        showTasks(tasksMemory);
        return;
      }
      const filtered = tasksMemory.filter((task) => {
        const { taskColor } = task;
        return taskColor === color;
      });
      showTasks(filtered);
    }
  }

  function addTask(e) {
    const taskBody = userInputDOM.value;
    if (!taskBody) {
      console.log('task needed');
      clearInput(userInputDOM);

      e.preventDefault();
      return;
    }
    const taskColor = colorSelectorDOM.value;

    tasksMemory.push({ taskBody, taskColor });
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
  function sortList() {
    const sortedList = tasksMemory.sort((a, b) => {
      if (a.taskBody < b.taskBody) return -1;
    });
    console.log(sortedList);
    showTasks(sortedList);
  }

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
    if (
      document
        .querySelector('.tasks.section-spacing')
        .classList.contains('hide')
    ) {
      animate('.tasks.section-spacing');
    }

    taskList.forEach((task, idx) => {
      const { taskBody, taskColor } = task;
      const html = `
      <li class='task hide'>
          <span class='task-color-task ${taskColor}'></span> <span class="task-id">${
        idx + 1
      }</span> - ${taskBody}
          <span class='delete-task'>x</span>
      </li>`;
      taskListDOM.insertAdjacentHTML('beforeend', html);
    });

    setTimeout(() => {
      const tasks = document.querySelectorAll('.task.hide');
      tasks.forEach((task, _, array) => {
        task.classList.remove('hide');

        if (task === array[array.length - 1]) {
          task.classList.remove('hide');
          task.classList.add('show');
        }
      });
    }, 200);
  }
  function clearInput(input) {
    input.value = '';
    input.focus();
  }

  function animate(element) {
    document.querySelector(`${element}`).classList.remove('hide');
    document.querySelector(`${element}`).classList.add('show');
  }
  //storage
  // function addStorage(params) {}

  // function getStore() {
  //   const taskInStore = localStorage.getItem('taskList');
  //   if (taskInStore) return JSON.parse(taskInStore);
  // }
});
