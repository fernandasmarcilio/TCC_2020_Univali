import React, { useState, useEffect } from 'react';

import PageDefault from '../PageDefault';
import Header from '../../component/Header';
import TableComponent from '../../component/TableComponent';

import api from '../../services/api';

function MetricList() {

  const [ metrics, setMetrics ] = useState([]);

  useEffect(() => {
    api.get('metrics')
      .then(response => {
        setMetrics(response.data);
      })
  }, [])

  return (
    <PageDefault>
      
      <Header title="Métricas de Usabilidade" />
      <TableComponent listItems={metrics} route="metrics" />

    </PageDefault>
  );
}

export default MetricList;