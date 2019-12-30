import React from 'react';
import Input from './common/input';
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