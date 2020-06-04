import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import socketIOClient from "socket.io-client";
import { Navbar, Nav, NavItem } from "reactstrap";
import Auth from "../modules/auth.js";
import {connect } from "react-redux"

const mapStateToProps = state =>{
    return {authenticated: state.authReducer.authenticated}
}

var socket;
class ConHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            endpoint: "http://localhost:3001/"
        };
        socket = socketIOClient();
    }

    render() {
        return (
            <header>
                <h1>Гагаринские чтения</h1>
                <Navbar color="light" light expand="md">
                    <Nav pills>
                        <NavItem>
                            <NavLink exact to="/" className="nav-link">
                                Список заявок
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink to="/appform" className="nav-link">
                                Подать заявку
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink to="/test" className="nav-link">
                                test
                            </NavLink>
                        </NavItem>
                        {this.props.authenticated ? (
                            <NavItem>
                                <NavLink to="/logout" className="nav-link">
                                    logout
                                </NavLink>
                            </NavItem>
                        ) : (
                            <NavItem>
                                <NavLink to="/login" className="nav-link">
                                    login
                                </NavLink>
                            </NavItem>
                        )}
                    </Nav>
                </Navbar>
            </header>
        );
    }
}
const Header = connect(mapStateToProps)(ConHeader)
export { Header, socket };
