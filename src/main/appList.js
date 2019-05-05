import React, { Component } from "react";
import { Button, Table, Container } from "reactstrap";
import { socket } from "../global/header";
import { NavLink } from "react-router-dom";
import update from 'immutability-helper';

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


    statusUpdate = data=>{
        const id = data.id;
        const stsUpd = update(this.state.tableData, {[id-1]: {status: {$set: data.status}}});
        console.log(data);
        this.setState({tableData: stsUpd});

    };

    componentDidMount(){
        console.log(" sending request");
        socket.emit("dataRequest");
        socket.on("dataResponse", this.dataUpdate);
        socket.on('statusUpdated', this.statusUpdate);
    }

    componentWillUnmount(){
        socket.off("dataResponse");
        socket.off('statusUpdated');
    }

    insertData(){
        return this.state.tableData.map(d=>{
            return(
                <tr key={d.id}>
                    <td>{d.id}</td>
                    <td>{d.name}</td>
                    <td>{d.theme}</td>
                    <td>{d.status}</td>
                    <td><NavLink to={'/appentry/'+d.id}>О заявке</NavLink></td>
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