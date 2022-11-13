import React from "react";
import {GlobalState} from "../../common/types";
import PageWrapper from "../common/PageWrapper";
import {Card} from "react-bootstrap";

type CustomerProps = {
    state: GlobalState,
    updateGlobalState: (newState: GlobalState) => void
}

function Customer({state,updateGlobalState}: CustomerProps) {

    return (
        <PageWrapper state={state} updateGlobalState={updateGlobalState}>

            <Card className="col-8 m-auto">
                <Card.Header>
                    <h1>Welcome to SunDevil Pizza</h1>
                </Card.Header>
                <Card.Body>
                    Choose your pizza
                </Card.Body>
            </Card>
        </PageWrapper>
    )
}
export default Customer
