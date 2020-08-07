import React, { useState, FormEvent } from 'react';
import {useHistory} from 'react-router-dom';

import PageHeader from '../../components/PageHeader';
import Input from '../../components/Input';

import './styles.css';
import warningIcon from '../../assets/images/icons/warning.svg';
import TextArea from '../../components/Textarea';
import Select from '../../components/Select';
import api from '../../services/api';

const TeacherForm: React.FC = () => {
    const hisotry = useHistory();
    const [name, setName] = useState("");
    const [avatar, setAvatar] = useState("");
    const [whatsapp, setWhatsapp] = useState("");
    const [bio, setBio] = useState("");

    const [subject, setSubject] = useState("");
    const [cost, setCost] = useState("");


    const [scheduleItens, setScheduleItens] = useState<any[]>([
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

    function handleCreateClass(e: FormEvent) {
        e.preventDefault();
        const data = {
            name,
            avatar,
            whatsapp,
            bio,
            subject,
            cost: Number(cost),
            schedule: scheduleItens
        }

        api.post('classes', data).then((response) => {
            alert("ok");
            hisotry.push('/');
        }).catch((e) => {
            alert(e);
        })

        

        console.log(data);
    }

    function setScheduleItemValue(position: number, field: string, value: string) {
        const newArray = scheduleItens.map((item, index) => {
            if(index===position) return { ...item, [field]: value};

            return item;
        });

        setScheduleItens(newArray);
        console.log(newArray);
    }


    return (
        <div id="page-teacher-form" className="container">
            <PageHeader
                title="Que incrível que você quer dar aulas"
                description="o primeiro passo é preencher o formulário de inscrição"
            />

            <main>
                <form onSubmit={handleCreateClass}>
                    <fieldset>
                        <legend>Seus Dados</legend>

                        <Input
                            name="name"
                            label="Nome Completo"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />

                        <Input
                            name="avatar"
                            label="Avatar"
                            value={avatar}
                            onChange={(e) => setAvatar(e.target.value)}
                        />

                        <Input
                            name="whatsapp"
                            label="Whatsapp"
                            value={whatsapp}
                            onChange={(e) => setWhatsapp(e.target.value)}
                        />

                        <TextArea
                            name="bio"
                            label="Biografia"
                            value={bio}
                            onChange={(e) => setBio(e.target.value)}
                        />
                    </fieldset>

                    <fieldset>
                        <legend>Sobre a aula</legend>

                        <Select
                            name="subject"
                            label="Matéria"
                            options={[
                                { value: 'Matemática', label: 'Matemática' },
                                { value: 'Areas', label: 'Artes' },
                                { value: 'Biologia', label: 'Biologia' },
                                { value: 'Geografia', label: 'Geografia' },
                                { value: 'História', label: 'História' },

                            ]}
                            value={subject}
                            onChange={(e) => setSubject(e.target.value)}
                        />
                        <Input
                            name="cost"
                            label="Custo da sua hora por aula"
                            value={cost}
                            onChange={(e) => setCost(e.target.value)} />
                    </fieldset>

                    <fieldset>
                        <legend>
                            Horários Disponíveis
                        <button type="button" onClick={addNewScheduleItem}>
                                + Novo Horário
                        </button>
                        </legend>
                        {scheduleItens.map((scheduleItem: any, index: number) => {
                            return (
                                <div key={scheduleItem.week_day} className="schedule-item">
                                    <Select
                                        name="week_day"
                                        label="Dia da Semana"
                                        value={scheduleItem.week_day}
                                        onChange={(e) => setScheduleItemValue(index, 'week_day', e.target.value)}
                                        options={[
                                            { value: '0', label: 'Domingo' },
                                            { value: '1', label: 'Segunda-feira' },
                                            { value: '2', label: 'Terça-feira' },
                                            { value: '3', label: 'Quarta-feira' },
                                            { value: '4', label: 'Quinta-feira' },
                                            { value: '5', label: 'Sexta-feira' },
                                            { value: '6', label: 'Sábado' },


                                        ]} />
                                    <Input 
                                        name="from" 
                                        label="Das" 
                                        type="time"
                                        value={scheduleItem.from}
                                        onChange={(e) => setScheduleItemValue(index, 'from', e.target.value)} />
                                    <Input 
                                        name="to" 
                                        label="Até" 
                                        type="time"
                                        value={scheduleItem.to}
                                        onChange={(e) => setScheduleItemValue(index, 'to', e.target.value)} />
                                </div>
                            )
                        })}
                    </fieldset>
                    <footer>
                        <p>
                            <img src={warningIcon} alt="aviso iportante" />
                        IMPORTANTE! <br />
                        Preencha todos os dados
                    </p>

                        <button type="submit"> Salvar cadastro</button>
                    </footer>
                </form>
            </main>
        </div>

    )
}

export default TeacherForm;