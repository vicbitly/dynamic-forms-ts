import * as React from 'react';
import { DynamicFieldProps } from '../types';
import { ContentHeadlineComponent } from '../components/content-headline';
import { ContentNormalComponent } from '../components/content-normal';
import { TextAreaComponent } from '../components/text-area';
import { TextInputComponent } from '../components/text-input';
import { ButtonListComponent } from '../components/button-list';

export function mapFieldTypeToComponent(fieldType: string):
        React.ComponentClass<DynamicFieldProps> | React.SFC<DynamicFieldProps> | null {
    switch (fieldType) {
        case 'content-headline':
            return ContentHeadlineComponent;
        case 'content-normal':
            return ContentNormalComponent;
        case 'text':
            return TextInputComponent;
        case 'textarea':
            return TextAreaComponent;
        case 'pick-one-buttons':
            return ButtonListComponent;
        default:
            return null;
    }
}
