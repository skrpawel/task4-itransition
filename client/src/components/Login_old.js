import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import styles from "../register.module.css";
import axios from "axios";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const loginUser = (e) => {
        e.preventDefault();
        console.log('halko');
        axios.post("http://localhost:5001/login", {
            email,
            password,
        }).then(res => {
            if (!res.request.response.includes('false')) {
                alert('Success');
                window.location = "/admin_panel";
            } else {
                alert('Check password and email');
            };
        });
    };

    return (
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
    );
}

export default Login;



