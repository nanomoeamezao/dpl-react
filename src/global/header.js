import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import socketIOClient from "socket.io-client";
import { Navbar, Nav, NavItem } from "reactstrap";

var socket;
class Header extends Component {
    constructor() {
        super();
        this.state = {
            endpoint: 'http://localhost:3001/'
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
                            <NavLink exact to="/" className="nav-link">Список заявок</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink to="/appform" className="nav-link">Подать заявку</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink to="/test" className="nav-link">test</NavLink>
                        </NavItem>
                    </Nav>
                </Navbar>
            </header>
        );
    }
}
export { Header, socket };