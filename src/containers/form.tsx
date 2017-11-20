import * as React from 'react';
import { ResponseStatus, FormDefinition, PageDefinition, FieldDefinition, ResponseDefinition } from '../types';
import { mapFieldTypeToComponent } from '../services/form-service';

interface Props {
    form: FormDefinition | null;
    onSave: (response: ResponseDefinition, status: ResponseStatus) => void;
}

type FieldResponse = {
    waitingForResponse: boolean,
    response: string
};

type PageResponses = {
    [key: string]: FieldResponse
};

type State = {
    form: FormDefinition | null;
    responses: PageResponses[];
    currentPage: number;
    hasSkippedPages: boolean;
};

export class FormContainer extends React.Component<Props, State> {
    constructor(props: Props, context: object) {
        super(props, context);

        this.getInitialState = this.getInitialState.bind(this);
        this.mergeFormAndResponses = this.mergeFormAndResponses.bind(this);
        this.onNewForm = this.onNewForm.bind(this);
        this.onFieldResponse = this.onFieldResponse.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onSkip = this.onSkip.bind(this);
        this.onDismiss = this.onDismiss.bind(this);

        this.state = this.getInitialState();

        if (this.props.form) {
            this.onNewForm(this.props.form);
        }
    }

    getInitialState() {
        const state: State = {
            form: null,
            responses: [],
            currentPage: 0,
            hasSkippedPages: false
        };

        return state;
    }

    mergeFormAndResponses() {
        // TODO: what's the shape of user info?
        // need that to init the ResponseDefinition object
        return {};
    }

    componentWillReceiveProps(nextProps: Props) {
        if ((this.props.form !== nextProps.form) && (nextProps.form)) {
            this.onNewForm(nextProps.form);
        }
    }

    onNewForm(form: FormDefinition): void {
        const mapFieldsToResponseHash = (acc: PageResponses, field: FieldDefinition): PageResponses => {
            acc[field.id] = {
                waitingForResponse: !!field.required,
                response: ''
            };
            return acc;
        };

        const responseHashes: PageResponses[] = form.pages.map((page: PageDefinition) => {
            return page.fields.reduce(mapFieldsToResponseHash, {});
        });

        this.setState({...this.state, form: form, responses: responseHashes});
    }

    onFieldResponse(fieldId: string, fieldResponse: string) {
        const updatedResponsePage = {...this.state.responses[this.state.currentPage]};
        updatedResponsePage[fieldId] = {
            waitingForResponse: false,
            response: fieldResponse
        };

        const updatedResponses = [...this.state.responses];
        updatedResponses.splice(this.state.currentPage, 1, updatedResponsePage);

        let nextPage = this.state.currentPage;
        let turnThePage = (this.state.form && this.state.form.pages.length - 1 > this.state.currentPage);

        for (let fr in updatedResponsePage) {
            if (updatedResponsePage.hasOwnProperty(fr)) {
                if (!turnThePage) { break; }
                turnThePage = !updatedResponsePage[fr].waitingForResponse;
            }
        }

        if (turnThePage) { nextPage += 1; }

        return this.setState({...this.state, currentPage: nextPage, responses: updatedResponses});
    }

    onSubmit() {
        const response = this.mergeFormAndResponses();
        const status = this.state.hasSkippedPages ? 'partial' : 'completed';
        console.log(this.state); // tslint:disable-line:no-console

        this.props.onSave(response, status);
    }

    onSkip() {
        this.setState({...this.state, hasSkippedPages: true }, () => {
            if (this.state.currentPage === (this.state.form && this.state.form.pages.length - 1)) {
                this.onSubmit();
            } else {
                this.setState({...this.state, currentPage: (this.state.currentPage + 1)});
            }

            console.log('skipped');
        });
    }

    onDismiss() {
        // TODO: form dismissal is done OUTSIDE or this component.
        // this means the form response actually needs to be injected by a
        // parent container, and we need to modify that here. This might
        // mean bringing in omniscient, though that may need be usable for
        // the marketing site?
        const response = this.mergeFormAndResponses();
        console.log('dismissed');

        this.props.onSave(response, 'dismissed');
    }

    render() {
        return (
            <div>
                {this.state.form && this.state.form.pages[this.state.currentPage].fields.map((field) => {
                    const TagName = mapFieldTypeToComponent(field.fieldType);

                    return TagName && React.createElement(TagName, {
                        key: field.id,
                        id: field.id,
                        label: field.label,
                        config: field.config,
                        value: this.state.responses[this.state.currentPage][field.id].response,
                        onResponse: this.onFieldResponse
                    });
                })}
                {(this.state.form && this.state.currentPage === this.state.form.pages.length - 1) &&
                    <button onClick={this.onSubmit}>{this.state.form && this.state.form.submitText}</button>}
            </div>
        );
    }
}
