import React from 'react';

import { Column } from './Column';

import { addTask } from '../../firebase/dashboard';

export const Columns = ({ columns, tasks }) => {
  const addNewTask = (name, columnId) => {
    const destinationTasks = tasks.filter(task => task.column === columnId);
    const lastExistTask = destinationTasks[destinationTasks.length - 1];
    const task = {
      name,
      column: columnId,
      order: lastExistTask ? lastExistTask.order * 2 : 2048
    };
    addTask(task);
  };

  return columns.map((column, index) => {
    const columnTasks = tasks.filter(task => task.column === column.id);
    return (
      <Column
        column={column}
        key={column.id}
        tasks={columnTasks}
        index={index}
        addNewTask={addNewTask}
      />
    );
  });
};
