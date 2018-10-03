import React, { Component } from "react";
import styled from "styled-components";
import { Droppable, Draggable } from "react-beautiful-dnd";

import { Title, PendingCard, Card, PlaceholderBtn } from "../../components";

const DraggableStyl = styled(Draggable)`
  display: flex;
`;

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

export default class Column extends Component {
  onHandleAddTask = name => {
    this.props.addNewTask(name, this.props.section.id);
  };

  render() {
    const CardStyl = this.props.loading ? PendingCard : Card;
    return (
      <DraggableStyl
        draggableId={this.props.section.id}
        index={this.props.index}
      >
        {provided => (
          <div
            {...provided.draggableProps}
            ref={provided.innerRef}
            {...provided.dragHandleProps}
          >
            <Droppable droppableId={this.props.section.id}>
              {provided => {
                return (
                  <Wrap
                    {...provided.droppableProps}
                    innerRef={provided.innerRef}
                  >
                    <Title>{this.props.section.name}</Title>
                    {this.props.tasks.map((item, index) => (
                      <Draggable
                        draggableId={item.id}
                        index={index}
                        key={item.id}
                      >
                        {provided => {
                          return (
                            <CardStyl
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              innerRef={provided.innerRef}
                              onClick={this.props.showCardModal}
                            >
                              {index} {item.name}
                            </CardStyl>
                          );
                        }}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                    <PlaceholderBtn
                      text="+ Add new task"
                      placeholder="...Add task title"
                      onAdd={this.onHandleAddTask}
                    />
                  </Wrap>
                );
              }}
            </Droppable>
          </div>
        )}
      </DraggableStyl>
    );
  }
}
