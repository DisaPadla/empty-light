import React from 'react';
import styled from 'styled-components';
import { Droppable, Draggable } from 'react-beautiful-dnd';

import { Title, PlaceholderBtn } from '../../components';
import { Tasks } from './Tasks';

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  width: 280px;
  background: ${props => props.theme.secondary};
  margin: ${props => props.theme.verMargin};
  border-radius: ${props => props.theme.radius};
  padding-top: ${props => props.theme.padding};
`;

export const Column = ({ column, addNewTask, tasks, index }) => {
  const onHandleAddTask = name => {
    addNewTask(name, column.id);
  };

  return (
    <Draggable draggableId={column.id} index={index}>
      {provided => (
        <div
          {...provided.draggableProps}
          ref={provided.innerRef}
          {...provided.dragHandleProps}
        >
          <Droppable droppableId={column.id}>
            {provided => {
              return (
                <Wrap {...provided.droppableProps} ref={provided.innerRef}>
                  <Title>{column.name}</Title>
                  <Tasks tasks={tasks} />
                  {provided.placeholder}
                  <PlaceholderBtn
                    text="+ Add new task"
                    placeholder="...Add task title"
                    onAdd={onHandleAddTask}
                  />
                </Wrap>
              );
            }}
          </Droppable>
        </div>
      )}
    </Draggable>
  );
};
