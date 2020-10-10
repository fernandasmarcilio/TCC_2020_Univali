import React, { useState, useEffect } from 'react';

import PageDefault from '../PageDefault';
import Header from '../../component/Header';
import TableComponent from '../../component/TableComponent';
import Modal from '../../component/Modal';

import api from '../../services/api';

function ProjectList() {
  const user = localStorage.getItem('user');

  const [projects, setProjects] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [form, setForm] = useState({
    name: "",
    description: ""
  });
  
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

  const handleOnSubmit = async () => {
    const data = {
      nome: form.name,
      descricao: form.description,
    }

    await api.post(`projects?id_usuario=${user}`, { data });

    await api.get(`projects?id_usuario=${user}`)
      .then(response => {
        setProjects(response.data);
      })

    handleClickOpenModal();
  };

  useEffect(() => {
    const user = localStorage.getItem('user')
    api.get(`projects?id_usuario=${user}`)
      .then(response => {
        setProjects(response.data);
      })
  }, [])

  return (
    <PageDefault>

      <Modal 
        open={openModal} 
        handleClickOpenModal={handleClickOpenModal}
        handleOnChangeInput={handleOnChangeInput} 
        form={form} 
        handleOnSubmit={handleOnSubmit}
        title={"Adicionar projeto"}
        haveInputSelect={false}
      />

      <Header 
        title="Projetos"
        handleClickOnButtonAdd={handleClickOpenModal}
      />

      <TableComponent listItems={projects} routeView="projects" />

    </PageDefault>
  );
}

export default ProjectList;