import React, { useState, FormEvent } from 'react';

import './styles.css';
import PageHeader from '../../components/PageHeader';

import whatsappIcon from '../../assets/images/icons/whatsapp.svg';
import TeacherItem from '../../components/TeacherItem';
import Input from '../../components/Input';
import Select from '../../components/Select';
import api from '../../services/api';

const TeacherList: React.FC = () => {
    const [teachers, setTeachers] = useState([]);
    const [subject, setSubject] = useState('');
    const [week_day, setWeek_Day] = useState('');
    const [time, setTime] = useState('');
    
        
    async function  searchTeacher(e: FormEvent) {
        e.preventDefault();
        const response = await api.get('classes', {
            params: {
                subject,
                week_day,
                time
            }
        });

        console.log(response.data);
        setTeachers(response.data);
    }

    return (
        <div id="page-teacher-list" className="container">
            <PageHeader title="Estes sao os proffys disponiveis">
                <form action="" id="search-teachers" onSubmit={searchTeacher}>
                <Select 
                        name="subject" 
                        label="Matéria"
                        value={subject}
                        onChange={(e)=> setSubject(e.target.value)} 
                        options={[
                            { value: 'Matemática', label: 'Matemática'},
                            { value: 'Areas', label: 'Artes'},
                            { value: 'Biologia', label: 'Biologia'},
                            { value: 'Geografia', label: 'Geografia'},
                            { value: 'História', label: 'História'},

                        ]}/>
                    <Select 
                        name="week_day" 
                        label="Dia da Semana" 
                        value={week_day}
                        onChange={(e)=> setWeek_Day(e.target.value)} 
                        options={[
                            { value: '0', label: 'Domingo'},
                            { value: '1', label: 'Segunda-feira'},
                            { value: '2', label: 'Terça-feira'},
                            { value: '3', label: 'Quarta-feira'},
                            { value: '4', label: 'Quinta-feira'},
                            { value: '5', label: 'Sexta-feira'},
                            { value: '6', label: 'Sábado'}
                        ]}/>
                    <Input 
                        name="time" 
                        label="Hora" 
                        type="time"
                        value={time}
                        onChange={(e)=> setTime(e.target.value)} />
                        <button type="submit">
                            BUSCAR
                        </button>
                </form>
                
                

            </PageHeader>

            <main>
                {teachers.map((item:any) => {
                    return <TeacherItem teacher={item} />
                })}
                
                
            </main>
        </div>
    )
}

export default TeacherList;