import React, { useEffect, useState } from 'react';

import api from '../../services/api';

import "./styles.css";

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
        <>
        UserHeader {userInfo?.name}
        </>
    )
}

export default UserHeader;