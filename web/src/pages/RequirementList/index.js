import React, { useState, useEffect } from 'react';

import PageDefault from '../PageDefault';
import Header from '../../component/Header';
import TableComponent from '../../component/TableComponent';

import api from '../../services/api';

function RequirementList() {
  const [ requirements, setRequirements ] = useState([]);

  useEffect(() => {
    api.get('requirements')
      .then(response => {
        setRequirements(response.data);
      })
  }, [])

  return (
    <PageDefault>

      <Header title="Requisitos de Usabilidade" />
      <TableComponent listItems={requirements} route="requirements" />

    </PageDefault>
  );
}

export default RequirementList;