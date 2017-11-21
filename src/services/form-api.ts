import { FormDefinition, ResponseDefinition } from '../types/index';
import { formConfig } from './data/mock-form';

export function getForm(): Promise<FormDefinition> {
    return new Promise((resolve, reject) => {
        resolve(formConfig);
    });
}

export function saveResponse(response: ResponseDefinition) {
  console.log(response); // tslint:disable-line:no-console
}
