import React, { Component } from "react";
import styled from "styled-components";
import { DragDropContext, Droppable } from "react-beautiful-dnd";

import Column from "./Column";
import { NewCol } from "./NewCol";
import { Grid, PlaceholderBtn } from "../../components";

import {
  watchColumns,
  unwatchColumns,
  watchTasks,
  unwatchTasks,
  addColumn,
  updateColumn,
  updateTask
} from "../../firebase/dashboard";

const loadingMockData = {
  tasks: {
    "task-1": { id: "task-1", column: "column-1", order: 1024 },
    "task-2": { id: "task-2", column: "column-1", order: 2048 },
    "task-3": { id: "task-3", column: "column-2", order: 4096 },
    "task-4": { id: "task-4", column: "column-2", order: 8192 },
    "task-5": { id: "task-5", column: "column-2", order: 16384 }
  },
  columns: {
    "column-1": {
      id: "column-1",
      order: 1024,
      name: "column-1"
    },
    "column-2": {
      id: "column-2",
      order: 2048,
      name: "column-2"
    }
  }
};

export default class Dashboard extends Component {
  state = {
    tasks: [],
    columns: []
  };

  componentDidMount() {
    watchColumns(this.getDashboardData);
    watchTasks(this.getDashboardData);
  }

  componentWillUnmount() {
    unwatchColumns();
    unwatchTasks();
  }

  getDashboardData = data => this.setState(data);

  addNewCol = name => {
    const lastCol = this.state.columns[this.state.columns.length - 1];
    const column = {
      name,
      order: lastCol ? lastCol.order * 2 : 2048
    };
    addColumn(column);
  };

  onDragEnd = result => {
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

    if (type === "column") {
      const column = this.state.columns.find(col => col.id === draggableId);
      updateColumn({
        ...column,
        order:
          destination.index > source.index
            ? this.state.columns[destination.index].order * 2
            : this.state.columns[destination.index].order / 2
      });
    } else {
      const sourceItem = this.state.tasks.find(task => task.id === draggableId);
      updateTask({
        ...sourceItem,
        order: this.getNewOrder(result),
        column: destination.droppableId
      });
    }
  };

  getNewOrder = ({ destination, source }) => {
    const { tasks } = this.state;
    const destinationTasks = tasks.filter(
      task => task.column === destination.droppableId
    );
    const destinationItem =
      destinationTasks[destination.index] ||
      destinationTasks[destination.index - 1];
    const isSameCol = destination.droppableId === source.droppableId;

    if (destination.index === 0) {
      return destinationItem ? destinationItem.order / 2 : 2048;
    }

    if (isSameCol && destination.index >= destinationTasks.length - 1) {
      return destinationItem.order * 2;
    }

    if (!isSameCol && destination.index === destinationTasks.length) {
      return destinationItem.order * 2;
    }

    if (isSameCol) {
      const prevDestinationItem = destinationTasks[destination.index - 1];
      const nextDestinationItem = destinationTasks[destination.index + 1];
      return destination.index > source.index
        ? (nextDestinationItem.order - destinationItem.order) / 2 +
            destinationItem.order
        : (destinationItem.order - prevDestinationItem.order) / 2 +
            prevDestinationItem.order;
    }

    const prevDestinationItem = destinationTasks[destination.index - 1];
    return (
      (destinationItem.order - prevDestinationItem.order) / 2 +
      prevDestinationItem.order
    );
  };

  render() {
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <Droppable droppableId="columns" direction="horizontal" type="column">
          {provided => (
            <Grid
              {...provided.droppableProps}
              innerRef={provided.innerRef}
              cols={this.state.columns.length + 1}
            >
              {this.state.columns.map((column, index) => {
                const tasks = this.state.tasks.filter(
                  task => task.column === column.id
                );
                return (
                  <Column
                    section={column}
                    key={column.id}
                    tasks={tasks}
                    index={index}
                  />
                );
              })}
              {provided.placeholder}
              <PlaceholderBtn
                text="+ Add column"
                placeholder="...Add column title"
                onAdd={this.addNewCol}
              />
            </Grid>
          )}
        </Droppable>
      </DragDropContext>
    );
  }
}
