import React, { Component } from "react";
import "./App.css";
import { Header } from "./global/header";
import { Switch, Route, Redirect} from "react-router-dom";
import AppList from "./main/appList";
import AppRedux from "./main/appRedux";
import AppForm from "./main/appForm";
import AppEntry from "./main/appEntry";
import Login from "./main/login"
import Auth from "./modules/auth"

const RouteAuthenticated = ({ component: Component, path } ) => {
  if (!Auth.isUserAuthenticated()) {
    return <Redirect to={{pathname: "/login", state: {err: 'You cant visit that page without logging in.'}}} />;
  }

  return <Route component={Component} path={path} />;
};


class App extends Component {
    render() {
        return (
            <div className="App">
                <Header />
                <Switch >
                    <Route path="/test" component={AppRedux} />
                    <Route exact path="/" component={AppList} />
                    <RouteAuthenticated path="/appform" component={AppForm} />
                    <RouteAuthenticated path="/appentry/:id" component={AppEntry} />
                    <Route path="/login" component={Login } />
                </Switch>
            </div>
        );
    }
}


export default App;
