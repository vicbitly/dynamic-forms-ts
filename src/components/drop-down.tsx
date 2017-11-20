import * as React from 'react';
import { DynamicFieldProps, FieldDropDownConfig } from '../types';

export const DropDownComponent = ({ id, label, config, value, onResponse }: DynamicFieldProps) => {
    return (
        <select
            name={id}
            value={value}
            onChange={(e) => onResponse(e.target.name, e.target.value)}
        >
            <option value="">
                {label}
            </option>
            {(config as FieldDropDownConfig).options.map((itm) => {
                return <option
                    key={itm.key}
                    value={itm.key}
                >
                    {itm.display}
                </option>;
            })}
        </select>
    );
};
