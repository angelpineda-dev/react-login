import React, { useEffect, useRef } from 'react'

import './Form.scss';

interface FormInput {
    name: string;
    type: string | 'text' | 'password';
    label?: string;
    register: object;
    placeholder?: string;
    defaultValue?: string | number;
    disabled?:boolean;
    size?: number;
    error: object;
}

export const FormInput = ({
    name,
    type,
    label,
    register,
    placeholder,
    defaultValue = "",
    disabled = false,
    size = 6,
    error
}: FormInput) => {

    return (
        <div className={`col-span-${size} form__field`}>
            <label className='form__field-label'>
                {label}
            </label>

            <input
                name={name}
                type={type} 
                placeholder={placeholder}
                defaultValue={defaultValue}
                disabled={disabled}
                {...register}
                className='form__field-input'
            />

            {
                error?.[name] && <small className='form__field-error'>{error?.[name]?.message}</small>
            }
        </div>
    )
}
