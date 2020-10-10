import React, { useState, useEffect } from 'react';

import PageDefault from '../PageDefault';
import Header from '../../component/Header';
import TableComponent from '../../component/TableComponent';
import Modal from '../../component/Modal';

import api from '../../services/api';

function MetricList() {
  const [metrics, setMetrics] = useState([]);
  const [methods, setMethods] = useState([]);
  const [methodsSelected, setMethodsSelected] = useState([]);
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
  }

  const handleChangeSelect = (event) => {
    setMethodsSelected(event.target.value);
  };

  const handleOnSubmit = async () => {
    const data = {
      nome: form.name,
      descricao: form.description
    }

    const response = await api.post('metrics', { data });
    const { id } = response.data;

    await api.get('metrics')
      .then(response => {
        setMetrics(response.data);
      })

    methodsSelected.forEach(async (method) => {
      console.log(id, method);
      await api.post('metricmethods', {
        id_metrica: id,
        id_metodo: method
      });
    })

    handleClickOpenModal();
  };


  useEffect(() => {
    api.get('metrics')
      .then(response => {
        setMetrics(response.data);
      });

    api.get('methods')
      .then(response => {
        setMethods(response.data);
      });
  }, [])

  return (
    <PageDefault>

      <Modal
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
      />

      <Header
        title="Métricas de Usabilidade"
        handleClickOnButtonAdd={handleClickOpenModal}
      />

      <TableComponent listItems={metrics} route="metrics" />

    </PageDefault>
  );
}

export default MetricList;