import { FormDefinition } from '../types/index';
import { formConfig } from './data/mock-form';

export function getForm(): Promise<FormDefinition> {
    return new Promise((resolve, reject) => {
        resolve(formConfig);
    });
}
