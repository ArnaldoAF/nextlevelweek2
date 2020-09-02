import React, { useState } from 'react';

import './styles.css';
import LogoImg from '../../assets/images/logo.svg';
import sucessImg from '../../assets/images/background-login.svg';
import Input from '../../components/Input';
import { Link } from 'react-router-dom';
import Button from '../../components/Button';
import Checkbox from '../../components/Checkbox';
import MaterialInput from '../../components/MaterialInput';
import backIcon from '../../assets/images/icons/back.svg';

const SingUp: React.FC = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [lastName, setLastName] = useState("");
    const [remember, setRemember] = useState("false");
    return (
        <>
        <div id="content">
            
            <div id="logo-area-mobile">
                <div id="logo-container">
                    <img src={LogoImg} alt=""/>
                    
                    
                </div>
                
            </div>
            <div id="login-area">
                

                <form className="form-singup"> 
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
                        />

                        <MaterialInput
                            name="lastname"
                            label="SobreNome"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                        />
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


                        


                        

                        <Button type="submit"> Cadastrar</Button>
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
    )
}

export default SingUp;