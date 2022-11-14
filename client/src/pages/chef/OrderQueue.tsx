import React from "react";
import PageWrapper from "../common/PageWrapper";
import {GlobalState} from "../../common/types";

type OrderQueueProps = {
    state: GlobalState,
    updateGlobalState: (newState: GlobalState) => void
}
function OrderQueue({state, updateGlobalState}: OrderQueueProps) {
    return (
        <div>
            <h1>OrderQueue</h1>
            {state.readyToCook.length === 0 && <h2>No orders in queue</h2>}
            <ul>
                {state.readyToCook.map(order => {
                    return <li key={order.orderNum}>{order.firsName} {order.items}</li>
                })}
            </ul>
        </div>
    )
}
export default OrderQueue
