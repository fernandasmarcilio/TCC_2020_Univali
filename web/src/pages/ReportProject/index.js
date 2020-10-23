import React, { useState, useEffect } from 'react';

import api from '../../services/api';

import PageDefault from '../PageDefault';
import Header from '../../component/Header';
import Charts from '../../component/Charts';

import Button from '@material-ui/core/Button';

import produce from 'immer';

import { Paper, Typography } from '@material-ui/core';
import { Check, Close, PlaylistAddCheck } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';

import { PDFDownloadLink } from '@react-pdf/renderer'
import ReportDocument from '../../component/ReportPDF/Document';

import { Link } from 'react-router-dom';

const useStyle = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  card: {
    margin: theme.spacing(1, 0),
    height: theme.spacing(20),
    width: theme.spacing(40),
    padding: theme.spacing(2),
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: '60px',
    height: '60px',
    borderRadius: '50%',
    padding: theme.spacing(1),
    marginRight: theme.spacing(2),
  },
  text: {
    display: 'flex',
    flexDirection: 'column'
  },
  buttonContainer: {
    display: 'flex',
    margin: theme.spacing(1, 0),
    justifyContent: 'flex-end',
  },
  button: {
    padding: theme.spacing(2),
    fontSize: theme.spacing(1.5),
  }
}));

const defaultData = [
  {title: 'Requisitos aplicados', value: 0, bgColor: 'rgba(95, 194, 187, 0.2)', color: 'rgba(95, 194, 187, 1)', icon: <Check />},
  {title: 'Requisitos em desenvolvimento', value: 0, bgColor: 'rgba(255, 206, 86, 0.2)', color: 'rgba(255, 206, 86, 1)', icon: <Close />},
  {title: 'Requisitos em teste', value: 0, bgColor: 'rgba(225, 105, 101, 0.2)', color: 'rgba(225, 105, 101, 1)', icon: <PlaylistAddCheck />},
]



function ReportProject({ match }) {
  const classes = useStyle();

  const [id, setId] = useState(match.params.id);
  const [lists, setLists] = useState([]);
  const [data, setData ] = useState(defaultData);

  useEffect(() => {
    api.get(`projects/status/${id}`)
    .then(response => {
      const res = response.data;
      setLists(res);

      let arrayValue = res.map(item => item.cards.length);
      console.log(arrayValue);
      setData(produce(data, draft => {
        draft[0].value = arrayValue[4];
        draft[1].value = arrayValue[0] + arrayValue[1];
        draft[2].value = arrayValue[2] + arrayValue[3];

      }));
    }) 
  }, [id]);

  const icons = (item) => [
    <Check 
    className={classes.icon} 
    style={{
      backgroundColor: item.bgColor,
      color: item.color
    }}/>,
    <Close 
    className={classes.icon} 
    style={{
      backgroundColor: item.bgColor,
      color: item.color
    }}/>,
    <PlaylistAddCheck 
    className={classes.icon} 
    style={{
      backgroundColor: item.bgColor,
      color: item.color
    }}/>
  ]

  return (
    <PageDefault>
      <Header title={"Relatório do projeto: "}/>
      <div className={classes.root}>
        {data.map((item, index) => (
          <Paper key={index} className={classes.card} >
            {icons(item)[index]}
            <div className={classes.text}>
              <Typography variant="h3" >
                {item.value}
              </Typography>

              <Typography variant="h6" >
                {item.title}
              </Typography>
            </div>
          </Paper>
        ))}

      </div>
      <div className={classes.buttonContainer}>
        <Link 
          to={ `/projects/${id}/report/pdf`}
        >
          <Button variant="contained" color="primary" className={classes.button}>
            Baixar relatório do Projeto
          </Button>
        </Link>
      </div>
    </PageDefault>
  );
}

export default ReportProject;