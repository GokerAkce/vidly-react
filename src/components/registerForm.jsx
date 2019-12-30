import React from 'react';
import Form from './common/form';
import Joi from '@hapi/joi';

class RegisterForm extends Form {
    state = {
        data: {
            username: '',
            password: '',
            name: ''
        },
        errors: {}
      }

    schema = {
        username: Joi.string().email({tlds: false}).required().label('Username'),
        password: Joi.string().min(4).max(30).required().label('Password'),
        name: Joi.string().min(4).max(30).required().label('Name'),
    }

    doSubmit(){
        console.log('Register Submitted');
    }

    render() { 
        return ( 
           <div>
                <h1>Register</h1>
                <form onSubmit={this.handleSubmit}>
                    {this.renderInput('username', 'Username')}
                    {this.renderInput('password', 'Password', 'password')}
                    {this.renderInput('name', 'Name')}
                    {this.renderButton('Register')}
                </form>
            </div>
         );
    }
}
 
export default RegisterForm;