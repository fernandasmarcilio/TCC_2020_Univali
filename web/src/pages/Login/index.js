import React from 'react';
import { Link } from 'react-router-dom';

import './styles.css';

import logoImg from '../../assets/images/argeux_logo.svg';
import logingImg from '../../assets/images/login.svg';


function Login() {
    return (
        <div id="page-login">
            <div id="page-login-content" className="container">
                <div className="logo-container">
                    <img src={logoImg} alt="Logo" />
                    <h2>Sua plataforma para aplicar usabilidade no seu aplicativo móvel.</h2>
                </div>

                <img
                    src={logingImg}
                    alt="Pessoas fazendo checklist enquanto olham um celular"
                    className="hero-image"
                />

                <div className="form">
                    <form action="" className="login-form-container">
                        <Link to="/projects">Começar </Link>
                    </form>
                    {/* <form action="" className="login-form-container">
                        <input placeholder="Usuario" />
                        <input placeholder="Senha" />
                        <Link to="/projects">Entrar </Link>
                    </form>

                    <div className="register-container">
                        Não possui cadastro?
                        <a href="/register">
                            Cadastra-se aqui
                        </a>
                    </div> */}
                </div>
            </div>
        </div>
    );
}

export default Login;