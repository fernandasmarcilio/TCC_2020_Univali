import React from 'react';

import { Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    paddingBottom: '10px',
    margin: '20px 0',
    width: '94%',
    borderBottomWidth: 2,
    borderBottomColor: '#112131',
    borderBottomStyle: 'solid',
  },
  detailColumn: {
    textTransform: 'uppercase',
  },
  name: {
    fontSize: 20,
  },
  subtitle: {
    marginTop: '5px',
    fontSize: 10,
  }
});

const Header = ({ title, subtitle }) => (
  <View style={styles.container} fixed>
    <View style={styles.detailColumn}>
      <Text style={styles.name}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
    </View>
  </View>
);

export default Header;