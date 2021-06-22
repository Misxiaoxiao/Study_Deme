import React from 'react'
import type { ReactNode } from 'react'
import { Droppable, Draggable } from 'react-beautiful-dnd'
import type { DroppableProps, DroppableProvided, DroppableProvidedProps, DraggableProps } from 'react-beautiful-dnd'

type DropPropsType = Omit<DroppableProps, 'children'> & { children: ReactNode }

export const Drop: React.FC<DropPropsType> = ({ children, ...props }) => {
  return <Droppable
    {...props}
  >
    {
      (provided => {
        if (React.isValidElement(children)) {
          return React.cloneElement(children, {
            ...provided.droppableProps,
            ref: provided.innerRef,
            provided
          })
        }
        return <div />
      })
    }
  </Droppable>
}

type DropChildPropsType = Partial<
  { provided: DroppableProvided } & DroppableProvidedProps
> & React.HTMLAttributes<HTMLDivElement>

export const DropChild = React.forwardRef<HTMLDivElement, DropChildPropsType>(
  ({children, ...props}, ref) => <div ref={ref} {...props}>
    { children }
    { props.provided?.placeholder }
  </div>
)

type DragPropsType = Omit<DraggableProps, 'children'> & { children: ReactNode }

export const Drag: React.FC<DragPropsType> = ({children, ...props}) => {
  return <Draggable
    {...props}
  >
    {
      provided => {
        if (React.isValidElement(children)) {
          return React.cloneElement(children, {
            ...provided.dragHandleProps,
            ...provided.draggableProps,
            ref: provided.innerRef,
            provided
          })
        }
        return <div />
      }
    }
  </Draggable>
}
