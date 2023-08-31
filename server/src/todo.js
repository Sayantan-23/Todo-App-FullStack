let tasks = [];

export function addTask(taskText) {
  if (taskText.trim() !== "") {
    tasks.push(taskText);
    return true;
  }
  return false;
}

export function deleteTaskByIndex(taskIndex) {
  if (taskIndex >= 0 && taskIndex < tasks.length) {
    tasks.splice(taskIndex, 1);
    return true;
  }
  return false;
}

export function deleteAllTasks() {
  tasks = [];
  return true;
}
