import React from 'react';

import PageHeader from '../../components/PageHeader';
import Input from '../../components/Input';

import './styles.css';
import warningIcon from '../../assets/images/icons/warning.svg';
import TextArea from '../../components/Textarea';

const TeacherForm: React.FC = () => {
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

                    <Input name="subject" label="Matéria" />
                    <Input name="cost" label="Custo da sua hora por aula" />
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