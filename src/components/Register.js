import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import styles from "../register.module.css";
import axios from "axios";
import moment from "moment";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const url = 'https://task-4-itranistion-backend.herokuapp.com'


  const registerUser = (e) => {
    e.preventDefault();
    console.log('halko');
    try {
      axios.post(`${url}signup`, {
        name,
        email,
        password,
        registration_date: moment().format('LLL'),
        login_date: '',
        status: 'unlocked'
      }).then(res => {
        alert('Created user');
      });
    } catch (e) {
      console.log('blad');
    }
  };


  return (
    <div className={styles.formContainer}>
      <div className={styles.formWrapper}>
        <Form className={styles.form} onSubmit={registerUser}>
          <h1>Sign Up</h1>
          <InputGroup className="mb-3">
            <Form.Control
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              placeholder="Your name"
              aria-label="Your name"
              aria-describedby="basic-addon2"
            />
          </InputGroup>
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
            Create account
          </Button>
        </Form>
      </div>

    </div>
  );
}

export default Register;