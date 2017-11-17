import * as React from 'react';
import { DynamicFieldProps } from '../types';

export const ContentHeadlineComponent = ({id, label, config, value, onResponse}: DynamicFieldProps) => {
    return (
        <div>
            {label && <h1>{label}</h1>}
        </div>
    );
};
