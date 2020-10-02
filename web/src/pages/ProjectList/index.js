import React, { useState, useEffect } from 'react';

import PageDefault from '../PageDefault';
import Header from '../../component/Header';
import TableComponent from '../../component/TableComponent';

import api from '../../services/api';

function ProjectList() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    api.get('projects?id_usuario=1')
      .then(response => {
        setProjects(response.data);
      })
  }, [])

  return (
      <PageDefault>

        <Header title="Projetos" />
        <TableComponent listItems={projects} route="projects" />

      </PageDefault>
  );
}

export default ProjectList;