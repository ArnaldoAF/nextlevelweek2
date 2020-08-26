import React, { useState } from 'react';

import './styles.css';
import LogoImg from '../../assets/images/logo.svg';
import sucessImg from '../../assets/images/background-login.svg';
import Input from '../../components/Input';
import { Link } from 'react-router-dom';
import Button from '../../components/Button';

const Login:React.FC = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [remember, setRemember] = useState("false");
    
    return (
        <>
        <div id="content">
            <div id="logo-area">
                <img src={sucessImg} alt=""/>
                <div id="logo-container">
                    
                    <img src={LogoImg} alt=""/>
                    <h2 >Sua plataforma de <br /> estudos online</h2>
                </div>
                
            </div>
            <div id="login-area">
                

                <form className="form-login"> 
                    <h1>Fazer Login</h1>
                        <Input
                            name="email"
                            label="E-mail"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />

                        <Input
                            name="password"
                            label="Senha"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            type="password"
                        />

                        <div className="password-options">
                        <Input
                            name="remember"
                            label="Lembre-se de mim"
                            value="{remember}"
                            onChange={(e) => setRemember(e.target.value)}
                            type="checkbox"
                        />
                        <p>Esqueci minha senha</p>


                        </div> 

                        <Button type="submit"> Entrar</Button>

                        


                </form>
                <div className="login-footer">
                            <p id="cadastrar">Não tem conta? <br /> 
                            <Link to="/">Cadastre-se</Link>
                            </p>
                            <p id="text-free">É de graça ❤</p>
                        </div>
            </div>
        </div>
        </>
    );
}
 
export default Login;
