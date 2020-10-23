import React, { useState, useEffect } from 'react';

import PageDefault from '../PageDefault';
import Header from '../../component/Header';
import TableComponent from '../../component/TableComponent';
import FormModal from '../../component/FormModal';

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
  const [form, setForm] = useState(initialForm);
  const [idToEdit, setIdToEdit] = useState(0);

  const handleClickOpenModal = () => {
    setOpenModal(!openModal);
  };

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
    } else {
      await api.post('metrics', data);
    }

    listMetric();

    handleClickOnCancel(); 
    handleClickOpenModal();
  };

  async function handleClickOnButtonDelete(id) {
    await api.delete(`metrics/${id}`);

    listMetric();
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

      <Header
        title="Métricas de Usabilidade"
        handleClickOnButtonAdd={handleClickOpenModal}
      />

      <TableComponent
        listItems={metrics}
        route="metrics"
        handleClickOnButtonDelete={handleClickOnButtonDelete}
        handleClickOnButtonEdit={handleClickOnButtonEdit}
      />

    </PageDefault>
  );
}

export default MetricList;