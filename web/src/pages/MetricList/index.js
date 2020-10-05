import React, { useState, useEffect } from 'react';

import PageDefault from '../PageDefault';
import Header from '../../component/Header';
import TableComponent from '../../component/TableComponent';

import api from '../../services/api';
import Modal from './Modal';

import { Button } from '@material-ui/core';

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

    await api.get('metrics')
      .then(response => {
          setMetrics(response.data);
      })

    const { id } = response.data;

    methodsSelected.forEach((method) => {
      console.log(id, method);
      // const response = await api.post('metricsMethods', { 
      //   id_metric: id,
      //   id_method: method
      // });
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
        methods={methods}
        methodsSelected={methodsSelected}
        handleClickOpenModal={handleClickOpenModal}
        handleOnChangeInput={handleOnChangeInput}
        handleChangeSelect={handleChangeSelect}
        handleOnSubmit={handleOnSubmit}
      />
      <Header title="Métricas de Usabilidade">
        <Button
          variant="contained"
          color="primary"
          onClick={handleClickOpenModal}
        >
          Adicionar
                </Button>
      </Header>
      <TableComponent listItems={metrics} route="metrics" />

    </PageDefault>
  );
}

export default MetricList;