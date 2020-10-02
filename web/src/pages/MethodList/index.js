import React, { useState, useEffect } from 'react';

import PageDefault from '../PageDefault';
import Header from '../../component/Header';
import TableComponent from '../../component/TableComponent';
import Modal from './Modal';
import { Button } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';

import api from '../../services/api';

function MethodList() {
    const [methods, setMethods] = useState([]);
    const [openModal, setOpenModal] = useState(false);

    const [form, setForm] = useState({
        name: "",
        description: ""
    });

    const handleClickOpenModal = () => {
        setOpenModal(!openModal);
        console.log(form);

    };

    const handleOnChangeInput = (e) => {
        const { name, value } = e.target;
        setForm({
            ...form,
            [name]: value
        })
    };

    const handleOnSubmit = () => {
        api.post('methods', { form })
        .then(response => {
            console.log(response);
        })
    };

    useEffect(() => {
        api.get('methods')
            .then(response => {
                setMethods(response.data);
            })
    }, [])

    return (
        <PageDefault>
            <Modal
                open={openModal}
                handleClickOpenModal={handleClickOpenModal}
                handleOnChangeInput={handleOnChangeInput}
                form={form}
            />

            <Header title="Métodos de Usabilidade">
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleClickOpenModal}
                >
                    Adicionar
            </Button>
            </Header>
            <TableComponent listItems={methods} route="methods" />

        </PageDefault>
    );
}

export default MethodList;