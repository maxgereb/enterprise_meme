import React from 'react';
import PropTypes from 'prop-types';
import {Users} from './../api/users';
import {Accounts} from 'meteor/accounts-base';
import * as ReactBootstrap from 'react-bootstrap';
export default class RegisterForm extends React.Component{
  handleRegister(event){
    /* Extracting user data */
    let email = event.target.email.value;
    let password = event.target.password.value;

    event.preventDefault();

  /* Handle empty fields */

    console.log(email," ",password);
    /* Clears input fields */

    event.target.email.value = '';
    event.target.password.value = '';


    Accounts.createUser({email,password},(err)=>{
      console.log("User", email, "created");

    });


  }
  render(){
    return(
      <div>
        <form onSubmit={this.handleRegister}>


              <input type="email" id="email" placeholder="Email"/>
             
            <div>
              <input type="password" id="password" placeholder="Password"/>
            </div>



            <div>
              <ReactBootstrap.Button type="submit" bsStyle="success" bsSize="small">
                  Register
              </ReactBootstrap.Button>

            </div>
          </form>
      </div>
    );
  }

}
