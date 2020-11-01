import React from 'react';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import Actions from '../Actions';

function TableComponent({
    listItems, 
    routeView, 
    handleClickOnButtonDelete, 
    handleClickOnButtonEdit,
    handleClickOnButtonView
}) {
  return (
        <TableContainer component={Paper}>
        <Table aria-label="simple table">
        <TableHead>
            <TableRow>
            <TableCell>Nome</TableCell>
            <TableCell align="right">Ações</TableCell>
            </TableRow>
        </TableHead>
        <TableBody>
            {listItems && listItems.map((item) => (
                <TableRow hover key={item.id}>
                    <TableCell>{item.nome}</TableCell>
                    <TableCell align="right">
                        <Actions 
                            routeView={routeView} 
                            idItem={item.id}
                            handleClickOnButtonDelete={handleClickOnButtonDelete}
                            handleClickOnButtonEdit={handleClickOnButtonEdit}
                            handleClickOnButtonView={handleClickOnButtonView}
                        />
                    </TableCell>
                </TableRow>
            ))}
        </TableBody>
        </Table>
    </TableContainer>
  );
}

export default TableComponent;