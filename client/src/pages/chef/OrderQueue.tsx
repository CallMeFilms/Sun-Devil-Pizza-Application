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
                    <div className="container p-3">
                        {state.readyToCook.length === 0 && <h4>No Orders</h4>}
                        {state.readyToCook.map((order: Order) => {
                            return <div className="align-self-start">
                                <Card.Header>
                                    <h5>
                                        Order #{order.orderNum}
                                    </h5>
                                </Card.Header>
                                <Card.Body>
                                    <div className="d-flex">
                                        <div className="container">
                                            <h5>Name:</h5>
                                            <p>{order.firstName + " " + order.lastName}</p>
                                        </div>
                                        <div className="container">
                                            <h5>Pickup Time:</h5>
                                            <p>{order.pickupTime && (new Date(order.pickupTime)).getHours() > 12 ? (new Date(order.pickupTime)).getHours() - 12 : order.pickupTime && (new Date(order.pickupTime)).getHours()}:{order.pickupTime && (new Date(order.pickupTime)).getMinutes()} {order.pickupTime && (new Date(order.pickupTime)).getHours() > 12 ? "PM" : "AM"}</p>
                                        </div>
                                    </div>
                                    <div className="container d-flex justify-content-between">
                                        <div>
                                            <h5>Order:</h5>
                                            <ul className="list-group">
                                                {order.items?.map(item => {
                                                    return <li className="list-group-item">
                                                        <h6>1 {item.type} Pizza</h6>
                                                        <h6>Toppings:</h6>
                                                        <ul>
                                                            {item.toppings.map((topping: any) => {
                                                                return <li>{topping}</li>
                                                            })}
                                                        </ul>
                                                    </li>;
                                                })}
                                            </ul>
                                        </div>
                                        <div className="p-2 align-self-end">
                                            <button onClick={() => { incrementStatus(order) }} className="btn btn-outline-success align-self-end">Begin Cooking</button>
                                        </div>
                                    </div>
                                </Card.Body>
                            </div>
                        })}
                    </div>
                </Card.Body>
            </Card>
        </div>
    )
}
export default OrderQueue;
