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

function MetricList() {
  const user = localStorage.getItem('user');

  const [metrics, setMetrics] = useState([]);
  const [methods, setMethods] = useState([]);
  const [methodsSelected, setMethodsSelected] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [openDetails, setOpenDetails] = useState(false);
  const [form, setForm] = useState(initialForm);
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
    const metric = await api.get(`metrics/${id}`);
    const {nome, metodos } = metric.data;

    const formToEdit = {
      name: nome
    }

    setMethodsSelected(metodos);
    setForm(formToEdit);
    setIdToEdit(id);
    handleClickOpenDetails();
  }

  const handleClickCancelOpenDetails = () => {
    setForm(initialForm);
    setIdToEdit(0);
    setMethodsSelected([]);
    handleClickOpenDetails();
  }

  const handleOnChangeInput = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value
    })
  }

  const handleChangeSelect = (event) => {
    setMethodsSelected(event.target.value);
  };

  const listMetric = async () => {
    await api.get(`user/${user}/metrics`)
    .then(response => {
      setMetrics(response.data);
    })
  }

  const handleOnSubmit = async () => {
    const data = {
      nome: form.name,
      id_usuario: user,
      metodos: methodsSelected
    }

    if(idToEdit){
      await api.put(`metrics/${idToEdit}`, data);
      setTextAlert("Métrica alterada com sucesso!")
    } else {
      await api.post('metrics', data);
      setTextAlert("Métrica salva com sucesso!")
    }

    listMetric();

    handleOpenAlert(true);
    handleClickOnCancel(); 
    handleClickOpenModal();
  };

  async function handleClickOnButtonDelete(id) {
    await api.delete(`metrics/${id}`);

    listMetric();
    setTextAlert("Métrica excluida com sucesso!" )
    handleOpenAlert(true);
  }

  async function handleClickOnButtonEdit(id) {
    const metric = await api.get(`metrics/${id}`);
    const {nome, metodos } = metric.data;

    const formToEdit = {
      name: nome
    }

    const idMetodos = metodos.map(item => item.id);

    setMethodsSelected(idMetodos);
    setForm(formToEdit);
    setIdToEdit(id);
    handleClickOpenModal();
  }

  
  function handleClickOnCancel() {
    setForm(initialForm);
    setIdToEdit(0);
    setMethodsSelected([]);
    handleClickOpenModal();
  }

  const handleOpenAlert = (open) => {
    setOpenAlert(open);
  }

  useEffect(() => {
    const user = localStorage.getItem('user');

    api.get(`user/${user}/metrics`)
      .then(response => {
        setMetrics(response.data);
      });

    api.get(`user/${user}/methods`)
      .then(response => {
        setMethods(response.data);
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
        items={methods}
        itemsSelected={methodsSelected}
        handleClickOpenModal={handleClickOpenModal}
        handleOnChangeInput={handleOnChangeInput}
        handleChangeSelect={handleChangeSelect}
        handleOnSubmit={handleOnSubmit}
        title={"Adicionar métricas de Usabilidade"}
        titleSelectLabel={"Métodos de Avaliação de Usabilidade"}
        handleClickOnCancel={handleClickOnCancel}
      />

      <ModalDetails
        open={openDetails}
        handleClickOpenModal={handleClickOpenDetails}
        handleClickOnCancel={handleClickCancelOpenDetails}
        items={methodsSelected}
        form={form}
        titleItems={"Métodos de Avaliação de Usabilidade"}
      />

      <Header
        title="Métricas de Usabilidade"
        onClick={handleClickOpenModal}
        nameButton="Adicionar"
        startIcon
      />

      <TableComponent
        listItems={metrics}
        route="metrics"
        handleClickOnButtonDelete={handleClickOnButtonDelete}
        handleClickOnButtonEdit={handleClickOnButtonEdit}
        handleClickOnButtonView={handleClickOnButtonView}
      />

    </PageDefault>
  );
}

export default MetricList;