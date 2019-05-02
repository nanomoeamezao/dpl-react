import React, { Component } from "react";
import { Button, Table, Container } from "reactstrap";
import { socket } from "../global/header";

class AppEntry extends Component{
    constructor(props){
        super(props);
    }
    render() {
        return (
            <Container>
                <p> teest return for appEntry {this.props.match.id}</p>
            </Container>
        );
    }
}
export default AppEntry;