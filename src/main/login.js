import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Auth from "../modules/auth";

const RedirErr = (props) =>(
<p>{String(props["err"])}</p>
)

function Login(props) {
    const [login, setLogin] = useState("");
    const [pass, setPass] = useState("");
    const [errors, setErrors] = useState("");
    let history = useHistory();
    function catchSubmit(e) {
        e.preventDefault();
        const data = `email=${login}&password=${pass}`;
        fetch("/auth/login", {
            method: "POST",
            headers: {
                "Content-type": "application/x-www-form-urlencoded",
            },
            body: data,
        })
            .then((resp) => resp.json())
            .then((resp) => {
                if (resp.success) {
                    Auth.authenticateUser(resp.token);
                    history.push("/");
                } else {
                    const errors = resp.errors ? resp.errors : {};
                    errors.summary = resp.message;

                    setErrors( String(errors.summary ));
                }
            });
    }
    function handleLogin(e) {
        setLogin(e.target.value);
    }
    function handlePass(e) {
        setPass(e.target.value);
    }
    return (
        <div>
            <p>ENTER YOUR CREDENTIALS</p>
            <form onSubmit={catchSubmit}>
                <input type="text" id="login" value={login} onChange={handleLogin}></input>
                <input type="password" id="pass" value={pass} onChange={handlePass}></input>
                <input type="submit" value="SUBMIT"></input>
            </form>
            <div>
                {props.location.state ? <RedirErr err={props.location.state.err}/> : null  }
                <p>{errors}</p>
            </div>
        </div>
    );
}

export default Login;
