import React from 'react';

import { Grid as GridContainer, PlaceholderBtn } from '../../components';
import { Columns } from './Columns';

import { addColumn } from '../../firebase/dashboard';

export const Grid = ({ columns, tasks, provided }) => {
  const addNewCol = name => {
    const lastCol = columns[columns.length - 1];
    const column = {
      name,
      order: lastCol ? lastCol.order * 2 : 2048
    };
    addColumn(column);
  };

  return (
    <GridContainer
      {...provided.droppableProps}
      ref={provided.innerRef}
      cols={columns.length + 1}
    >
      <Columns columns={columns} tasks={tasks} />
      <PlaceholderBtn
        text="+ Add column"
        placeholder="...Add column title"
        onAdd={addNewCol}
      />
    </GridContainer>
  );
};
