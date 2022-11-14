import React from "react";
import PageWrapper from "../common/PageWrapper";
import {GlobalState} from "../../common/types";
import {Card, Form, InputGroup, Tab, Tabs} from "react-bootstrap";
import Button from "react-bootstrap/Button";
type CookingProps = {
    state: GlobalState,
    updateGlobalState: (newState: GlobalState) => void
}

function FinishedOrder({state, updateGlobalState}: CookingProps) {
    return (

        <div>
            <h1>Finished Orders</h1>
            <Card className="col-8 m-auto">
                <Card.Body>
                    <Form>
                        <Form.Group><Form.Check type="radio" label={"Order #1: Jane Customer ASU ID:1110002343 Pickup Time: 11:00 AM\nPizza Type: Cheese\nToppings: Onions"}/></Form.Group>
                    </Form>
                </Card.Body>
            </Card>
            {/*{state.finished.length === 0 && <h2>No orders currently cooking</h2>}*/}
            {/*<ul>*/}
            {/*    {state.finished.map(order => {*/}
            {/*        return <li key={order.orderNum}>{order.firsName} {order.items}</li>*/}
            {/*    })}*/}
            {/*</ul>*/}
        </div>
    )
}
export default FinishedOrder
