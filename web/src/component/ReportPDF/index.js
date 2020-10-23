import React, {useState, useEffect } from 'react';
import { PDFViewer } from '@react-pdf/renderer';

import api from '../../services/api';
import ReportDocument from './Document';

import './styles.css';

function ReportPDF({ match }) {
  const [user, setUser] = useState(localStorage.getItem('user'));
  const [id, setId] = useState(match.params.id);

  const [project, setProject] = useState({});
  const [lists, setLists] = useState([]);

  useEffect(() => {
    api.get(`projects?id_usuario=${user}&id_projeto=${id}`)
      .then(response => {
        const data = response.data[0];
        setProject(data);
    })

    api.get(`projects/status/${id}`)
    .then(response => {
      setLists(response.data);
    }) 
  }, [id, user]);

  return (
    <PDFViewer className='pdf-container'>
      <ReportDocument project={project} requirements={lists}/>
    </PDFViewer>
  );
};

export default ReportPDF;