import React from 'react';

import { Link } from 'react-router-dom';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

function TableComponent({listItems, route}) {
  return (
        <TableContainer component={Paper}>
        <Table aria-label="simple table">
        <TableHead>
            <TableRow>
            <TableCell>Nome</TableCell>
            <TableCell>Descrição</TableCell>
            <TableCell align="right">Ações</TableCell>
            </TableRow>
        </TableHead>
        <TableBody>
            {listItems.map((item) => (
                <TableRow hover key={item.id} component={Link} to={`/${route}/${item.id}`}>
                    <TableCell>{item.nome}</TableCell>
                    <TableCell>{item.descricao}</TableCell>
                    <TableCell align="right">Ações</TableCell>
                </TableRow>
            ))}
        </TableBody>
        </Table>
    </TableContainer>
  );
}

export default TableComponent;