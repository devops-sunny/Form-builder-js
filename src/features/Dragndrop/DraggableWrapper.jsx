import React from 'react';
import { useDraggable } from '@dnd-kit/core';
import Box from '@mui/material/Box';
import { customAlphabet } from 'nanoid';

export default function DraggableWrapper({
  id,
  type,
  model,
  children,
  element,
  ...props
}) {
  const nanoid = customAlphabet('1234567890abcdefghijklmnopqrstuvwxyz', 12);
  const Element = element || Box;
  const { attributes, listeners, setNodeRef } = useDraggable({
    id,
    data: {
      //since you can't change active.id dynamically in wrapper component
      // assigning id in data will guarantee unique id
      id: nanoid(),
      type,
      model: model === 'section' ? 'section' : 'card',
    },
  });

  return (
    <Element {...props} ref={setNodeRef} {...listeners} {...attributes}>
      {children}
    </Element>
  );
}
