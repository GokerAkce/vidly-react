import React, { Component } from 'react';
import Input from './input';
import Joi from '@hapi/joi';

class Form extends Component {
    state = {  }

    validate(){
        const errors = {};
        const options = {abortEarly: false};
        const schema = Joi.object(this.schema);
        const { data } = this.state;
        const { error } = schema.validate(data, options);

        if(!error) return null;

        error.details.forEach(item => {
            errors[item.path[0]] = item.message
        });

        return errors;
    }   

    validateProperty = ({name, value}) => {
        const obj = {[name] : value};
        const schema = Joi.object({[name]: this.schema[name]});
        const { error } = schema.validate(obj);
        return !error ? null : error.details[0].message;
    }

    handleChange = ({currentTarget: input}) => {
        const errors = {...this.state.errors};
        const errorMessage = this.validateProperty(input)
        if (errorMessage) errors[input.name] = errorMessage;
        else delete errors[input.name];

        const data = {...this.state.data};
        data[input.name] = input.value;
        this.setState({data, errors});
    }

    handleSubmit = e => {
        e.preventDefault();
        const errors = this.validate();
        this.setState({errors: errors || {} });
        if(errors) return;
        this.doSubmit();
    }

    renderButton(label){
        return <button disabled={this.validate()} className="btn btn-primary">{label}</button>
    }

    renderInput(name, label, type = 'text'){
        const {data, errors} = this.state;

        return <Input
            name={name}
            type={type}
            value={data[name]}
            label={label}
            onChange={this.handleChange}
            error={errors[name]}
        />
    }
}


 
export default Form;