import React, { useState, useEffect } from 'react';

import { DragDropContext } from 'react-beautiful-dnd'; 

import PageDefault from '../PageDefault';
import Header from '../../component/Header';
import api from '../../services/api';


import Board from '../../component/Board';
import loadLists from '../../services/loadLists';

import { makeStyles } from '@material-ui/core/styles';

import produce from 'immer';

const useStyle = makeStyles((theme) => ({
  boardContainer: {
    display: 'flex',
  },
}));


function Project({ match }) {
  const classes = useStyle();

  const { id } = match.params;

  const [project, setProject] = useState({});
  const [ lists, setLists ] = useState(loadLists);

  useEffect(() => {
    const user = localStorage.getItem('user')
    const { id } = match.params;
    
    api.get(`/projects?id_usuario=${user}&id_projeto=${id}`)
      .then(response => {
        const data = response.data[0];
        setProject(data);
      })
  }, [])

  const onDragEnd = (result) => {
    const { destination, source } = result;

    if(!destination) {
      return;
    }

    moveList(source.droppableId, destination.droppableId, source.index, destination.index)
    
  }

  function moveList(fromList, toList, from, to) {
    setLists(produce(lists, draft => {
      const dragged = draft[fromList].cards[from];
      
      draft[fromList].cards.splice(from, 1);
      draft[toList].cards.splice(to, 0, dragged)
    })) 
  }


  return (
    <PageDefault>
      <Header title={project.nome ? project.nome : `Project ${id}`} />
      <DragDropContext onDragEnd={onDragEnd}>
        <div className={classes.boardContainer}>
          {lists.map((list) => (
            <Board key={list.id} data={list} />
          ))}
        </div>
      </DragDropContext>
    </PageDefault>
  );
}

export default Project;