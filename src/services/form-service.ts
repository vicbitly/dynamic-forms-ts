import * as React from 'react';
import { FieldType, DynamicFieldProps } from '../types';
import { ContentHeadlineComponent } from '../components/content-headline';
import { ContentNormalComponent } from '../components/content-normal';
import { TextAreaComponent } from '../components/text-area';
import { TextInputComponent } from '../components/text-input';
import { ButtonListComponent } from '../components/button-list';
import { DropDownComponent } from '../components/drop-down';

export function mapFieldTypeToComponent(fieldType: FieldType):
        React.ComponentClass<DynamicFieldProps> | React.SFC<DynamicFieldProps> | null {
    switch (fieldType) {
        case 'content-headline':
            return ContentHeadlineComponent;
        case 'content-normal':
            return ContentNormalComponent;
        case 'pick-one-buttons':
            return ButtonListComponent;
        case 'pick-one-dropdown':
            return DropDownComponent;
        case 'text':
            return TextInputComponent;
        case 'text-area':
            return TextAreaComponent;
        default:
            return null;
    }
}
