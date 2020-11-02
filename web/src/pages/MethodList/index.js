import React, { useState, useEffect } from 'react';

import PageDefault from '../PageDefault';
import Header from '../../component/Header';
import TableComponent from '../../component/TableComponent';
import FormModal from '../../component/FormModal';
import ModalDetails from '../../component/ModalDetails';
import AlertComponent from '../../component/AlertComponent';

import api from '../../services/api';

const initialForm = {
    name: "",
    description: ""
}

function MethodList() {
    const user = localStorage.getItem('user');

    const [methods, setMethods] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [openDetails, setOpenDetails] = useState(false);
    const [form, setForm] = useState(initialForm);
    const [idToEdit, setIdToEdit] = useState(0);
    const [openAlert, setOpenAlert] = useState(false);
    const [textAlert, setTextAlert] = useState("");

    const handleClickOpenModal = () => {
        setOpenModal(!openModal);
    };

    const handleClickOpenDetails = () => {
        setOpenDetails(!openDetails);
    };

    const handleClickOnButtonView = async (id) => {
        const method = await api.get(`methods/${id}`);
        const { nome, descricao } = method.data;

        const formToEdit = {
            name: nome,
            description: descricao
        }

        setForm(formToEdit);
        setIdToEdit(id);
        handleClickOpenDetails();
    }

    const handleClickCancelOpenDetails = () => {
        setForm(initialForm);
        setIdToEdit(0);
        handleClickOpenDetails();
    }

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

        if (idToEdit) {
            await api.put(`methods/${idToEdit}`, data);
            setTextAlert("Método de Avaliação alterado com sucesso!");
        } else {
            await api.post('methods', data);
            setTextAlert("Método de Avaliação salvo com sucesso!");
        }

        listMethod();
        handleOpenAlert(true);
        handleClickOnCancel();
        handleClickOpenModal();
    };

    async function handleClickOnButtonDelete(id) {
        await api.delete(`methods/${id}`);
        setTextAlert("Método de Avaliação excluido com sucesso!");
        handleOpenAlert(true);
        listMethod();
    }

    async function handleClickOnButtonEdit(id) {
        const method = await api.get(`methods/${id}`);
        const { nome, descricao } = method.data;

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

    const handleOpenAlert = (open) => {
        setOpenAlert(open);
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
            <AlertComponent
                open={openAlert}
                handleOpenAlertSucess={handleOpenAlert}
                text={textAlert}
                type="success"
            />

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

            <ModalDetails
                open={openDetails}
                handleClickOpenModal={handleClickOpenDetails}
                handleClickOnCancel={handleClickCancelOpenDetails}
                form={form}
                titleItems={"Métricas de usabilidade"}
            />

            <Header
                title="Métodos de Avaliação de Usabilidade"
                onClick={handleClickOpenModal}
                nameButton="Adicionar"
                startIcon
            />

            <TableComponent
                listItems={methods}
                route="methods"
                handleClickOnButtonDelete={handleClickOnButtonDelete}
                handleClickOnButtonEdit={handleClickOnButtonEdit}
                handleClickOnButtonView={handleClickOnButtonView}
            />

        </PageDefault>
    );
}

export default MethodList;