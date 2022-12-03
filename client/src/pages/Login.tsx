import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {useNavigate, useNavigation} from "react-router";
import {Card} from "react-bootstrap";
import PageWrapper from "./common/PageWrapper";
import {GlobalState} from "../common/types";

type LoginProps = {
    state: GlobalState,
    updateGlobalState: (newState: GlobalState) => void
}

export default function Login( {state, updateGlobalState}: LoginProps) {
    const [username, setusername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    function handleSubmit(event: any) {
        fetch("http://localhost:3001/login", {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username: username,
                password: password,

            })
        }).then(res => {
            if (res.ok) {
                res.text().then(role => {
                    updateGlobalState({...state, user: {username: username, role: role}});
                    switch (role) {
                        case "OP":
                            navigate("/order-processor");
                            break;
                        case "Chef":
                            navigate("/chef");
                            break;
                        default:
                            throw new Error("Bad Server Response");
                            break;
                    }
                })
            }
            if (res.status === 403) {
                alert("Invalid username or password");
            }
        })
        event.preventDefault();
        return false;
    }
    return (
    <PageWrapper state={state} updateGlobalState={updateGlobalState}>
            <Card className="col-6 m-auto mt-3">
                <Card.Header>
                    <h1>Login</h1>
                </Card.Header>
                <Card.Body>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="asuID">
                    <Form.Label>ASU ID</Form.Label>
                    <Form.Control
                        type="text"
                        value={username}
                        placeholder="Username"
                        onChange={(e) => setusername(e.target.value)}
                    />
                    <br/>
                    <Form.Control
                        type="password"
                        value={password}
                        placeholder="Password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Form.Group>
                <br/>
                <Button size="lg" type="submit">
                    Login
                </Button>
            </Form>
                </Card.Body>
            </Card>
    </PageWrapper>
    );
}
