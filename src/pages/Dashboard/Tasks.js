import React from 'react';
import { Draggable } from 'react-beautiful-dnd';

import { Card } from '../../components';

export const Tasks = ({ tasks }) =>
  tasks.map((item, index) => (
    <Draggable draggableId={item.id} index={index} key={item.id}>
      {provided => {
        return (
          <Card
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
          >
            {index} {item.name}
          </Card>
        );
      }}
    </Draggable>
  ));
