import React, { useState, useEffect } from 'react';

import PageDefault from '../PageDefault';
import Header from '../../component/Header';
import TableComponent from '../../component/TableComponent';
import Modal from '../../component/Modal';

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
    };

    const handleOnChangeInput = (e) => {
        const { name, value } = e.target;
        setForm({
            ...form,
            [name]: value
        })
    };

    const handleOnSubmit = async () => {
        const data = {
            nome: form.name,
            descricao: form.description
        }

        await api.post('methods', { data });

        await api.get('methods')
            .then(response => {
                setMethods(response.data);
            })

        handleClickOpenModal();
    };

    function handleClickOnButtonDelete(id) {
        
    }

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
                handleOnSubmit={handleOnSubmit}
                title={"Adicionar método de avaliação de usabilidade"}
                haveInputSelect={false}
            />

            <Header 
                title="Métodos de Avaliação de Usabilidade"
                handleClickOnButtonAdd={handleClickOpenModal}
            />
            
            <TableComponent 
                listItems={methods} 
                route="methods"
                handleClickOnButtonDelete={handleClickOnButtonDelete}
            />

        </PageDefault>
    );
}

export default MethodList;