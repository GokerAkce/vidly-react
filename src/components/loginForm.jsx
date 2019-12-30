import React from 'react';
import Form from './common/form';
import Joi from '@hapi/joi';

class LoginForm extends Form {
    state = { 
        data: { username: "", password: ""},
        errors: {}
     }

    schema = {
        username : Joi.string().min(4).max(30).required().label('Username'),
        password : Joi.string().min(8).max(30).required().label('Password')

    }

    doSubmit(){
        //Ajax calls
        console.log("Sumitted.");
    }
    render() { 
        return (
            <div>
                <h1>Login</h1>
                <form onSubmit={this.handleSubmit}>
                    {this.renderInput('username', 'Username')}
                    {this.renderInput('password', 'Password', 'password')}
                    {this.renderButton('Login')}
                </form>
            </div>
          );
    }
}
 
export default LoginForm;