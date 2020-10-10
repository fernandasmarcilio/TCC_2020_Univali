import React from 'react';

import { Paper, CssBaseline } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import TitleListBoard from './TitleListBoard';
import CardBoard from './CardBoard';
import InputCardBoard from './InputCardBoard';

import { Droppable } from 'react-beautiful-dnd';

const useStyle = makeStyles((theme) => ({
  root: {
    width: '300px',
    backgroundColor: '#EBECF0',
    marginLeft: theme.spacing(1),
  },
  cardContainer: {
    height: '400px',
    marginTop: theme.spacing(4),
    maxHeight: '400px',
    overflow: 'overlay',
    '&::-webkit-scrollbar':{
      width: '8px',
    },
    '&::-webkit-scrollbar-track': {
      background: 'rgba(9,30,66,.08)',
      borderRadius: '10px',
    },
    '&::-webkit-scrollbar-thumb': {
      borderRadius: '10px',
      background: 'rgba(9,30,66,.08)',
    },
  }
}))

function Board({ data }) {
  const classes = useStyle();

  return (
    <Paper className={classes.root} >
      <CssBaseline />
      
      <TitleListBoard title={data.title} creatable={data.creatable} />

      <Droppable droppableId={`${data.id}`}>
        {(provided) => (
          <div 
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={classes.cardContainer}
          >
            {data.cards.map((card, index) => (
              <CardBoard key={card.id} data={card} index={index} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>

      { data.creatable &&
        <InputCardBoard />
      }
    </Paper>
  );
}

export default Board;