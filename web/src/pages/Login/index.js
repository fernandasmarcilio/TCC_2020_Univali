import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import './styles.css';

import logoImg from '../../assets/images/argeux_logo.svg';
import backgroundImg from '../../assets/images/argeux_background.svg';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import api from '../../services/api';

function Login() {
    const history = useHistory();
    const [user, setUser] = useState('');

    const handleOnChangeInput = (e) => {
        const { value } = e.target;
        setUser(value)
    };

    const handleOnSubmit = async () => {
        await api.get(`users/${user}`)
            .then(response => {
                const {id } = response.data;
                localStorage.setItem('user', id);
                history.push("/projects")
        });
    };

    return (
        <div id="page-login">
            <div id="page-login-content" className="container">
                <div className="logo-container">
                    <img src={logoImg} alt="Logo" />
                    <h2>Sua plataforma para aplicar usabilidade no seu aplicativo móvel.</h2>
                </div>

                <img
                    src={backgroundImg}
                    alt="Idoso sentado no sofá usando um celular"
                    className="hero-image"
                />

                <div className="form">
                    <form action="" className="login-form-container">
                        <TextField
                            autoFocus
                            margin="dense"
                            label="Usuário"
                            variant="outlined"
                            fullWidth
                            name="user"
                            value={user}
                            onChange={handleOnChangeInput}
                        />

                        <Button
                            onClick={handleOnSubmit}
                            color="primary"
                            variant="contained"
                            size="large"
                        >
                            Entrar
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;