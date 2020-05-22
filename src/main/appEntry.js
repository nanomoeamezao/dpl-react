import React, { Component } from "react";
import {  Table, Container, Input , ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText} from "reactstrap";
import { socket } from "../global/header";
import { entryPush, statUpd } from "../reducers/red";
import { connect } from "react-redux";
const mapDispatchToProps = dispatch =>{
        return {
            entryPush: testPayload => dispatch(entryPush(testPayload)),
            statUpd: pl => dispatch(statUpd(pl))

        }
    }

class ConnectedAppEntry extends Component{
    constructor(props){
        super(props);
        this.state ={
            id:'',
            name:'',
            theme:'',
            status:'',
            logs: []
        };
    }

    
    loadApp = data=>{
        this.setState({id: data[0][0].id, name: data[0][0].name, theme: data[0][0].theme, status: data[0][0].status, logs: data[1]});
        const st = {id: this.state.id, name: this.state.name, theme: this.state.theme, status: this.state.status};
        this.props.entryPush(st)
    };

    logsUpdate = data =>{
        this.setState({logs: data});
        console.log("logs updated");
    };

    componentDidMount(props){
        socket.emit("reqApp", this.props.match.params.id);
        console.log("sending applications request with id: "+ this.props.match.params.id);
        socket.on("resApp", this.loadApp);
        socket.on("logsUpdate", this.logsUpdate);
    }

    componentWillUnmount(){
        socket.off("resApp");
        socket.off("logsUpdate");
    }

    logsInsert(){
        return this.state.logs.map(d=>{
            var time = d.date.toString().slice(0,16);
            return(
                <tr>
                    <td>{d.message}</td>
                    <td>{time}</td>
                </tr>
            )
        });
    }

    render() {
        return (
            <Container>
                <div>
                    <h2>Заявка с кодом {this.props.match.params.id} </h2>
                    {this.state.id!='' ? <Application/> : null}
                </div>
                <div>
                    <Table>
                        <thead>
                            <tr>
                                <th>Сообщение</th>
                                <th>Дата</th>
                            </tr>
                        </thead>
                        {this.logsInsert()}
                    </Table>
                </div>
            </Container>
        );
    }
}
const mapStateToProps = state => {
  return { state };
};
class ConApplication extends Component{
    updateStatus= event => {
        var msg = {
            id: this.props.state.id,
            status: event.target.value
        };
        socket.emit("updateStatus", msg);
        console.log("status update sent");
        this.props.statUpd({ id: msg.id, name: this.props.state.name, status: msg.status, theme: this.props.state.theme} )
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
                    <ListGroup>
                        <ListGroupItem>
                            <ListGroupItemHeading>Имя участника:</ListGroupItemHeading>
                            <ListGroupItemText>{this.props.state.name} </ListGroupItemText>
                        </ListGroupItem>
                        <ListGroupItem>
                            <ListGroupItemHeading>Тема работы:</ListGroupItemHeading>
                            <ListGroupItemText>{this.props.state.theme} </ListGroupItemText>
                        </ListGroupItem>
                        <ListGroupItem>
                            <ListGroupItemHeading>ID работы:</ListGroupItemHeading>
                            <ListGroupItemText>{this.props.state.id}</ListGroupItemText>
                        </ListGroupItem>
                        <ListGroupItem>
                            <ListGroupItemHeading>Статус работы:</ListGroupItemHeading>
                            <ListGroupItemText>
                                <Input type="select" name="select" onChange={this.updateStatus} value={this.props.state.status} size="1">
                                    <option value="approved">approved</option>
                                    <option value='not approved'>not approved</option>
                                </Input>
                            </ListGroupItemText>
                        </ListGroupItem>
                    </ListGroup>
                </div>
            </Container>
        )
    }
}
const Application = connect(mapStateToProps, mapDispatchToProps)(ConApplication)
const AppEntry = connect(null, mapDispatchToProps)(ConnectedAppEntry);
export default AppEntry;