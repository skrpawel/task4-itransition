import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Form } from "react-bootstrap";
import InputGroup from "react-bootstrap/InputGroup";
import styles from "../register.module.css";
import Cookies from "universal-cookie";
import axios from "axios";


const cookies = new Cookies();


function Login() {
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");

    const loginUser = (e) => {
        e.preventDefault();
        axios.post(`https://task-4-itranistion-backend.herokuapp.com/login`, {
            email,
            password,
        }).then(res => {
            if (!res.request.response.includes('false')) {
                cookies.set("TOKEN", res.data.token, {
                    path: "/",
                });
                alert('Success');
                window.location = "/admin_panel";

            } else {
                alert('Check password and email');
            };
        });
    };


    return (
        <div className="App">
            <div className={styles.formContainer}>
                <div className={styles.formWrapper}>
                    <Form className={styles.form} onSubmit={loginUser}>
                        <h1>Login</h1>
                        <InputGroup className="mb-3">
                            <Form.Control
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                type="email"
                                placeholder="Your email"
                                aria-label="Your email"
                                aria-describedby="basic-addon2"
                            />
                        </InputGroup>
                        <InputGroup className="mb-3">
                            <Form.Control
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                type="password"
                                placeholder="Your password"
                                aria-label="Your password"
                                aria-describedby="basic-addon2"
                            />
                        </InputGroup>
                        <Button type="submit" variant="primary" size="lg" active>
                            Login
                        </Button>{" "}
                    </Form>
                </div>
            </div>
        </div>
    );
}

export default Login;