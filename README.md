**Prototype for dynamic forms in TypeScript**

1) Clone repo!
2) `npm install`
3) `npm run start`

**Component structure**  

`FormContainer` is the controller that mediates between back-end
services and the dynamically loaded React components.

It delegates to services:
- `form-api` is a mock service for managing webservice calls.
- `form-service` is for client-side logic needed to project data
from endpoints to data that `FormContainer` requires. In this
case, it maps from the strings that denote the field type to the
React component that renders that field type. This one service is
a stand-in for a collection of services to do any client-side
work.

`Components` each represent an actual dynamically-defined form
field.

**Form behavior**

This version supports multi-page forms with automated logic for going to the
next page. Fields can be marked `required`, and when all of a page's 
`required` fields have a response, the form goes to the next page. *This has
implications* for fields where it's not clear if a response is completed (for
ex: text inputs). Those field components will need a way to communicate to the
form that their response has been completed.

**Data structure**

The form configuration data and the form responses are managed in
`FormContainer` state:
- `state.form` is an array of dynamic field definitions
- `state.responses` is an array where each element represents a form page. 
Each page is a dictionary where `key` is the field id, and the `response` has
two bits of data: `response` string and `waitingForResponse` which flags if
the field has been answered.

*`state.form`*  
An object with form metadata, plus an array of form pages. The form pages include a `fields` array, where each element represents a dynamic field:  

- `id`: some unique identifier for the dynamic field
- `fieldType`: an identifier for the type of dynamic field
- `label`: the field label
- `config`: an object of config values unique to the fieldType

*`state.responses`*  
An array where each element represents responses to a page's fields. This 
response object is defined dynamically by the `state.form` elements. Each
element is projected into a key-value where the `key` is the `id`
of the field and the value is the state of the user response. If we have a `state.form` like:
```
{... 
    pages: [
        { id: 'username', label: 'User Name' ...},
        { id: 'company', label: 'Company or Organization' ...},
        { id: 'title', label: 'Job Title or Position' ...}
    ]
...}
```

We end up with `state.responses` like: 
```
[{
  username: { response: 'Amy Adams', waitingForResponse: false }
  company: { response: 'StartUp Media, Inc.', waitingForResponse: false }
  title: { response: 'Social Media Manager', waitingForResponse: false }
}]
```
