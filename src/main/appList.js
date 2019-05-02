import React, { Component } from "react";
import { Button, Table, Container } from "reactstrap";
import { socket } from "../global/header";

class AppList extends Component{
    constructor(){
        super();
        this.state = {
            tableData: []
        };
    }

    dataUpdate = data =>{
        this.setState({ tableData: data});
        console.log("got data from server: ");
        console.log(data);
    };

    componentDidMount(){
        console.log(" sending request");
        socket.emit("dataRequest");
        socket.on("dataResponse", this.dataUpdate)
    }

    componentWillUnmount(){
        socket.off("dataResponse");
    }

    insertData(){
        return this.state.tableData.map(d=>{
            return(
                <tr key={d.id}>
                    <td>{d.id}</td>
                    <td>{d.name}</td>
                    <td>{d.theme}</td>
                </tr>
            );
        });
    }
    render() {
        return (
            <Container>
                <Table className="data">
                    <thread>
                        <tr>
                            <th>id</th>
                            <th>Имя</th>
                            <th>Тема</th>
                        </tr>
                    </thread>
                    <tbody>{this.insertData()}</tbody>
                </Table>
            </Container>
        );
    }

}
export default AppList;