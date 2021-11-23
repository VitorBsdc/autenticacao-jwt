import React, { useEffect, useState } from "react";
import Axios from "axios";

import Test from "../pages/Test";

import "./Registration.css";

export default function Registration(limparOne) {
  const [usernameReg, setUsernameReg] = useState("");
  const [passwordReg, setPasswordReg] = useState("");

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [loginStatus, setLoginStatus] = useState(false);

  Axios.defaults.withCredentials = true;

  const register = () => {
    Axios.post("http://localhost:3001/register", {
      username: usernameReg,
      password: passwordReg,
    }).then((response) => {
      console.log(response);
    });
  };

  const login = () => {
    Axios.post("http://localhost:3001/login", {
      username: username,
      password: password,
    }).then((response) => {
      if (! response.data.auth) {
        setLoginStatus(false);
      } else {
        localStorage.setItem("token", response.data.token)
        setLoginStatus(true);
      }
    });
  };

  const userAuthenticated = () => {
    Axios.get("http://localhost:3001/isUserAuth", {
      headers: {
        "x-access-token": localStorage.getItem("token"),
      },
    }).then((response) => {
        console.log(response);
      });
  };

  useEffect(() => {
    Axios.get("http://localhost:3001/login").then((response) => {
      if (response.data.loggedIn === true) {
        setLoginStatus(response.data.user[0].username);
      }
    });
  }, []);

  return (
    <div className="App">
      <h1>Nexus Group</h1>
      <div className="registration">
        <h1>Registrar</h1>
        <input
          id="inputOne"
          type="text"
          placeholder="Criar usuário"
          onChange={(e) => {
            setUsernameReg(e.target.value);
          }}
        />
        <input
          type="text"
          placeholder="Criar senha"
          onChange={(e) => {
            setPasswordReg(e.target.value);
          }}
        />
        <button onClick={register}> Registrar </button>
      </div>

      <div className="login">
        <h1>Login</h1>
        <input
          type="text"
          placeholder="Usuário"
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
        <input
          type="password"
          placeholder="Senha"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <button onClick={login}> Login </button>
        {loginStatus && (
        <button onClick={userAuthenticated}> Check if Authenticated </button>
      )}
      </div>
    </div>

);
}
