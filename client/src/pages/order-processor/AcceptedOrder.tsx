import React from "react";
import PageWrapper from "../common/PageWrapper";
import {GlobalState} from "../../common/types";
type CookingProps = {
    state: GlobalState,
    updateGlobalState: (newState: GlobalState) => void
}

function AcceptedOrder({state, updateGlobalState}: CookingProps) {
    return (
        <div>
            <h1>Accepted Orders</h1>
            {state.accepted.length === 0 && <h2>No orders currently cooking</h2>}
            <ul>
                {state.accepted.map(order => {
                    return <li key={order.orderNum}>{order.firsName} {order.items}</li>
                })}
            </ul>
        </div>
    )
}
export default AcceptedOrder
