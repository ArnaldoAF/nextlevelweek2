import React, { InputHTMLAttributes } from 'react';

import './styles.css';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label: string;
    name: string;
}

const MaterialInput: React.FC<InputProps> = (props, children) => {
    const {
        name,    
        label,
        ...rest
    } =props;
    return(
        <div className="input-box">
            <div className="input-container">
                <input type="text" id={name} className="input" pattern=".+" required/>
                <label htmlFor={name} className="label">{label}</label>
            </div>
            </div>
    )
}

export default MaterialInput;