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

const Login:React.FC = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [remember, setRemember] = useState("false");

    const history = useHistory();

     async function handleLogin(e:FormEvent) {
        e.preventDefault();

        const data = {
            email, 
            password
        }

        try {
            const response = await api.post("/login", data);
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
                        />

                        <MaterialInput
                            name="password"
                            label="Senha"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            type="password"
                        />
                        </div>


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
