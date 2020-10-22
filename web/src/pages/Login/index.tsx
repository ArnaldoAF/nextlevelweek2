import React, { FormEvent, useEffect, useState } from 'react';
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
import LoadingSpinner from '../../components/LoadingSpiiner';

interface IFormInputs {
    email: string;
    password: string;
}

const Login:React.FC = () => {
    const [email, setEmail] = useState<string>();
    const [password, setPassword] = useState<string>();
    const [remember, setRemember] = useState("false");
    const { register, errors, handleSubmit, control} = useForm<IFormInputs>();
    const [errorMessage, setErrorMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const history = useHistory();

     async function handleLogin(data:IFormInputs) {
        //e.preventDefault();
        console.log(data);
        setEmail(data.email);
        setPassword(data.password);

        const obj = {
            email, 
            password
        }
        console.log("obj", obj);

        setIsLoading(true);
       
        await api.post("/login", obj).then(response => {
            console.log("reponse", response);
            login(response.data.token);
            history.push("/home");
        }).catch(err => {
            console.log("erro login",{err});
            console.log("erro login", err.data);
            console.log("erro login", err?.response?.data?.message);
            setErrorMessage(err?.response?.data?.message);

        });

        setIsLoading(false);
            

        

    }

    

    useEffect(()=>{ 
        console.log(email);

    },[email]);
    
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
                <form className="form-login" onSubmit={handleSubmit(handleLogin)}> 
                    <h1>Fazer Login</h1>
                    <div>
                        <MaterialInput
                            name="email"
                            label="E-mail"
                            type="text"
                            onChange={(e) => setEmail(e.target.value)}
                            ref={register({required:true, pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/})}
                            
                        />

                        <MaterialInput
                            name="password"
                            label="Senha"
                            type="password"
                            onChange={(e) => setPassword(e.target.value)}
                            ref={register({required:true})}
                            
                        />
                    </div>
                        {errorMessage && <h4>{errorMessage} <br /></h4>} 
                        {errors.email && <h4>Confira o e-mail <br /></h4>} 
                        {errors.password && <h4>Digite a senha <br /></h4>}


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

                        <Button type="submit" disabled={isLoading}> 
                            {isLoading ? 
                                <LoadingSpinner size={3}/> 
                                : "Entrar"}
                        </Button>
                        


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
