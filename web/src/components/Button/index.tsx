import React, { ReactHTML, ButtonHTMLAttributes } from 'react';

import './styles.css'; 

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    name?: string;
}

const Button: React.FC<ButtonProps> = (props) => {
    const {
        ...rest} = props;

    return (
        <>
        <button className="button" {...rest} >
            {props.children}
        </button>
        </>
    )
}

export default Button;