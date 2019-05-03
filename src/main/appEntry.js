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


    loadApp = data=>{
        this.setState({id: data[0].id, name: data[0].name, theme: data[0].theme, status: data[0].status});
        console.log("recieved application data, testing new state: " + this.state.name);
        console.log(data[0]);
    };

    componentDidMount(props){
        socket.emit("reqApp", this.props.match.params.id);
        console.log("sending applications request with id: "+ this.props.match.params.id);
        socket.on("resApp", this.loadApp)
    }

    componentWillUnmount(){
        socket.off("resApp");
    }

    render() {
        var d=this.state;
        return (
            <Container>
                <div>
                    <h1>TESTING PROPS {this.props.match.params.id} </h1>
                    {this.state.id!='' ? <Application data={d}/> : null}
                </div>
            </Container>
        );
    }
}

class Application extends Component{
    constructor(props){
        super(props);
        this.state ={
            id: props.data.id,
            name: props.data.name,
            theme: props.data.theme,
            status: props.data.status
        };
    }
    updateStatus= event => {
        var msg = {
            id: this.state.id,
            status: event.target.value
        };
        socket.emit("updateStatus", msg);
        this.setStatus(msg);
        console.log("status update sent");
    };
    setStatus = data =>{
        console.log("recieved status update for id: "+ data.id);
        if(this.state.id == data.id)
        this.setState({status: data.status});
    };
    componentDidMount(){
        socket.on("statusUpdated", this.setStatus);
    }
    componentWillUnmount(){
        socket.off("statusUpdated");
    }
    render(){
        return(
            <Container>
                <div>
                    <p> Имя участника: {this.state.name} </p>
                    <p> Тема работы: {this.state.theme} </p>
                    <p> ID работы: {this.state.id} </p>
                    <p> Статус работы:
                        <select onChange={this.updateStatus} value={this.state.status} size="1">
                            <option value="approved">approved</option>
                            <option value='not approved'>not approved</option>
                        </select>
                    </p>
                </div>
            </Container>
        )
    }
}

export default AppEntry;