import React from 'react';

import './styles.css';

import checkSucess from '../../assets/images/icons/success-check-icon.svg';
import Button from '../Button';
import { Link } from 'react-router-dom';

interface FullScreenProps {
    status?: string;
    title?: string;
    subtitle1?: string;
    subtitle2?: string;
    buttonText?: string;
    buttonLink?: string;
}

const FullScreen: React.FC<FullScreenProps> = (props) => {
    const {
        status,
        title,
        subtitle1,
        subtitle2,
        buttonText,
        buttonLink
    } = props;
    return (
        <div className="purple-background">
            <img id="check" src={checkSucess} alt="sucesso"/>
            <h1 id="fs-title">{title || "Cadastro Concluído"}</h1>
            <h3 id="fs-subtitle-1">{subtitle1 ||" Agora você faz parte da plataforma Proffy."}</h3>
            <h3 id="fs-subtitle-2">{subtitle2 ||"Tenha uma ótima experiencia"}</h3>
            
            <Link to={buttonLink || "/"} className="fs-button">
                <Button >
                    {buttonText || "Fazer Login"}
                </Button>
            </Link>
            
            
        </div>
    )
}

export default FullScreen;