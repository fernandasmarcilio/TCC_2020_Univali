import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";

import api from '../../services/api';

import PageDefault from '../PageDefault';
import Header from '../../component/Header';

import TreeNav from '../../component/TreeNav';

import produce from 'immer';

import { Paper, Typography, List, ListItem, ListItemText } from '@material-ui/core';
import { Check, Settings, PlaylistAddCheck } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';

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
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: 'rgba(0, 0, 0, 0.02)',
    }
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
  },
  paperList: {
    marginBottom: theme.spacing(0.5),
  },
  textList: {
    fontSize: 14
  },
  noDataPaper: {
    background: 'rgba(0,0,0,0.05)',
    color: 'rgba(0,0,0,0.7)',
    padding: '40px 20px',
    textAlign: 'center',
    margin: '10px 0',
  }
}));

const defaultData = [
  { id: 0, title: 'Requisitos aplicados', value: 0, bgColor: 'rgba(95, 194, 187, 0.2)', color: 'rgba(95, 194, 187, 1)', icon: <Check />, requirements: [] },
  { id: 1, title: 'Requisitos em desenvolvimento', value: 0, bgColor: 'rgba(129, 95, 184, 0.2)', color: 'rgba(129, 95, 184, 1)', icon: <Settings />, requirements: [] },
  { id: 2, title: 'Requisitos em teste', value: 0, bgColor: 'rgba(255, 206, 86, 0.2)', color: 'rgba(255, 206, 86, 1)', icon: <PlaylistAddCheck />, requirements: [] },
]


function ReportProject({ match }) {
  const classes = useStyle();
  const history = useHistory();

  const [nav, setNav] = useState({name: "", tree: []});

  const id = match.params.id;
  const user = localStorage.getItem('user');

  const [lists, setLists] = useState([]);
  const [data, setData] = useState(defaultData);
  const [idCardClicked, setIdCardClicked] = useState(0);

  useEffect(() => {
    api.get(`projects?id_usuario=${user}&id_projeto=${id}`)
      .then(response => {
        const data = response.data[0];
        setNav({
          name: "relatório", 
          tree: [
            {name: "projeto", to: "/projects"},
            {name: data.nome, to: `/projects/${data.id}`}
          ]
        })
      })

    api.get(`projects/status/${id}`)
      .then(response => {
        const res = response.data;
        const arrayValue = res.map(item => item.cards.length);
        const requirements = res.map(item => item.cards);

        setData(produce(data, draft => {
          draft[0].value = arrayValue[4];
          draft[1].value = arrayValue[0] + arrayValue[1];
          draft[2].value = arrayValue[2] + arrayValue[3];

          draft[0].requirements = requirements[4];
          draft[1].requirements = [...requirements[0], ...requirements[1]];
          draft[2].requirements = [...requirements[2], ...requirements[3]];
        }));

        setLists(requirements[4]);
      })
  }, [id, user]);

  const colorDefault = ['rgba(0, 0, 0, 0.05)', 'rgba(0, 0, 0, 0.54)'];

  const icons = (item) => [
    <Check
      className={classes.icon}
      style={{
        backgroundColor: item.id === idCardClicked ? item.bgColor : colorDefault[0],
        color: item.id === idCardClicked ? item.color : colorDefault[1],
      }} />,
    <Settings
      className={classes.icon}
      style={{
        backgroundColor: item.id === idCardClicked ? item.bgColor : colorDefault[0],
        color: item.id === idCardClicked ? item.color : colorDefault[1],
      }} />,
    <PlaylistAddCheck
      className={classes.icon}
      style={{
        backgroundColor: item.id === idCardClicked ? item.bgColor : colorDefault[0],
        color: item.id === idCardClicked ? item.color : colorDefault[1],
      }} />
  ];

  const handleClickCard = (item) => {
    setLists(item.requirements);
    setIdCardClicked(item.id);
  }

  const handleClickButton = () => {
    history.push(`/projects/${id}/report/pdf`);
  }

  return (
    <PageDefault>
      <TreeNav nav={nav} />
      <Header 
        title="Relatório do projeto" 
        onClick={handleClickButton}
        nameButton="Baixar relatório do Projeto"  
      />
      <div className={classes.root}>
        {data.map((item, index) => (
          <Paper key={index} className={classes.card} onClick={() => handleClickCard(item)}>
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

      <div className={classes.listContainer}>
        <Typography variant="h4">{data[idCardClicked].title}</Typography>
        {lists.length ? (
          <List>
          {lists.map(item => (
              <Paper key={item.nome} className={classes.paperList}>
                <ListItem >
                  <ListItemText>
                    <Typography variant="p" className={classes.textList}>{item.nome}</Typography>
                  </ListItemText>
                </ListItem>
              </Paper>
          ))}
        </List>
        ) : (
          <Paper className={classes.noDataPaper}>
            <Typography variant="p" className={classes.textList}>{ `Não há requisitos :( `}</Typography>
          </Paper>
        ) }
      </div>
    </PageDefault>
  );
}

export default ReportProject;