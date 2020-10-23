import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

import Header from './Header';
import Content from './Content';

const styles = StyleSheet.create({
  page: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#E4E4E4',
    padding: '35px 20px',
  },
  container: {
    marginTop: '20px',
  }
});

const ReportDocument = ({ project, requirements }) => (
  <Document>
    {console.log(project, requirements)}
    <Page size="A4" style={styles.page}>
      <Header title={project.nome} subtitle={project.descricao}/>
      <View style={styles.container}>
        {
          requirements
          .filter(requirement => requirement.cards.length > 0)
          .map((requirement) => (
            <Content key={requirement.title} title={requirement.title} requirements={requirement.cards} />
          ))
        }
      </View>
    </Page>
  </Document>
);

export default ReportDocument;