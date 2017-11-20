import * as React from 'react';
import { DynamicFieldProps, FieldButtonListConfig } from '../types';

interface State {
    response: string;
    showOther: boolean;
}

export class ButtonListComponent extends React.Component<DynamicFieldProps, State> {
    constructor(props: DynamicFieldProps, context: object) {
        super(props, context);

        this.getInitialState = this.getInitialState.bind(this);
        this.toggleTextbox = this.toggleTextbox.bind(this);
        this.onClick = this.onClick.bind(this);
        this.onResponse = this.onResponse.bind(this);
        this.onTextChange = this.onTextChange.bind(this);
        this.onTextSubmit = this.onTextSubmit.bind(this);

        this.state = this.getInitialState();
    }

    getInitialState() {
        return {
            response: '',
            showOther: false
        };
    }

    toggleTextbox() {
        this.setState({...this.state, showOther: true});
    }

    onClick(e: React.MouseEvent<HTMLButtonElement>) {
        const btn = e.target as HTMLButtonElement;
        if (btn.value === '') {
            this.toggleTextbox();
        } else {
            this.onResponse(btn.value);
        }
    }

    onTextChange(e: React.ChangeEvent<HTMLInputElement>) {
        this.setState({...this.state, response: e.target.value});
    }

    onTextSubmit() {
        this.onResponse(this.state.response);
    }

    onResponse(response: string) {
        this.props.onResponse(this.props.id, response);
    }

    render() {
        return (
            <div>
                {!this.state.showOther && <div>
                    {(this.props.config as FieldButtonListConfig).options.map((btn) => {
                        return <button
                            key={btn.key}
                            value={btn.key}
                            onClick={this.onClick}
                        >
                            {btn.display}
                        </button>;
                    })}
                </div>}
                {this.state.showOther && <div>
                    <p>
                    Please specify "other":
                    </p>
                    <input
                        type="text"
                        value={this.state.response}
                        onChange={this.onTextChange}
                    />
                    <button
                        onClick={this.onTextSubmit}
                    >
                        Submit
                    </button>
                </div>}
            </div>
        );
    }
}
