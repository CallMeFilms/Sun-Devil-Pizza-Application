import React from "react";
import {GlobalState} from "../../common/types";

type CustomerProps = {
    state: GlobalState,
    updateGlobalState: (newState: GlobalState) => void
}

function Customer({state,updateGlobalState}: CustomerProps) {

    return (
        <div>
            <h1>Customer</h1>
        </div>
    )
}
export default Customer
