import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

import Header from './Header';

const styles = StyleSheet.create({
  page: {
    display: 'flex',
    flexDirection: 'column',
    margin: '20px',
  },
  pageNumbers: {
    position: 'absolute',
    top: 20,
    left: 0,
    right: 0,
    textAlign: 'center'
  },
  lists: {
    width: '90%',
    margin: '10px'
  },
  itemContent: {
    margin: '5px 0',
    fontSize: 10
  }
});

function ReportDocument({ project, requirements }) {
  const requirementFiltered = requirements.filter(requirement => requirement.cards.length > 0);

  return (
    <Document >
      {requirementFiltered.map(requirement => (
        <Page key={requirement.title} style={styles.page} size="A4" wrap>
          <Header title={project.nome} subtitle={project.descricao} />
          <View>
            <Text>{`Requisitos '${requirement.title}'`}</Text>
            {
              requirement.cards.map(card => (
                <Text key={card.nome} style={styles.itemContent}>{`• ${card.nome}`}</Text>
              ))
            }
          </View>
      </Page>
      ))}
    </Document>
  )
};

export default ReportDocument;