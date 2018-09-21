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

export const updateMultipleTasks = tasks => tasksRef.update(tasks);

export const unwatchTasks = () => tasksRef.off();
