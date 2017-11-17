import * as React from 'react';
import { DynamicFieldProps, FieldTextConfig } from '../types';

export const TextInputComponent = ({id, label, config, value, onResponse}: DynamicFieldProps) => {
    return (
        <div>
            {label && <label htmlFor={id}>{label}</label>}
            <input
                type="text"
                name={id}
                value={value}
                onChange={(e) => onResponse(e.target.name, e.target.value)}
                maxLength={(config as FieldTextConfig).maxLength}
                placeholder={(config as FieldTextConfig).placeholder}
            />
        </div>
    );
};
