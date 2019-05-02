import React, { Component } from "react";
import { Button, Table, Container } from "reactstrap";
import { socket } from "../global/header";

class AppList extends Component{
    constructor(){
        super();
    }

    //reqData = ()=> socket.emit("dataRequest");
    componentDidMount(){
        console.log(" sending request");
        socket.emit("dataRequest");
    }
    // componentWillUnmount(){
    //
    // }

    render() {
        return (
            <Container>
                <table className="data">
                    <tr>
                        <th>id</th>
                        <th>Имя</th>
                        <th>Тема</th>
                    </tr>
                </table>

            </Container>
        );
    }
}
export default AppList;