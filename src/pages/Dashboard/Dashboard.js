import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

import { Grid } from './Grid';

import {
  watchColumns,
  unwatchColumns,
  watchTasks,
  unwatchTasks,
  updateColumn,
  updateTask
} from '../../firebase/dashboard';
import { calculateOrder } from './utils/dndOrder';

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [columns, setColumns] = useState([]);

  useEffect(() => {
    watchColumns(setColumns);
    watchTasks(setTasks);

    return () => {
      unwatchColumns();
      unwatchTasks();
    };
  }, []);

  function onDragEnd(result) {
    const { source, destination, draggableId, type } = result;

    if (!destination) {
      return null;
    }

    if (
      destination.index === source.index &&
      destination.droppableId === source.droppableId
    ) {
      return null;
    }

    if (type === 'column') {
      const column = columns.find(col => col.id === draggableId);
      updateColumn({
        ...column,
        order: calculateOrder(result, columns)
      });
    } else {
      const sourceItem = tasks.find(task => task.id === draggableId);
      const destinationTasks = tasks.filter(
        task => task.column === destination.droppableId
      );
      updateTask({
        ...sourceItem,
        order: calculateOrder(result, destinationTasks),
        column: destination.droppableId
      });
    }
  }
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="columns" direction="horizontal" type="column">
        {provided => (
          <Grid provided={provided} columns={columns} tasks={tasks} />
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default Dashboard;
