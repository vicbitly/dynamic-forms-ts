import * as React from 'react';
import { DynamicFieldProps, FieldTextAreaConfig } from '../types';

export const TextAreaComponent = ({id, label, config, value, onResponse}: DynamicFieldProps) => {
    return (
        <div>
            {label && <label htmlFor={id}>{label}</label>}
            <textarea
                name={id}
                onChange={(e) => onResponse(e.target.name, e.target.value)}
                rows={(config as FieldTextAreaConfig).rows}
                cols={(config as FieldTextAreaConfig).cols}
                value={value}
            />
        </div>
    );
};
