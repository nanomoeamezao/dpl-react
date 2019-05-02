import React, { Component } from "react";
import { Button, Table, Container } from "reactstrap";
import { socket } from "../global/header";

function SuccessMsg() {
    return (
        <p>Успешно отправлено</p>
    );
}

class AppForm extends Component{
    constructor(){
        super();
        this.state = {
            name:"",
            theme:"",
            successState: false
        };
        this.onNameChange = this.onNameChange.bind(this);
        this.onThemeChange = this.onThemeChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.successToggle = this.successToggle.bind(this);
    }

    onNameChange(event){
        this.setState({name: event.target.value});
    }
    onThemeChange(event){
        this.setState({theme: event.target.value});
    }
    onSubmit(event){
        event.preventDefault();
        let data = {
            name: this.state.name,
            theme: this.state.theme
        };
        socket.emit('dataSubmit', data);
        socket.on('dataSuccess', ()=>{
            this.successToggle();
            setTimeout(()=>{
                this.successToggle();
            }, 5000);
        })
    }

    successToggle(){
        this.setState(prevState=> ({successState: !prevState.successState}));
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
                {this.state.successState ? <SuccessMsg /> : null}
            </Container>
        );
    }
}
export default AppForm;