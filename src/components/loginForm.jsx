import React from 'react';
import Form from './common/form';
import Joi from '@hapi/joi';
import auth from '../services/authService';

class LoginForm extends Form {
    state = { 
        data: { username: "", password: ""},
        errors: {}
     }

    schema = {
        username : Joi.string().email({tlds: false}).required().label('Username'),
        password : Joi.string().min(6).max(30).required().label('Password')

    }

    doSubmit = async() => {
        const { username, password } = this.state.data
        try {
            await auth.login(username, password);
            window.location = '/';
        } catch (ex) {
            if(ex.response && ex.response.status === 400){
                const errors = {...this.state.errors};
                errors.username = ex.response.data;
                this.setState({ errors });
            }
        }
        
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