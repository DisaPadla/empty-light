import React, { Fragment, useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';

import { Card, Modal } from '../../components';

export const Tasks = ({ tasks }) => {
  const [open, toggle] = useState(false);

  return tasks.map((item, index) => (
    <Fragment>
      <Draggable draggableId={item.id} index={index} key={item.id}>
        {provided => {
          return (
            <Card
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              ref={provided.innerRef}
              onClick={() => toggle(true)}
            >
              {index} {item.name}
            </Card>
          );
        }}
      </Draggable>
      <Modal open={open} onClose={() => toggle(false)}>
        <div>asdasfas</div>
      </Modal>
    </Fragment>
  ));
};
