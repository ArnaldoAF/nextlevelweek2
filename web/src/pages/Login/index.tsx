import React, { FormEvent, useState } from 'react';
import {useHistory} from 'react-router-dom';

import './styles.css';
import LogoImg from '../../assets/images/logo.svg';
import sucessImg from '../../assets/images/background-login.svg';
import Input from '../../components/Input';
import { Link } from 'react-router-dom';
import Button from '../../components/Button';
import Checkbox from '../../components/Checkbox';
import MaterialInput from '../../components/MaterialInput';
import api from '../../services/api';
import { login } from '../../services/auth';

import {useForm, Controller} from 'react-hook-form';

interface IFormInputs {
    email: string;
    password: string;
}

const Login:React.FC = () => {
    const [email, setEmail] = useState<string>();
    const [password, setPassword] = useState<string>();
    const [remember, setRemember] = useState("false");
    const { register, errors, handleSubmit, control} = useForm<IFormInputs>();

    const history = useHistory();

     async function handleLogin(e:FormEvent) {
        e.preventDefault();
        //console.log(data);

        const obj = {
            email, 
            password
        }

        try {
            const response = await api.post("/login", obj);
            console.log("reponse", response);
            login(response.data.token);
            history.push("/home");

        } catch(err) {
            console.log("erro login", err);
        }

    }
    
    return (
        <>
        <div id="content">
            <div id="logo-area">
                <div id="logo-container">
                    
                    <img src={LogoImg} alt=""/>
                    <h2 >Sua plataforma de <br /> estudos online</h2>
                </div>
            </div>
            <div id="logo-area-mobile">
                <div id="logo-container">
                    <img src={LogoImg} alt=""/>
                </div>
            </div>

            <div id="login-area">
                <form className="form-login" onSubmit={handleLogin}> 
                    <h1>Fazer Login</h1>
                    <div>
                        <MaterialInput
                            name="email"
                            label="E-mail"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            type="email"
                            required
                        />

                        <MaterialInput
                            name="password"
                            label="Senha"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            type="password"
                            required
                        />
                    </div>
                        {errors.email && "Digite o email"}
                        {errors.password && "Digite a senha"}


                        <div className="password-options">
                        <Checkbox
                            name="remember"
                            label="Lembrar-me"
                            value="{remember}"
                            onChange={(e) => setRemember(e.target.value)}
                            type="checkbox"
                        />
                        <Link to="/" className="forgot-password">Esqueci minha senha</Link>


                        </div> 

                        <Button type="submit"> Entrar</Button>

                        


                </form>
                <div className="login-footer">
                            <p id="cadastrar">Não tem conta? <br /> 
                            <Link to="/singup">Cadastre-se</Link>
                            </p>
                            <p id="text-free">É de graça ❤</p>
                        </div>
            </div>
        </div>
        </>
    );
}
 
export default Login;
