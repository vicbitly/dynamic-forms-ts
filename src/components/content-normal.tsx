import * as React from 'react';
import { DynamicFieldProps } from '../types';

export const ContentNormalComponent = ({id, label, config, value, onResponse}: DynamicFieldProps) => {
    return (
        <div>
            {label && <p>{label}</p>}
        </div>
    );
};
