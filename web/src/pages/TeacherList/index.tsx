import React from 'react';

import './styles.css';
import PageHeader from '../../components/PageHeader';

import whatsappIcon from '../../assets/images/icons/whatsapp.svg';
import TeacherItem from '../../components/TeacherItem';
import Input from '../../components/Input';

const TeacherList: React.FC = () => {
    return (
        <div id="page-teacher-list" className="container">
            <PageHeader title="Estes sao os proffys disponiveis">
                <form action="" id="search-teachers">
                    <Input name="subject" label="Matéria"/>
                    <Input name="week_day" label="Dia da Semana" />
                    <Input name="time" label="Hora" type="time"/>
                </form>


            </PageHeader>

            <main>
                <TeacherItem />
                <TeacherItem />
                <TeacherItem />
            </main>
        </div>
    )
}

export default TeacherList;