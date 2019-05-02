import React, { Component } from "react";
import { Button, Table, Container } from "reactstrap";
import { socket } from "../global/header";

class AppEntry extends Component{
    constructor(){
        super();
    }
    render() {
        return (
            <Container>
                <p> teest return for appEntry</p>
            </Container>
        );
    }
}
export default AppEntry;