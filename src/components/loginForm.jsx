import React, { Component } from 'react';
import Input from './common/input';
import Joi from '@hapi/joi';

class LoginForm extends Component {
    state = { 
        data: { username: "", password: ""},
        errors: {}
     }

    schema = {
        username : Joi.string().min(4).max(30).required().label('Username'),
        password : Joi.string().min(8).max(30).required().label('Password')

    }

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
        console.log("Submitted");
    }
    render() { 
        const {data, errors} = this.state;

        return (
            <div>
                <h1>Login</h1>
                <form onSubmit={this.handleSubmit}>
                    <Input
                        name="username"
                        value={data.username}
                        label="Username"
                        onChange={this.handleChange}
                        error={errors.username}
                    />
                    <Input
                        name="password"
                        value={data.password}
                        label="Password"
                        onChange={this.handleChange}
                        error={errors.password}
                    />
                    <button disabled={this.validate()} className="btn btn-primary">Login</button>
                </form>
            </div>
          );
    }
}
 
export default LoginForm;