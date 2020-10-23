import React from 'react';

import { Doughnut } from 'react-chartjs-2';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

const useStyle = makeStyles((theme) => ({
  root: {
    display: 'flex',

  },
  paperChart: {
    margin: theme.spacing(1),
    width: theme.spacing(50),
    padding: theme.spacing(1)
  }
}));

const backgroundColor = [
  '#E16965',
  '#7EC1EE',
  '#B67AEB',
  '#FFCE56',
  '#5FC2BB',
];

const hoverBackgroundColor= [
  '#C75D5A',
  '#70ACD4',
  '#A26DD1',
  '#E6BB4E',
  '#52A8A3',
  ]

function Charts({ data }) {
  const classes = useStyle();

  const labels = data.map(item => item.title)
  const datasets = data.map(item => item.cards.length);

  let total = 0;
  let porcentagem = [];
  if(datasets.length) {
    total = datasets.reduce((acc, value) => acc + value);
    porcentagem = datasets.map(item => (100 * item) / total)
  }

  const dataToChart = {
    labels,
    datasets: [{
      data: datasets,
      backgroundColor,
      hoverBackgroundColor
    }]
  }

  return (
    <div className={classes.root}>
      <Paper className={classes.paperChart}>
        <Doughnut 
          data={dataToChart} 
        />
      </Paper>
    </div>
  );
}

export default Charts;