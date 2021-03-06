import React, { Component } from 'react';
import axios from "axios";
import SVGInline from 'react-inlinesvg';

import { Link, Redirect } from 'react-router-dom'


import SignupForm from './SignupForm'
import { ThirdPartyAuth } from '../../../components'

class Signup extends Component {
  constructor(props) {
    super(props)

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit({ name, email, password }) {
    // event.preventDefault();
      this.props.signupUser({name, email, password});
      //FIXME: Make this an automatic redirect if user is authenticated in store.
      this.props.history.push('/profile');
  }

  render(){
    if ( this.props.isAuth ) return (<Redirect to='/profile'/>);

    return (
    <div>
      <div className="uSignup__top">
        <h1> No Middlemen, No Shady Gigs, Just Music... </h1>
      </div>
      <div className="uSignup">
        <div className="uSignup__left">
          <div>
            <h2> Sign Up for BandSpace today! </h2>
            <p> Get connecting with other working musicians and venues in your area </p>
            <hr />

            <SignupForm onSubmit={this.handleSubmit} />
            <ThirdPartyAuth />
            <Link to="/auth/login"> <p>Already a member? Log in here </p></Link>
          </div>
        </div>
        <div className="uSignup__right">
          <SVGInline src="/img/GuitarFloat.svg" />
        </div>
      </div>
    </div>
    )
  }
}

export default Signup;
