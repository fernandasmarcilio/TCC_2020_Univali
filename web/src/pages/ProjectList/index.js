import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import PageDefault from '../PageDefault';
import Header from '../../component/Header';
import TableComponent from '../../component/TableComponent';
import FormModal from '../../component/FormModal';
import AlertComponent from '../../component/AlertComponent';

import api from '../../services/api';

const initialForm = {
  name: "",
  description: ""
}

function ProjectList() {
  const history = useHistory();
  const user = localStorage.getItem('user');

  const [projects, setProjects] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [form, setForm] = useState(initialForm);
  const [idToEdit, setIdToEdit] = useState(0);
  const [openAlert, setOpenAlert] = useState(false);
  const [textAlert, setTextAlert] = useState("");
  
  const handleClickOpenModal = () => {
    setOpenModal(!openModal);
  };

  const handleOnChangeInput = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value
    })
  };

  async function handleOnSubmit() {
    const data = {
      nome: form.name,
      descricao: form.description,
    }

    if(idToEdit){
      await api.put(`projects/${idToEdit}`, data);
      setTextAlert("Projeto alterado com sucesso!");
    } else {
      await api.post(`projects?id_usuario=${user}`, data);
      setTextAlert("Projeto salvo com sucesso!");
    }

    await api.get(`projects?id_usuario=${user}`)
      .then(response => {
        setProjects(response.data);
      })

    handleOpenAlert(true);
    handleClickOnCancel(); 
    handleClickOpenModal();
  };

  async function handleClickOnButtonDelete(id) {
    const user = localStorage.getItem('user')

    await api.delete(`projects/${id}`);
    
    api.get(`projects?id_usuario=${user}`)
    .then(response => {
      setProjects(response.data);
    })

    setTextAlert("Projeto excluido com sucesso!");
    handleOpenAlert(true);
  }

  async function handleClickOnButtonEdit(id) {
    const project = await api.get(`projects/${id}`);
    const {nome, descricao } = project.data;

    const formToEdit = {
      name: nome,
      description: descricao
    }

    setForm(formToEdit);
    setIdToEdit(id);
    handleClickOpenModal();
  }

  const handleClickOnButtonView = (id) => {
    history.push(`/projects/${id}`);
  }

  function handleClickOnCancel() {
    setForm(initialForm);
    setIdToEdit(0);
    handleClickOpenModal();
  }

  const handleOpenAlert = (open) => {
    setOpenAlert(open);
  }

  useEffect(() => {
    const user = localStorage.getItem('user')
    api.get(`projects?id_usuario=${user}`)
      .then(response => {
        setProjects(response.data);
      })
  }, [])

  return (
    <PageDefault>
      <AlertComponent 
        open={openAlert}
        handleOpenAlertSucess={handleOpenAlert}
        text={textAlert}
        type="success"
      />

      <FormModal 
        open={openModal} 
        handleClickOpenModal={handleClickOpenModal}
        handleOnChangeInput={handleOnChangeInput} 
        form={form} 
        handleOnSubmit={handleOnSubmit}
        title={"Adicionar projeto"}
        haveInputSelect={false}
        handleClickOnCancel={handleClickOnCancel}
        hasDescription
      />

      <Header 
        title="Projetos"
        onClick={handleClickOpenModal}
        nameButton="Adicionar"  
        startIcon
      />

      
      <TableComponent 
        listItems={projects} 
        routeView="projects"
        handleClickOnButtonDelete={handleClickOnButtonDelete}
        handleClickOnButtonEdit={handleClickOnButtonEdit}
        handleClickOnButtonView={handleClickOnButtonView}
      />

    </PageDefault>
  );
}

export default ProjectList;