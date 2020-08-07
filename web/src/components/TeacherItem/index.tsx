import React from 'react';

import './styles.css';

import whatsappIcon from '../../assets/images/icons/whatsapp.svg';

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
                        <button type="button">
                            <img src={whatsappIcon} alt="Whatsapp"/>
                            Entrar em contato
                        </button>
                    </footer>
                </article>
    );
}

export default TeacherItem;