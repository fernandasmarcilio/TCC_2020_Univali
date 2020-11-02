import React, { useState, useEffect } from 'react';

import PageDefault from '../PageDefault';
import Header from '../../component/Header';
import TableComponent from '../../component/TableComponent';
import FormModal from '../../component/FormModal';
import ModalDetails from '../../component/ModalDetails';
import AlertComponent from '../../component/AlertComponent';

import api from '../../services/api';

const initialForm = {
  name: ""
}

function RequirementList() {
  const user = localStorage.getItem('user');

  const [ requirements, setRequirements ] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [metrics, setMetrics] = useState([]);
  const [metricsSelected, setMetricsSelected] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [openDetails, setOpenDetails] = useState(false);
  const [idToEdit, setIdToEdit] = useState(0);
  const [openAlert, setOpenAlert] = useState(false);
  const [textAlert, setTextAlert] = useState("");

  const handleClickOpenModal = () => {
    setOpenModal(!openModal);
  };

  const handleClickOpenDetails = () => {
    setOpenDetails(!openDetails);
  };

  const handleClickOnButtonView = async (id) => {
    const requirement = await api.get(`requirements/${id}`);
    const {nome, metricas } = requirement.data;

    const formToEdit = {
      name: nome
    }

    setMetricsSelected(metricas);
    setForm(formToEdit);
    setIdToEdit(id);
    handleClickOpenDetails();
  }

  const handleOnChangeInput = (e) => {
    const { name, value } = e.target;
    setForm({
        ...form,
        [name]: value
    })
  }

  const listRequirement = async () => {
    api.get(`user/${user}/requirements`)
    .then(response => {
      setRequirements(response.data);
    })
  }

  const handleChangeSelect = (event) => {
    setMetricsSelected(event.target.value);
  };

  const handleOpenAlert = (open) => {
    setOpenAlert(open);
  }

  const handleOnSubmit = async () => {
    const data = {
      nome: form.name,
      id_usuario: user,
      metricas: metricsSelected
  }

    if(idToEdit){
      await api.put(`requirements/${idToEdit}`, data);
      setTextAlert("Requisito alterado com sucesso!")
    } else {
      await api.post('requirements', data);
      setTextAlert("Requisito salvo com sucesso!")
    }

    listRequirement();

    handleOpenAlert(true);
    
    handleClickOnCancel() ;
    handleClickOpenModal();
  };

  async function handleClickOnButtonDelete(id) {
    await api.delete(`requirements/${id}`);
    setTextAlert("Requisito excluido com sucesso!")
    handleOpenAlert(true);
    listRequirement();
  }

  async function handleClickOnButtonEdit(id) {
    const requirement = await api.get(`requirements/${id}`);
    const {nome, metricas } = requirement.data;

    const formToEdit = {
      name: nome
    }

    const idMetricas = metricas.map(item => item.id);

    setMetricsSelected(idMetricas);
    setForm(formToEdit);
    setIdToEdit(id);
    handleClickOpenModal();
  }

  function handleClickOnCancel() {
    setForm(initialForm);
    setIdToEdit(0);
    setMetricsSelected([]);
    handleClickOpenModal();
  }

  const handleClickCancelOpenDetails = () => {
    setForm(initialForm);
    setIdToEdit(0);
    setMetricsSelected([]);
    handleClickOpenDetails();
  }


  useEffect(() => {
    const user = localStorage.getItem('user');
    
    api.get(`user/${user}/requirements`)
    .then(response => {
      setRequirements(response.data);
    })

    api.get(`user/${user}/metrics`)
      .then(response => {

        setMetrics(response.data);
    });
  
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
        form={form}
        haveInputSelect={true}
        items={metrics}
        itemsSelected={metricsSelected}
        handleClickOpenModal={handleClickOpenModal}
        handleOnChangeInput={handleOnChangeInput}
        handleChangeSelect={handleChangeSelect}
        handleOnSubmit={handleOnSubmit}
        title={"Adicionar requisitos de usabilidade"}
        titleSelectLabel={"Métricas"}
        handleClickOnCancel={handleClickOnCancel}
      />

      <ModalDetails
        open={openDetails}
        handleClickOpenModal={handleClickOpenDetails}
        handleClickOnCancel={handleClickCancelOpenDetails}
        items={metricsSelected}
        form={form}
        titleItems={"Métricas de usabilidade"}
      />

      <Header 
        title="Requisitos de Usabilidade"
        onClick={handleClickOpenModal}
        nameButton="Adicionar"
        startIcon
      />
      <TableComponent 
        listItems={requirements} 
        route="requirements"
        handleClickOnButtonDelete={handleClickOnButtonDelete}  
        handleClickOnButtonEdit={handleClickOnButtonEdit}
        handleClickOnButtonView={handleClickOnButtonView}
      />

    </PageDefault>
  );
}

export default RequirementList;