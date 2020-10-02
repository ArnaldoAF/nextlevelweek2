import React, { useEffect, useState } from 'react';

import api from '../../services/api';

import "./styles.css";
import logoffButtom from "../../assets/images/icons/logoffButtom.svg";

interface UserProps {
    id: number,
    name: string,
    avatar: string,
    whatsapp:string,
    bio:string,
    email:string,
    password:string,
    created_at: string
  }



const UserHeader: React.FC = () => {
    const [userInfo, setUserInfo] =  useState({
        id: 0,
        name:" string,",
        avatar:" string",
        whatsapp:"string,",
        bio:"string,",
        email:"string,",
        password:"string,",
        created_at:" string"
    });

    useEffect( () => {
        try{
        api.get("/me").then((response) => {
            console.log(response.data);
            var user = response.data;
            setUserInfo(user);
            
        })
        } catch(err) {
            console.log("ERRO AO RECUPERAR / ME", err);
        }
    },[]);

    return (
        <header className="user-header">
            <div className="user-header-content">
                <div className="name-box">
                    <img src={userInfo?.avatar} alt=""/>
                    <p> {userInfo?.name}</p> 
                </div>
                <div className="logoff-box">
                    <img src={logoffButtom} alt=""/>
                </div>
            </div>
        </header>
    )
}

export default UserHeader;