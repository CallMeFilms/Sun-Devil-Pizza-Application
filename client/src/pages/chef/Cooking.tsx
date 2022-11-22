import React from "react";
import PageWrapper from "../common/PageWrapper";
import {GlobalState} from "../../common/types";
import {Card, Form, InputGroup, Tab, Tabs} from "react-bootstrap";
import Button from "react-bootstrap/Button";
type CookingProps = {
    state: GlobalState,
    updateGlobalState: (newState: GlobalState) => void
}

function Cooking({state, updateGlobalState}: CookingProps) {
    return (
        <div>
            <h1>Cooking</h1>
            <Card className="col-8 m-auto">
                <Card.Body>
                    <Form>
                        <Form.Group><Form.Check type="radio" label={"Order #2:"}/></Form.Group>
                        <Form.Group>Pizza: Cheese w/ Olives, Onions</Form.Group>
                        <Form.Group><Form.Check type="radio" label={"Order #3:"}/></Form.Group>
                        <Form.Group>Pizza: Cheese w/ Pepperoni</Form.Group>
                    </Form>
                </Card.Body>
            </Card>
            {/*{state.cooking.length === 0 && <h2>No orders currently cooking</h2>}*/}
            {/*<ul>*/}
            {/*{state.cooking.map(order => {*/}
            {/*    return <li key={order.orderNum}>{order.firsName} {order.items}</li>*/}
            {/*})}*/}
            {/*</ul>*/}
        </div>
    )
}
export default Cooking
