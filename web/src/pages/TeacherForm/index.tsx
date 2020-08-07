import React, { useState } from 'react';

import PageHeader from '../../components/PageHeader';
import Input from '../../components/Input';

import './styles.css';
import warningIcon from '../../assets/images/icons/warning.svg';
import TextArea from '../../components/Textarea';
import Select from '../../components/Select';

const TeacherForm: React.FC = () => {
    const [scheduleItens, setScheduleItens] =  useState<any[]>([
        {
            week_day: 0,
            from: '',
            to: ''
        }
    ]);

    function addNewScheduleItem() {
        const newObj = {
            week_day: 0,
            from: '',
            to: ''
        };

        setScheduleItens([...scheduleItens, newObj]);
    }
    return (
        <div id="page-teacher-form" className="container">
            <PageHeader 
            title="Que incrível que você quer dar aulas"
            description="o primeiro passo é preencher o formulário de inscrição"
            />

            <main>
                <fieldset>
                    <legend>Seus Dados</legend>

                    <Input name="name" label="Nome Completo" />
                    <Input name="avatar" label="Avatar" />
                    <Input name="whatsapp" label="Whatsapp" />
                    <TextArea name="bio" label="Biografia" />
                </fieldset>

                <fieldset>
                    <legend>Sobre a aula</legend>

                    <Select 
                        name="subject" 
                        label="Matéria" 
                        options={[
                            { value: 'Matemática', label: 'Matemática'},
                            { value: 'Areas', label: 'Artes'},
                            { value: 'Biologia', label: 'Biologia'},
                            { value: 'Geografia', label: 'Geografia'},
                            { value: 'História', label: 'História'},

                        ]}/>
                    <Input name="cost" label="Custo da sua hora por aula" />
                </fieldset>

                <fieldset>
                    <legend>
                        Horários Disponíveis
                        <button type="button" onClick={addNewScheduleItem}>
                            + Novo Horário
                        </button>
                    </legend>
                    {scheduleItens.map((scheduleItem:any) => {
                        return (
                            <div key={scheduleItem.week_day} className="schedule-item">
                                <Select 
                                    name="week_day" 
                                    label="Dia da Semana" 
                                    options={[
                                        { value: '0', label: 'Domingo'},
                                        { value: '1', label: 'Segunda-feira'},
                                        { value: '2', label: 'Terça-feira'},
                                        { value: '3', label: 'Quarta-feira'},
                                        { value: '4', label: 'Quinta-feira'},
                                        { value: '5', label: 'Sexta-feira'},
                                        { value: '6', label: 'Sábado'},
                                        

                                    ]}/>
                                    <Input name="from" label="Das" type="time" />
                                    <Input name="to" label="Até" type="time" />
                                </div>
                        )
                    })}
                </fieldset>
                <footer>
                    <p>
                        <img src={warningIcon} alt="aviso iportante"/>
                        IMPORTANTE! <br />
                        Preencha todos os dados
                    </p>

                    <button type="button"> Salvar cadastro</button>
                </footer>
            </main>
        </div>
        
    )
}

export default TeacherForm;