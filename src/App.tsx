import * as React from 'react';
import { UserSession, FormDefinition, ResponseDefinition } from './types';
import { getForm, saveResponse } from './services/form-api';
import { FormContainer } from './containers/form';
import './App.css';

interface Props {

}

interface State {
    form: FormDefinition | null;
    session: UserSession;
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
        return {
          form: null,

          // these are inlined, so assume they're in state
          session: {
            userId: 'vicbitly',
            orgGuid: 'O01106zkyJS',
            brandGuid: 'B01102LRB8d'
          }
        };
    }

    async getForm() {
        return await getForm();
    }

    onSave(responses: ResponseDefinition) {
        saveResponse(responses);
    }

    render() {
        return (
            <FormContainer
                form={this.state.form}
                session={this.state.session}
                onSave={this.onSave}
            />
        );
    }
}

export default App;
