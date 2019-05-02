import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import socketIOClient from "socket.io-client";
//import "./header.css";

var socket;
class Header extends Component {
    constructor() {
        super();
        this.state = {
            endpoint: 'http://localhost:3001/'
        };
        socket = socketIOClient(this.state.endpoint);
    }
    render() {
        return (
            <header>
                <nav>
                    <ul className="NavClass">
                        <li>
                            <NavLink exact to="/">Список заявок</NavLink>
                        </li>
                        <li>
                            <NavLink to="/appform">Подать заявку</NavLink>
                        </li>
                    </ul>
                </nav>
            </header>
        );
    }
}
export { Header, socket };