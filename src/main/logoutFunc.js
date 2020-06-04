import React from 'react';
import Auth from '../modules/auth';
import { Redirect} from "react-router-dom";
import {updAuth} from "../reducers/red"
import { connect } from "react-redux";

function mapDispatchToProps(dispatch){
    return {
        updAuth: payload => dispatch(updAuth(payload))
    }
}
const LogoutFunc = (props) =>{
    Auth.deauthenticateUser()
    props.updAuth({authenticated: false})
    return < Redirect to="/" />
    
  }

export default connect(null, mapDispatchToProps)( LogoutFunc )