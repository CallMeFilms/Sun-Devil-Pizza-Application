import React from "react";
import PageWrapper from "../common/PageWrapper";
import {GlobalState, Order} from "../../common/types";
import {Card, Form, InputGroup, Tab, Tabs} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import OrderListing from "../common/OrderListing";
type OrderQueueProps = {
    state: GlobalState,
    updateGlobalState: (newState: GlobalState) => void
}
function OrderQueue({state, updateGlobalState}: OrderQueueProps) {
    function incrementStatus(order: Order) {
        fetch(`http://localhost:3001/incrementStatus`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({orderNumber: order.orderNum})
        }).then(result => {
            if (result.status === 200) {
                updateGlobalState({
                    ...state,
                    readyToCook: state.readyToCook.filter(curOrder => curOrder.orderNum !== order.orderNum),
                    cooking: [...state.cooking, order]
                })
            } else {
                throw new Error("Bad Server Response");
            }
        })
    }
    return (
        <div>
            <h1>OrderQueue</h1>
            <Card className="col-8 m-auto">
                <Card.Body>
                   <OrderListing orders={state.readyToCook} updateOrder={incrementStatus} actionName={"Start Cooking"}/>
                </Card.Body>
            </Card>
        </div>
    )
}
export default OrderQueue;
