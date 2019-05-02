import React, { Component } from "react";
import { Button, Table, Container } from "reactstrap";
import { socket } from "../global/header";

class AppEntry extends Component{
    constructor(props){
        super(props);
        this.state ={
            id:'',
            name:'',
            theme:'',
            status:''
        };
    }

    updateApp = data=>{
        this.setState({id: data[0].id, name: data[0].name, theme: data[0].theme, status: data[0].status});
        console.log("recieved application data, testing new state: " + this.state.name);
        console.log(data[0]);
    };

    componentDidMount(props){
        socket.emit("reqApp", this.props.match.params.id);
        console.log("sending applications request with id: "+ this.props.match.params.id);
        socket.on("resApp", this.updateApp)
    }

    componentWillUnmount(){
        socket.off("resApp");
    }

    insertApplication(){
        return(
            <div>
                <p> Имя участника: {this.state.name} </p>
                <p> Тема работы: {this.state.theme} </p>
                <p> ID работы: {this.state.id} </p>
                <p> Статус работы: {this.state.status}</p>
            </div>

        );
    }

    render() {
        return (
            <Container>
                <div>
                    <h1>TESTING PROPS {this.props.match.params.id} </h1>
                    <p>{this.insertApplication()}</p>
                </div>
            </Container>
        );
    }
}
export default AppEntry;