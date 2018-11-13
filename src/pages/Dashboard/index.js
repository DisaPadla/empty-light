import React, { Component } from "react";
import styled from "styled-components";
import { DragDropContext, Droppable } from "react-beautiful-dnd";

import Column from "./Column";
import { Grid, PlaceholderBtn } from "../../components";
import { Card } from "./Card";

import {
  watchColumns,
  unwatchColumns,
  watchTasks,
  unwatchTasks,
  addColumn,
  updateColumn,
  updateTask,
  addTask
} from "../../firebase/dashboard";
import { calculateOrder } from "./utils/dndOrder";

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

  addNewTask = (name, columnId) => {
    const destinationTasks = this.state.tasks.filter(
      task => task.column === columnId
    );
    const lastExistTask = destinationTasks[destinationTasks.length - 1];
    const task = {
      name,
      column: columnId,
      order: lastExistTask ? lastExistTask.order * 2 : 2048
    };
    addTask(task);
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
        order: calculateOrder(result, this.state.columns)
      });
    } else {
      const sourceItem = this.state.tasks.find(task => task.id === draggableId);
      const { tasks } = this.state;
      const destinationTasks = tasks.filter(
        task => task.column === destination.droppableId
      );
      updateTask({
        ...sourceItem,
        order: calculateOrder(result, destinationTasks),
        column: destination.droppableId
      });
    }
  };

  showCardModal = () => this.setState({ openCardModal: true });

  hideCardModal = () => this.setState({ openCardModal: false });

  render() {
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <Droppable droppableId="columns" direction="horizontal" type="column">
          {provided => (
            <Grid
              {...provided.droppableProps}
              ref={provided.innerRef}
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
                    addNewTask={this.addNewTask}
                    showCardModal={this.showCardModal}
                  />
                );
              })}
              <PlaceholderBtn
                text="+ Add column"
                placeholder="...Add column title"
                onAdd={this.addNewCol}
              />
            </Grid>
          )}
        </Droppable>
        {this.state.openCardModal && (
          <Modal onClose={this.hideCardModal}>
            <Card />
          </Modal>
        )}
      </DragDropContext>
    );
  }
}
