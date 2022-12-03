import React from "react";
import PageWrapper from "../common/PageWrapper";
import {GlobalState, Order} from "../../common/types";
import {Card, Form, InputGroup, Tab, Tabs} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import OrderListing from "../common/OrderListing";
type CookingProps = {
    state: GlobalState,
    updateGlobalState: (newState: GlobalState) => void
}

function AcceptedOrder({state, updateGlobalState}: CookingProps) {
    function incrementStatus(order: Order) {
        fetch(`http://localhost:3001/incrementStatus`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({orderNumber: order.orderNum})
        }).then(result => {
            if (result.status === 200) {
                updateGlobalState({
                    ...state,
                    accepted: state.accepted.filter(curOrder => curOrder.orderNum !== order.orderNum),
                    readyToCook: [...state.readyToCook, order]
                })
            } else {
                throw new Error("Bad Server Response");
            }
        }).catch(error => console.error);
    }
    return (
        <div>
            <h1>New Orders</h1>
            <Card className="col-8 m-auto">
                <Card.Body>
                    <OrderListing orders={state.accepted} updateOrder={incrementStatus} actionName="Accept"/>
                </Card.Body>
            </Card>
        </div>
    )
}
export default AcceptedOrder
