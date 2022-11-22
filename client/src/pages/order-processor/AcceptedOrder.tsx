import React from "react";
import PageWrapper from "../common/PageWrapper";
import {GlobalState} from "../../common/types";
import {Card, Form, InputGroup, Tab, Tabs} from "react-bootstrap";
import Button from "react-bootstrap/Button";
type CookingProps = {
    state: GlobalState,
    updateGlobalState: (newState: GlobalState) => void
}

function AcceptedOrder({state, updateGlobalState}: CookingProps) {
    return (
        <div>
            <h1>Accepted Orders</h1>
            <Card className="col-8 m-auto">
                <Card.Body>
                    <Form>
                        <Form.Group><Form.Check type="radio" label={"Order #2: Joe Customer ASU ID:1234567890 Pickup Time: 11:15 AM\nPizza Type: Cheese\nToppings: Olives, Onions"}/></Form.Group>
                        <Form.Group><Form.Check type="radio" label={"Order #3: Rick Shopper ASU ID:2468101214 Pickup Time: 11:20 AM\nPizza Type: Cheese\nToppings: Pepperoni"}/></Form.Group>
                    </Form>
                </Card.Body>
            </Card>
            {/*{state.accepted.length === 0 && <h2>No orders currently cooking</h2>}*/}
            {/*<ul>*/}
            {/*    {state.accepted.map(order => {*/}
            {/*        return <li key={order.orderNum}>{order.firsName} {order.items}</li>*/}
            {/*    })}*/}
            {/*</ul>*/}
        </div>
    )
}
export default AcceptedOrder
