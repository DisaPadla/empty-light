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

const Bla = styled.div``;

class Column extends Component {
  render() {
    const CardStyl = this.props.loading ? PendingCard : Card;
    return (
      <DraggableStyl
        draggableId={this.props.section.id}
        index={this.props.index}
      >
        {provided => (
          <Bla
            {...provided.draggableProps}
            innerRef={provided.innerRef}
            {...provided.dragHandleProps}
          >
            <Title>{this.props.section.title}</Title>
            <Droppable droppableId={this.props.section.id}>
              {provided => (
                <Wrap {...provided.droppableProps} innerRef={provided.innerRef}>
                  {this.props.tasks.map((item, index) => (
                    <Draggable
                      draggableId={item.id}
                      index={index}
                      key={item.id}
                    >
                      {provided => (
                        <CardStyl
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          innerRef={provided.innerRef}
                        >
                          {index} {item.id}
                        </CardStyl>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                  <PlaceholderBtn
                    text="+ Add new task"
                    placeholder="...Add task title"
                    onAdd={this.addNewCol}
                  />
                </Wrap>
              )}
            </Droppable>
            {provided.placeholder}
          </Bla>
        )}
      </DraggableStyl>
    );
  }
}

export default Column;
