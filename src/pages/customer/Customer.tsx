import React from "react";
import {GlobalState} from "../../common/types";
import PageWrapper from "../common/PageWrapper";
import {Card, Form, InputGroup, Tab, Tabs} from "react-bootstrap";
import Button from "react-bootstrap/Button";

type CustomerProps = {
    state: GlobalState,
    updateGlobalState: (newState: GlobalState) => void
}

function Customer({state,updateGlobalState}: CustomerProps) {

    return (
        <PageWrapper state={state} updateGlobalState={updateGlobalState}>
            <h1 style={{textAlign:"center"}}>Welcome to SunDevil Pizza</h1>
            <Card className="col-8 m-auto">
                <Card.Body>
                    <Form>
                    <Tabs>
                        <Tab eventKey="choosePizzaType" title="Choose Pizza Type">
                            <Form.Check type="radio" name="pizzaType" value="Pepperoni" label="Pepperoni" />
                            <Form.Check type="radio" name="pizzaType" value="Vegetable" label="Vegetable" />
                            <Form.Check type="radio" name="pizzaType" value="Cheese" label="Cheese" />
                            <Button>Next &gt;&gt;</Button>
                        </Tab>
                        <Tab eventKey="chooseToppings" title="Choose Toppings">

                        </Tab>
                        <Tab eventKey="checkout" title="Checkout">

                        </Tab>
                    </Tabs>
                    </Form>
                </Card.Body>
            </Card>
        </PageWrapper>
    )
}
export default Customer
