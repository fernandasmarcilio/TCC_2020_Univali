import React from 'react';

import { Text, View, StyleSheet } from '@react-pdf/renderer';
import List, { Item } from './List';

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },
  title: {
    fontSize: 14,
    marginBottom: 10,
  },
  skills: {
    fontSize: 10,
    marginBottom: 10,
  },
});

const Header = ({title, requirements}) => (
    <View style={styles.container}>
        <Text style={styles.title}>{`Requisitos '${title}'`}</Text>
        <List>
        {requirements.map((requirement, index) => (
            <Item key={index}>{requirement.nome}</Item>
          ))}
        </List>
    </View>
    );

export default Header;