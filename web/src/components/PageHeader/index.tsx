import React from 'react';
import { Link } from 'react-router-dom';

import logoImg from '../../assets/images/logo.svg';
import backIcon from '../../assets/images/icons/back.svg';

import './styles.css';

interface pageHeaderProps {
    title: string;
    subtitle?: string;
}

const PageHeader:React.FC<pageHeaderProps> = (props, children) => {
    const {title, subtitle} = props;

    return (
        <header className="page-header">
                <div className="top-bar-container">
                    <Link to="/">
                        <img src={backIcon} alt=""/>
                    </Link>
                    <img src={logoImg} alt=""/>
                </div>

                <div className="header-content">
                    <strong>{title}</strong>
                    {props.children}
                </div>

                
            </header>
    )
}

export default PageHeader;