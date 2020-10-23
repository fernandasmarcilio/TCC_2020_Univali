import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import './styles.css';

import logoImg from '../../assets/images/argeux_logo.svg';
import backgroundImg from '../../assets/images/argeux_landing.svg';

import Input from '../../component/Input';
import Button from '../../component/Button';

import api from '../../services/api';

function Login() {
    const history = useHistory();
    const [user, setUser] = useState('');

    const handleOnChangeInput = (e) => {
        const { value } = e.target;
        setUser(value)
    };

    const handleOnSubmit = async () => {
        let response = await api.get(`users?usuario=${user}`);
        let id = response.data.id;

        if(!id) {
            response = await api.post(`users`, { usuario: user });
            id = response.data.id;
        }

        if(id){
            localStorage.setItem('user', id);
            history.push("/projects")
        }
    };

    return (
        <div id="page-login">
            <div id="page-login-content" className="container">
                <div className="logo-container">
                    <img src={logoImg} alt="Logo" />
                    <h2>Sua plataforma para aplicar usabilidade no seu aplicativo móvel.</h2>

                    <div className="form">
                        <form action="" className="login-form-container">
                            <Input 
                                label="Usuário"
                                name="user"
                                value={user}
                                onChange={handleOnChangeInput}
                            />

                            <Button
                                onClick={handleOnSubmit}
                            >
                                Entrar
                        </Button>
                        </form>
                    </div>

                </div>

                <img
                    src={backgroundImg}
                    alt="Idoso sentado no sofá usando um celular"
                    className="hero-image"
                />
            </div>
        </div>
    );
}

export default Login;