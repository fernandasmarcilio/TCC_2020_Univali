import React, { useState, useEffect } from 'react';

import PageDefault from '../PageDefault';
import Header from '../../component/Header';
import TableComponent from '../../component/TableComponent';
import Modal from './Modal';

import api from '../../services/api';

import { Button } from '@material-ui/core';

function RequirementList() {
  const [ requirements, setRequirements ] = useState([]);
  const [form, setForm] = useState({
    name: "",
    description: ""
  });

  const [metrics, setMetrics] = useState([]);
  const [metricsSelected, setMetricsSelected] = useState([]);
  const [openModal, setOpenModal] = useState(false);

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
    setMetricsSelected(event.target.value);
  };

  const handleOnSubmit = async () => {
    const data = {
      nome: form.name,
      descricao: form.description
    }

    const response = await api.post('requirements', { data });
    const { id } = response.data;

    metricsSelected.forEach(async (metric) => {
      console.log(id, metric);
      await api.post('requirementmetrics', { 
        id_requisito: id,
        id_metrica: metric
      });
    });

    handleClickOpenModal();
  };


  useEffect(() => {
    api.get('requirements')
      .then(response => {
        setRequirements(response.data);
      })

    api.get('metrics')
      .then(response => {
        setMetrics(response.data);
    });
  
  }, [])

  return (
    <PageDefault>

      <Modal 
        open={openModal}
        form={form}
        metrics={metrics}
        metricsSelected={metricsSelected}
        handleClickOpenModal={handleClickOpenModal}
        handleOnChangeInput={handleOnChangeInput}
        handleChangeSelect={handleChangeSelect}
        handleOnSubmit={handleOnSubmit}
      />
      <Header title="Requisitos de Usabilidade">
        <Button
          variant="contained"
          color="primary"
          onClick={handleClickOpenModal}
        >
          Adicionar
        </Button>
      </Header>
      <TableComponent listItems={requirements} route="requirements" />

    </PageDefault>
  );
}

export default RequirementList;