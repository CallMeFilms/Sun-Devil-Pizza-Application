import React from "react";
import PageWrapper from "../common/PageWrapper";
import {GlobalState} from "../../common/types";
type CookingProps = {
    state: GlobalState,
    updateGlobalState: (newState: GlobalState) => void
}

function Cooking({state, updateGlobalState}: CookingProps) {
    return (
        <div>
            <h1>Cooking</h1>
            {state.cooking.length === 0 && <h2>No orders currently cooking</h2>}
            <ul>
            {state.cooking.map(order => {
                return <li key={order.orderNum}>{order.firsName} {order.items}</li>
            })}
            </ul>
        </div>
    )
}
export default Cooking
