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

const SingUp: React.FC = () => {
    const [name, setName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [success, setSuccess] = useState(false);
    const [isDisabled, setisDisabled] = useState(false);

    function handleSingUp(e: FormEvent) {
        e.preventDefault();
        const data = {
            name: name.trim(),
            lastName: lastName.trim(),
            email: email.trim(),
            password:password.trim()
        }


        api.post('register', data).then( response => {
            setSuccess(true);
        }).catch((e) => {
            alert(e);
        });
    }

    useEffect(() => {
        setisDisabled((
            isEmptyOrWhiteSpace(name) ||
            isEmptyOrWhiteSpace(lastName) ||
            isEmptyOrWhiteSpace(email) ||
            isEmptyOrWhiteSpace(password)
        ));
        console.log(isDisabled);
    },[name,lastName,email,password]);

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
                

                <form className="form-singup" onSubmit={handleSingUp}> 
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
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />

                        <MaterialInput
                            name="lastname"
                            label="SobreNome"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            required
                        />
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
                            required
                            type="password"
                        />
                        </div>


                        


                        

                        <Button type="submit" disabled={isDisabled}> Cadastrar</Button>
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