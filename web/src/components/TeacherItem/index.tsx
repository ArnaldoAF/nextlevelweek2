import React from 'react';

import './styles.css';

import whatsappIcon from '../../assets/images/icons/whatsapp.svg';
import api from '../../services/api';

interface TeacherItemProps {
    teacher: {
        avatar:string;
        bio:string;
        cost:number;
        id:number;
        name:string;
        subject:string;
        user_id?: number;
        whatsapp: number;
    }
}



const TeacherItem: React.FC<TeacherItemProps> = (props) => {
    const {teacher} = props;
    function handleConnection() {
        api.post('connections', {
            user_id: teacher.id
        })
    }

    return (
                <article className="teacher-item">
                    <header>
                        <img src={teacher.avatar} alt="foto "/>
                        <div>
                            <strong>
                               {teacher.name}
                            </strong>
                            <span>{teacher.subject} </span>
                        </div>
                    </header>

                    <p>
                        {teacher.bio}
                    </p>

                    <footer>
                        <p>
                            Preço/hora 
                            <strong>R$ {teacher.cost}</strong>
                        </p>
                        <a onClick={handleConnection} href={`https://wa.me/${teacher.whatsapp}`}>
                            <img src={whatsappIcon} alt="Whatsapp"/>
                            Entrar em contato
                        </a>
                    </footer>
                </article>
    );
}

export default TeacherItem;