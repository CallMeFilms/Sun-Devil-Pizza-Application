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
    const [asuID, setAsuID] = useState("");
    const navigate = useNavigate();
    function handleSubmit() {
        if(asuID === "123") {
            updateGlobalState({...state, user: {asuID: asuID, role: "orderProcessor"}});
            navigate("/order-processor");
        }else if(asuID === "456") {
            updateGlobalState({...state, user: {asuID: asuID, role: "chef"}});
            navigate("/chef");
        }else if(asuID === "789") {
            updateGlobalState({...state, user: {asuID: asuID, name:"Joe Customer", role: "customer"}});
            navigate("/customer");
        }else{
            alert("Invalid ASU ID");
        }
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
                        type="password"
                        value={asuID}
                        onChange={(e) => setAsuID(e.target.value)}
                    />
                </Form.Group>
                <Button size="lg" type="submit">
                    Login
                </Button>
            </Form>
                </Card.Body>
            </Card>
    </PageWrapper>
    );
}
