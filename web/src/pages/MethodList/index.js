import React, { useState, useEffect } from 'react';

import PageDefault from '../PageDefault';
import Header from '../../component/Header';
import TableComponent from '../../component/TableComponent';

import api from '../../services/api';

function MethodList() {
  const [ methods, setMethods ] = useState([]);

  useEffect(() => {
    api.get('methods')
      .then(response => {
        setMethods(response.data);
      })
  }, [])

  return (
    <PageDefault>

      <Header title="Métodos de Usabilidade" />
      <TableComponent listItems={methods} route="methods"/>

    </PageDefault>
  );
}

export default MethodList;