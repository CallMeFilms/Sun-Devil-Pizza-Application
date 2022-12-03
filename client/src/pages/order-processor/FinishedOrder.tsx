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

function FinishedOrder({state, updateGlobalState}: CookingProps) {
    function incrementStatus(order: Order) {
        fetch(`http://localhost:3001/incrementStatus`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({orderNumber: order.orderNum})
        }).then(result => {
            if (result.status === 200) {
                updateGlobalState({
                    ...state,
                    finished: state.finished.filter(curOrder => curOrder.orderNum !== order.orderNum)
                })
            } else {
                throw new Error("Bad Server Response");
            }
        })
    }
    return (

        <div>
            <h1>Finished Orders</h1>
            <Card className="col-8 m-auto">
                <Card.Body>
                    <OrderListing orders={state.finished} updateOrder={incrementStatus} actionName={"Mark Picked Up"}/>
                </Card.Body>
            </Card>

        </div>
    )
}
export default FinishedOrder
