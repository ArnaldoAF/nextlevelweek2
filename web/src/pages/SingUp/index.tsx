import React, { useState, FormEvent, useEffect } from 'react';
import { Link } from 'react-router-dom';

import api from '../../services/api';

import './styles.css';
import LogoImg from '../../assets/images/logo.svg';
import backIcon from '../../assets/images/icons/back.svg';


import Button from '../../components/Button';
import MaterialInput from '../../components/MaterialInput';

import  {isBlank,isEmpty,isEmptyOrWhiteSpace} from '../../utils/StringCheck';
import FullScreen from '../../components/FullScreen';
import { useForm } from 'react-hook-form';
import LoadingSpinner from '../../components/LoadingSpiiner';

interface IFormInputs {
    name: string;
    lastName: string;
    email: string;
    password: string;
}

const SingUp: React.FC = () => {
    const [name, setName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [success, setSuccess] = useState(false);
    const [isDisabled, setisDisabled] = useState(false);
    const { register, errors, handleSubmit, control} = useForm<IFormInputs>();
    
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    function handleSingUp(data:IFormInputs) {
        //e.preventDefault();
        const obj = {
            name: name.trim(),
            lastName: lastName.trim(),
            email: email.trim(),
            password:password.trim()
        }
        setIsLoading(true);

        api.post('register', obj).then( response => {
            setSuccess(true);
        }).catch((err) => {
            setErrorMessage(err?.response?.data?.message);
        });
        setIsLoading(false);
    }

    

    return (
        <>
        {(success) ? (
            <>
            <FullScreen 
                title="Cadastro Concluído"
                subtitle1="Agora você faz parte da plataforma da Proffy"
                subtitle2="Tenha uma ótima experiência"
                buttonText="Fazer Login"
                buttonLink="/"

            />
            </>
        ):(
            <>
            <div id="content">
            
            <div id="logo-area-mobile">
                <div id="logo-container">
                    <img src={LogoImg} alt=""/>
                    
                    
                </div>
                
            </div>
            <div id="login-area">
                

                <form className="form-singup" onSubmit={handleSubmit(handleSingUp)}> 
                    <Link to="/">
                        <img src={backIcon} alt=""/>
                    </Link>
                    <div className="partial-form">
                    <h1>Cadastro</h1>
                    <h3>Preencha os dados abaixo <br /> para começar</h3>
                    <div > 
                        <MaterialInput
                                name="name"
                                label="Nome"
                                onChange={(e) => setName(e.target.value)}
                                ref={register({required:true, minLength: 3})}
                                
                        />

                        <MaterialInput
                            name="lastName"
                            label="SobreNome"
                            onChange={(e) => setLastName(e.target.value)}
                            ref={register({required:true, minLength: 3})}
                            
                        />
                        <MaterialInput
                            name="email"
                            label="E-mail"
                            onChange={(e) => setEmail(e.target.value)}
                            ref={register({required:true, pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/})}
                            type="email"
                            
                        />

                        <MaterialInput
                            name="password"
                            label="Senha"
                            onChange={(e) => setPassword(e.target.value)}
                            ref={register({required:true})}
                            
                            type="password"
                        />
                        </div>

                        {errorMessage && <h4>{errorMessage} <br /></h4>} 
                        {errors.name && <h4>Confira o Nome <br /></h4>} 
                        {errors.lastName && <h4>Confira o SobreNome <br /></h4>}
                        {errors.email && <h4>Confira o e-mail <br /></h4>} 
                        {errors.password && <h4>Digite a Senha <br /></h4>}

                        <Button type="submit" disabled={isDisabled}> 
                            {isLoading ? 
                                    <LoadingSpinner size={3}/> 
                                    : "Cdastrar"}
                        </Button>
                        </div>
                </form>
                
            </div>
            <div id="logo-area">
                
                <div id="logo-container">
                    
                    <img src={LogoImg} alt=""/>
                    <h2 >Sua plataforma de <br /> estudos online</h2>
                </div>
                
            </div>
        </div>

            </>
        )}


        
        
        
        </>
    )
}

export default SingUp;