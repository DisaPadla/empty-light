import { tasksRef } from "../";

export const watchTasks = cb => {
  return tasksRef.orderByChild("order").on("value", snapshot => {
    const data = [];
    snapshot.forEach(item => {
      data.push({ ...item.val(), id: item.key });
    });
    cb({
      tasks: data
    });
  });
};

export const updateTask = task => {
  tasksRef.child(task.id).update(task);
};

export const addTask = task => {
  const newTaskRef = tasksRef.push();
  const key = newTaskRef.key;
  newTaskRef.set({ ...task, id: key });
};

export const unwatchTasks = () => tasksRef.off();
