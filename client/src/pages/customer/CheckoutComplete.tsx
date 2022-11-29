import React from "react"
import PageWrapper from "../common/PageWrapper";
import {GlobalState} from "../../common/types";

type CheckoutCompleteProps = {
    state: GlobalState,
    updateGlobalState: (newState: GlobalState) => void
}

function CheckoutComplete({ state, updateGlobalState }: CheckoutCompleteProps) {

    return <PageWrapper state={state} updateGlobalState={updateGlobalState}>
            <h1>Thank you for your order</h1>
    </PageWrapper>
}

export default CheckoutComplete;
