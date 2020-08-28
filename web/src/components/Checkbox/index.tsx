import React, {InputHTMLAttributes} from 'react';
import './styles.css';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label: string;
    name: string;
}


const Checkbox : React.FC<InputProps> = (props, children) => {
    const {
        label,
        name,
        ...rest
    } = props;

    return (
        <div className="checkbox-block">
            
            <input  id={name} type="checkbox" {...rest}/>
            <span className="custom-check"></span>
            <label htmlFor={name}>{label}</label>
            
        </div>
    )
}

export default Checkbox;