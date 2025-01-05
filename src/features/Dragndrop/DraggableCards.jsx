import React from 'react';
import { Grid, Icon } from '@mui/material';
import DraggableCard from './DraggableCard';
import DraggableWrapper from './DraggableWrapper';

// @ items [k,v]
// @ model - is a model of a button: section or field (affect styles)
export default function DraggableCards({ items, ...props }) {
  return (
    <Grid container {...props}>
      {items.map(([k, { cardTitle, model, type, icon }]) => (
        <DraggableWrapper
          element={Grid}
          xs
          item
          key={k}
          id={k}
          model={model}
          type={type}
          sx={{
            marginBottom: '6px',
            '&:nth-of-type(odd)': {
              marginRight: '6px',
            },
          }}>
          <DraggableCard
            disableRipple
            model={model}
            startIcon={props.icon ? <Icon component={props.icon}/> : <Icon component={icon} />}>
            {cardTitle}
          </DraggableCard>
        </DraggableWrapper>
      ))}
    </Grid>
  );
}
