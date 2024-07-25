import { UseFormProps } from 'react-hook-form';
import './Form.scss';
import { useEffect, useState } from 'react';

interface FormInput {
    name: string;
    type: string | 'text' | 'password';
    label?: string;
    register: object;
    placeholder?: string;
    defaultValue?: string | number;
    disabled?:boolean;
    size?: number;
    formState: UseFormProps;
}

export const FormInput = ({
    name,
    type,
    label,
    register,
    placeholder,
    defaultValue = "",
    disabled = false,
    size = 12,
    formState
}: FormInput) => {
    const { errors } = formState;

    return (
        <div className={`col-${size} form__field`}>
                <label className='form__field-label'>
                    {label}
                </label>

                <input
                    name={name}
                    type={type}
                    placeholder={placeholder}
                    defaultValue={defaultValue}
                    disabled={disabled}
                    className='form__field-input'
                    {...register}
                />

                {errors?.[name] && <small className='form__field-error'>{errors?.[name]?.message}</small>}
            </div>
    )
}
