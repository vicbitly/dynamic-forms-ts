export enum ResponseStatus {
    New = 'new',
    Partial = 'partial',
    Dismissed = 'dismissed',
    Completed = 'completed'
}

export interface FieldTextConfig {
    maxLength: number,
    placeholder: string
}

export interface FieldTextAreaConfig {
    rows: number,
    cols: number
}

export interface FieldButtonListConfig {
    options: { key: string, display: string }[]
}

export type DynamicFieldConfig =
    FieldTextConfig |
    FieldTextAreaConfig |
    FieldButtonListConfig |
    {};

export interface FieldDefinition {
    id: string,
    fieldType: string,
    label: string,
    config: DynamicFieldConfig,
    required?: boolean,
    response?: string
}

export interface PageDefinition {
    fields: FieldDefinition[]
}

export interface FormDefinition {
    id: string,
    version: string,
    submitText: string,
    skipText: string,
    pages: PageDefinition[]
}

export interface ResponseDefinition extends FormDefinition {
    userId: string,
    orgGuid: string,
    brandGuid: string,
    responseStatus: ResponseStatus
}

export interface DynamicFieldProps {
    id: string;
    label: string;
    config: DynamicFieldConfig;
    value: string;
    onResponse: (fieldId: string, response: string) => void;
}
