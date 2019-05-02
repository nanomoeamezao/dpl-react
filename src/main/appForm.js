import React, { Component } from "react";
import { Button, Table, Container } from "reactstrap";
import { socket } from "../global/header";

class AppForm extends Component{
    constructor(){
        super();
        this.state = {
            name:"",
            theme:""
        };
        this.onNameChange = this.onNameChange.bind(this);
        this.onThemeChange = this.onThemeChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onNameChange(event){
        this.setState({name: event.target.value});
    }
    onThemeChange(event){
        this.setState({theme: event.target.value});
    }
    onSubmit(event){
        let data = {
            name: this.state.name,
            theme: this.state.theme
        }
        socket.emit('submitData', data);
    }

    render() {
        return (
            <Container>
                <h1>Форма подачи заявки</h1>
                <form onSubmit={this.onSubmit}>
                    <input type="text" onChange={this.onNameChange} className="name" placeholder="Имя подающего"/>
                    <input type="text" onChange={this.onThemeChange} className="theme" placeholder="Тема работы"/>
                    <input type="submit" value="Отправить" />
                </form>
            </Container>
        );
    }
}
export default AppForm;