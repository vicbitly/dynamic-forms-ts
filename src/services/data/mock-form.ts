import { FormDefinition } from '../../types';

export const formConfig: FormDefinition = {
    id: 'onboarding',
    version: '1.0',
    submitText: 'Start creating Bitlinks',
    skipText: 'Skip this step',

    pages: [
        {
            fields: [
                {
                    id: 'first-headline',
                    fieldType: 'content-headline',
                    label: `Leading Text!`,

                    config: {}
                },
                {
                    id: 'first-blurb',
                    fieldType: 'content-normal',
                    label: `This is some explanatory content!`,

                    config: {}
                },
                {
                    id: 'fieldOne',
                    fieldType: 'pick-one-buttons',
                    label: ``,
                    required: true,

                    config: {
                        options: [
                            {
                                key: 'stuff',
                                display: 'Option One'
                            },
                            {
                                key: 'otherStuff',
                                display: 'Option Two'
                            },
                            {
                                key: '',
                                display: 'Other'
                            }
                        ]
                    }
                }
            ]
        },
        {
            fields: [
                {
                    id: 'second-headline',
                    fieldType: 'content-headline',
                    label: `More pages to this form!`,

                    config: {}
                },
                {
                    id: 'fieldTwo',
                    fieldType: 'pick-one-buttons',
                    label: `This is a second question`,
                    required: true,

                    config: {
                        options: [
                            {
                                key: 'things',
                                display: 'Things!'
                            },
                            {
                                key: 'stuff',
                                display: 'Stuff!'
                            },
                            {
                                key: 'nonsense',
                                display: 'Nonsensical Noise'
                            }
                        ]
                    }
                },
                {
                    id: 'fieldThree',
                    fieldType: 'pick-one-buttons',
                    label: `How are you?`,
                    required: true,

                    config: {
                        options: [
                            {
                                key: 'ok',
                                display: 'Just Ok'
                            },
                            {
                                key: 'good',
                                display: 'Not Bad'
                            },
                            {
                                key: 'great',
                                display: 'Good'
                            },
                            {
                                key: 'awesome',
                                display: 'Best Ever'
                            },
                            {
                                key: '',
                                display: 'Other'
                            }
                        ]
                    }
                }
            ]
        }
    ]
};
