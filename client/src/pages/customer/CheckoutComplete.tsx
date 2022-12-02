import React from "react"
import PageWrapper from "../common/PageWrapper";
import {GlobalState} from "../../common/types";
import { Card } from "react-bootstrap";

type CheckoutCompleteProps = {
    state: GlobalState,
    updateGlobalState: (newState: GlobalState) => void
}

function CheckoutComplete({ state, updateGlobalState }: CheckoutCompleteProps) {

    return <PageWrapper state={state} updateGlobalState={updateGlobalState}>
        <Card>
            <Card.Header>
                <h1>Thank you for your order!</h1>
            </Card.Header>
            <Card.Body>
                <h4>
                    You will receive an email when your order is ready for pickup.
                </h4>
            </Card.Body>
        </Card>
    </PageWrapper>
}

export default CheckoutComplete;
