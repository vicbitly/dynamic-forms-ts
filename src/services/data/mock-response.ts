export const formResponse = {

    id: 'onboarding',
    version: '1.0',
    submitText: 'Start creating Bitlinks',
    skipText: 'Skip this step',

    userId: 'vicbitly',
    orgGuid: 'O01106zkyJS',
    brandGuid: 'B01102LRB8d',
    responseStatus: 'complete',

    pages: [
        {
            fields: [
                {
                    id: 'first-headline',
                    fieldType: 'content-headline',
                    label: `Hey There!`,

                    config: {}
                },
                {
                    id: 'first-blurb',
                    fieldType: 'content-normal',
                    label: `Welcome to Bitly. We'd love to work with you to get the most out of the product`,

                    config: {}
                },
                {
                    id: 'second-blurb',
                    fieldType: 'content-normal',
                    label: `Let us know what you plan on using us for:`,

                    config: {}
                },
                {
                    id: 'industry',
                    fieldType: 'pick-one-buttons',
                    label: ``,
                    required: true,
                    response: 'productTech',

                    config: {
                        options: [
                            {
                                key: 'digitalMarketing',
                                display: 'Digital Marketing'
                            },
                            {
                                key: 'productTech',
                                display: 'Product / Tech'
                            },
                            {
                                key: 'social',
                                display: 'Social Media'
                            },
                            {
                                key: 'prComms',
                                display: 'PR / Comms'
                            },
                            {
                                key: 'customerService',
                                display: 'Customer Service'
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
                    label: `Let's keep this short!`,

                    config: {}
                },
                {
                    id: 'teamtype',
                    fieldType: 'pick-one-buttons',
                    label: `How do you use Bitly?`,
                    required: true,
                    response: 'both',

                    config: {
                        options: [
                            {
                                key: 'personal',
                                display: 'Personal'
                            },
                            {
                                key: 'work',
                                display: 'Work'
                            },
                            {
                                key: 'both',
                                display: 'Both Personal and Work'
                            }
                        ]
                    }
                },
                {
                    id: 'companysize',
                    fieldType: 'pick-one-buttons',
                    label: `What is the size of your company?`,
                    required: true,
                    response: '50-200',

                    config: {
                        options: [
                            {
                                key: '50',
                                display: 'Less than 50'
                            },
                            {
                                key: '50-200',
                                display: '50-200'
                            },
                            {
                                key: '200-500',
                                display: '200-500'
                            },
                            {
                                key: '500-1000',
                                display: '500-1000'
                            },
                            {
                                key: '1000',
                                display: 'More than 1000'
                            },
                            {
                                key: 'na',
                                display: 'Not Applicable'
                            }
                        ]
                    }
                },
                {
                    id: 'jobtitle',
                    fieldType: 'pick-one-buttons',
                    label: `What is your job title?`,
                    required: true,
                    response: 'contributor',

                    config: {
                        options: [
                            {
                                key: 'owner',
                                display: 'Owner'
                            },
                            {
                                key: 'contributor',
                                display: 'Individual Contributor'
                            },
                            {
                                key: 'manager',
                                display: 'Manager'
                            },
                            {
                                key: 'director',
                                display: 'Director'
                            },
                            {
                                key: 'vp',
                                display: 'VP'
                            },
                            {
                                key: 'executive',
                                display: 'Executive'
                            },
                            {
                                key: 'na',
                                display: 'Not Applicable'
                            }
                        ]
                    }
                }
            ]
        }
    ]
};
