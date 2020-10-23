import React, { useState, useEffect } from 'react';

import PageDefault from '../PageDefault';
import Header from '../../component/Header';
import TableComponent from '../../component/TableComponent';
import FormModal from '../../component/FormModal';

import api from '../../services/api';

const initialForm = {
    name: "",
    description: ""
  }

function MethodList() {
    const user = localStorage.getItem('user');

    const [methods, setMethods] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [form, setForm] = useState(initialForm);
    const [idToEdit, setIdToEdit] = useState(0);

    const handleClickOpenModal = () => {
        setOpenModal(!openModal);
    };

    const handleOnChangeInput = (e) => {
        const { name, value } = e.target;
        setForm({
            ...form,
            [name]: value
        })
    };

    const listMethod = async () => {
        await api.get(`user/${user}/methods`)
        .then(response => {
            setMethods(response.data);
        })
      }

    const handleOnSubmit = async () => {
        const data = {
            nome: form.name,
            descricao: form.description,
            id_usuario: user
        }

        if(idToEdit) {
            await api.put(`methods/${idToEdit}`, data );
        }else {
            await api.post('methods', data );
        }

        listMethod();

        handleClickOnCancel();
        handleClickOpenModal();
    };

    async function handleClickOnButtonDelete(id) {
        await api.delete(`methods/${id}`);
        
        listMethod();
    }

    async function handleClickOnButtonEdit(id) {
        const method = await api.get(`methods/${id}`);
        const {nome, descricao } = method.data;

        const formToEdit = {
          name: nome,
          description: descricao
        }

        setForm(formToEdit);
        setIdToEdit(id);
        handleClickOpenModal();
    }

    function handleClickOnCancel() {
        setForm(initialForm);
        setIdToEdit(0);
        handleClickOpenModal();
    }

    useEffect(() => {
        const user = localStorage.getItem('user');

        api.get(`user/${user}/methods`)
        .then(response => {
            setMethods(response.data);
        })
    }, [])

    return (
        <PageDefault>
            <FormModal
                open={openModal}
                handleClickOpenModal={handleClickOpenModal}
                handleOnChangeInput={handleOnChangeInput}
                form={form}
                handleOnSubmit={handleOnSubmit}
                title={"Adicionar método de avaliação de usabilidade"}
                haveInputSelect={false}
                handleClickOnCancel={handleClickOnCancel}
                hasDescription
            />

            <Header 
                title="Métodos de Avaliação de Usabilidade"
                handleClickOnButtonAdd={handleClickOpenModal}
            />
            
            <TableComponent 
                listItems={methods} 
                route="methods"
                handleClickOnButtonDelete={handleClickOnButtonDelete}
                handleClickOnButtonEdit={handleClickOnButtonEdit}
            />

        </PageDefault>
    );
}

export default MethodList;