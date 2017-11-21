import * as React from 'react';
import {
  UserSession,
  ResponseStatus,
  FormDefinition,
  PageDefinition,
  FieldDefinition,
  ResponseDefinition
} from '../types';
import { mapFieldTypeToComponent } from '../services/form-service';

type FieldResponse = {
  waitingForResponse: boolean,
  response: string
};

type PageOfResponses = {
  [fieldId: string]: FieldResponse
};

interface Props {
  form: FormDefinition | null;
  session: UserSession;
  onSave: (response: ResponseDefinition) => void;
}

type State = {
  form: FormDefinition | null;
  responses: PageOfResponses[];
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

  getInitialState(): State {
    const state: State = {
      form: null,
      responses: [],
      currentPage: 0,
      hasSkippedPages: false
    };

    return state;
  }

  componentWillReceiveProps(nextProps: Props) {
    if ((this.props.form !== nextProps.form) && (nextProps.form)) {
      this.onNewForm(nextProps.form);
    }
  }

  mergeFormAndResponses(): ResponseDefinition {
    const { userId, orgGuid, brandGuid } = this.props.session;
    const responseStatus: ResponseStatus = this.state.hasSkippedPages ? 'partial' : 'completed';
    if (this.props.form) {
      const response = {
        // TODO: this needs to be a deep clone
        ...this.props.form,
        userId,
        orgGuid,
        brandGuid,
        responseStatus
      };

      for (let page = 0; page < response.pages.length; page += 1) {
        response.pages[page].fields = response.pages[page].fields
          .map((field) => {
            field.response = this.state.responses[page][field.id].response;
            return field;
          });
      }

      return response;
    } else {
      // theoretically unreachable, but this.state.form is nullable
      // because we need an initial state
      throw 'Form is null';
    }
  }

  isLastPage(): boolean {
    return !!(this.state.form && (this.state.currentPage === this.state.form.pages.length - 1));
  }

  onNewForm(form: FormDefinition): void {
    const mapFieldsToPageOfResponses = (page: PageOfResponses, field: FieldDefinition): PageOfResponses => {
      page[field.id] = {
        waitingForResponse: !!field.required,
        response: ''
      };
      return page;
    };

    const pagesOfResponses: PageOfResponses[] = form.pages.map((page: PageDefinition) => {
      return page.fields.reduce(mapFieldsToPageOfResponses, {});
    });

    this.setState({ ...this.state, form: form, responses: pagesOfResponses });
  }

  onFieldResponse(fieldId: string, fieldResponse: string) {
    const updatedResponsePage = { ...this.state.responses[this.state.currentPage] };
    updatedResponsePage[fieldId] = {
      waitingForResponse: false,
      response: fieldResponse
    };

    const updatedResponses = [...this.state.responses];
    updatedResponses.splice(this.state.currentPage, 1, updatedResponsePage);

    let nextPage = this.state.currentPage;
    let turnThePage = !this.isLastPage();

    // updatedResponsePage.reduce() on waitingForResponse
    for (let fr in updatedResponsePage) {
      if (updatedResponsePage.hasOwnProperty(fr)) {
        if (!turnThePage) { break; }
        turnThePage = !updatedResponsePage[fr].waitingForResponse;
      }
    }

    if (turnThePage) { nextPage += 1; }

    return this.setState({ ...this.state, currentPage: nextPage, responses: updatedResponses });
  }

  onSubmit() {
    const response = this.mergeFormAndResponses();
    this.props.onSave(response);
  }

  onSkip() {
    this.setState({ ...this.state, hasSkippedPages: true }, () => {
      if (this.state.currentPage === (this.state.form && this.state.form.pages.length - 1)) {
        this.onSubmit();
      } else {
        this.setState({ ...this.state, currentPage: (this.state.currentPage + 1) });
      }
    });
  }

  onDismiss() {
    // TODO: form dismissal is done OUTSIDE of this component.
    // this means the form response actually needs to be injected by a
    // parent container, and we need to modify that here. This means
    // the parent container is coupled to this form (problematic for
    // a reusable modal)
    // the alternative is sending in a prop, and calling this handler
    // in componentWillRecieveProps, but that's not very Reactive
    const response = this.mergeFormAndResponses();
    response.responseStatus = 'dismissed';
    this.props.onSave(response);
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
        {this.isLastPage() &&
          <div>
            <button onClick={this.onSubmit}>{this.state.form && this.state.form.submitText}</button>
          </div>
        }
      </div>
    );
  }
}
