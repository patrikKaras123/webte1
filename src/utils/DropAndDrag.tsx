import React, { FC } from 'react'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
import { columns } from '../types/Column'
import { Photo } from '../types/Photo'

interface DropAndDragProps {
  columns: columns[],
  onDragEnd: (result: any, columns: columns[]) => void,
  next: boolean
}

const DropAndDrag: FC<DropAndDragProps> = (props) => {
  const {columns, onDragEnd, next} = props

  return (
    <DragDropContext
      onDragEnd={(result: any) => onDragEnd(result, columns)}
    >
      {columns.map((column) => {
        return (
          <div
            style={{
              display: 'flex',
              flexWrap: "wrap",
              flexDirection: 'column',
              color: 'white',
            }}
            key={column.id}
          >
            <h2
              style={{
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              {column.name}
            </h2>
            <div
              style={{
                margin: 15,
                display: 'block',
                flexWrap: 'wrap',
              }}
            >
              <Droppable droppableId={column.id} key={column.id}>
                {(provided: any, snapshot: any) => {
                  return (
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      style={{
                        background: column.id === "2" && next
                          ? 'green'
                          : 'white',
                        padding: 4,
                        width: 235,
                        minHeight: 300,
                        borderRadius: '10px',
                      }}
                    >
                      {column.items.map(
                        (item: Photo, index: number) => {
                          if (item.id) {
                            return (
                              <Draggable
                                key={item.id}
                                draggableId={item.id.toString()}
                                index={index}
                              >
                                {(provided: any, snapshot: any) => {
                                  return (
                                    <>
                                      <div
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                        style={{
                                          userSelect: 'none',
                                          borderRadius: '10px',
                                          backgroundColor:
                                            snapshot.isDragging
                                              ? '#263B4A'
                                              : '#456C86',
                                          color: 'white',
                                          ...provided.draggableProps
                                            .style,
                                        }}
                                      >
                                        <img
                                          src={item.path}
                                          alt={item.tag + index}
                                          width="100"
                                          height="50"
                                          style={styles}
                                        />
                                      </div>
                                    </>
                                  )
                                }}
                              </Draggable>
                            )
                          }
                        }
                      )}
                      {provided.placeholder}
                    </div>
                  )
                }}
              </Droppable>
            </div>
          </div>
        )
      })}
    </DragDropContext>
  )
}

export default DropAndDrag;

const styles = {
  width: '100%',
}
