import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";

import { DragDropContext } from 'react-beautiful-dnd';

import PageDefault from '../PageDefault';
import Header from '../../component/Header';

import api from '../../services/api';

import Board from '../../component/Board';
import Modal from './Modal';
import TreeNav from '../../component/TreeNav';


import { makeStyles } from '@material-ui/core/styles';

import produce from 'immer';

const useStyle = makeStyles((theme) => ({
  boardContainer: {
    display: 'flex',
  },
  buttonContainer: {
    display: 'flex',
    margin: theme.spacing(1, 0),
    justifyContent: 'flex-end'
  },
  button: {
    padding: theme.spacing(2),
    fontSize: theme.spacing(1.5),
  }
}));


function Project({ match }) {
  const classes = useStyle();
  const history = useHistory();

  const [id, setId] = useState(match.params.id)
  const [user, setUser] = useState(localStorage.getItem('user'));

  const [nav, setNav] = useState({name: "", tree: []});

  const [openModal, setOpenModal] = useState(false);
  const [checked, setChecked] = useState([]);
  const [checkedAll, setCheckedAll] = useState(false);
  const [requirements, setRequirements] = useState([]);
  const [requirementsWithStatus, setRequirementsWithStatus] = useState([]);
  const [requirementsWithoutStatus, setRequirementsWithoutStatus] = useState([]);

  const [project, setProject] = useState({});
  const [lists, setLists] = useState([]);

  const addRequirementsWithoutStatus = () => {
    let withoutStatus = [];

    if (requirementsWithStatus.length !== 0) {
      withoutStatus = requirements.filter(e => {
        return requirementsWithStatus.find(el => el.id === e.id) ? '' : e;
      });
    } else {
      withoutStatus = requirements;
    }

    setRequirementsWithoutStatus(withoutStatus);
  }

  const handleClickOpenModal = () => {
    addRequirementsWithoutStatus();
    setOpenModal(!openModal);
  };

  const handleToggle = (value) => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    if (newChecked.length === requirementsWithoutStatus.length) {
      setCheckedAll(true);
    } else {
      setCheckedAll(false);
    }

    setChecked(newChecked);
  }

  const handleToggleAll = () => {
    const newCheckAll = !checkedAll;
    setCheckedAll(newCheckAll);
    if (newCheckAll) {
      const newChecked = requirementsWithoutStatus.map((requirement) => requirement.id);
      setChecked(newChecked);
    } else {
      setChecked([]);
    }
  }

  const handleClickAddRequirement = async () => {
    console.log(checked);
    const data = {
      requirements: checked
    }

    await api.post(`projects/${id}/status`, data);

    api.get(`projects/status/${id}`)
      .then(response => {
        setLists(response.data)
      })

    api.get(`projects/${id}/status`)
      .then(response => {
        setRequirementsWithStatus(response.data);

        addRequirementsWithoutStatus();
      })

    setChecked([]);

    handleClickOpenModal();
  }

  const onDragEnd = (result) => {
    const { destination, source } = result;
    if (!destination) {
      return;
    }
    moveList(source.droppableId, destination.droppableId, source.index, destination.index)
  }

  function moveList(fromList, toList, from, to) {
    const idStatus = lists[fromList].cards[from].id_status;

    setLists(produce(lists, draft => {
      const dragged = draft[fromList].cards[from];

      draft[fromList].cards.splice(from, 1);
      draft[toList].cards.splice(to, 0, dragged)
    }));

    const data = {
      status: toList,
      posicao: to
    }

    api.put(`projects/${id}/status/${idStatus}`, data)
  }

  const handleClickButton = () => {
    history.push(`/projects/${id}/report`);
  }

  useEffect(() => {
    api.get(`projects?id_usuario=${user}&id_projeto=${id}`)
      .then(response => {
        const data = response.data[0];
        setProject(data);
        setNav({
          name: data.nome, 
          tree: [
            {name: "projeto", to: "/projects"}
          ]
        })
      })

    api.get(`user/${user}/requirements`)
      .then(response => {
        setRequirements(response.data);
      })

    api.get(`projects/status/${id}`)
      .then(response => {
        setLists(response.data)
      })

    api.get(`projects/${id}/status`)
      .then(response => {
        setRequirementsWithStatus(response.data);
      })

  }, [id, user])

  return (
    <PageDefault>
      <Modal
        open={openModal}
        handleClickOpenModal={handleClickOpenModal}
        title="Adicionar requisitos"
        requirements={requirementsWithoutStatus}
        checked={checked}
        checkedAll={checkedAll}
        handleToggle={handleToggle}
        handleToggleAll={handleToggleAll}
        handleClickAddRequirement={handleClickAddRequirement}
      />

      <TreeNav nav={nav} />

      <Header 
        title={project.nome} 
        onClick={handleClickButton}
        nameButton="Relatório do Projeto"  
      />
      <DragDropContext onDragEnd={onDragEnd}>
        <div className={classes.boardContainer}>
          {lists && lists.map((list) => (
            <Board key={list.id} data={list} handleClickOpenModal={handleClickOpenModal} />
          ))}
        </div>
      </DragDropContext>
    </PageDefault>
  );
}

export default Project;