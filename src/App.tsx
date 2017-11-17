import * as React from 'react';
import { FormDefinition, ResponseDefinition } from './types';
import { getForm } from './services/form-api';
import { FormContainer } from './containers/form';
import './App.css';

interface Props {

}

interface State {
    form: FormDefinition | null;
}

class App extends React.Component<Props, State> {
    constructor(props: Props, context: object) {
        super(props, context);

        this.getInitialState = this.getInitialState.bind(this);

        this.state = this.getInitialState();

        this.getForm = this.getForm.bind(this);
        this.getForm().then((formConfig) => {
            console.log(formConfig); // tslint:disable-line:no-console
            this.setState({ ...this.state, form: formConfig });
        });
    }

    getInitialState() {
        return { form: null };
    }

    async getForm() {
        return await getForm();
    }

    onSave(responses: ResponseDefinition) {
        console.log(responses); // tslint:disable-line:no-console
    }

    render() {
        return (
            <FormContainer
                form={this.state.form}
                onSave={this.onSave}
            />
        );
    }
}

export default App;
