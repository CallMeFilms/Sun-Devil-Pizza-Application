import React from "react"
import PageWrapper from "../common/PageWrapper";
import {Tab, Tabs} from "react-bootstrap";
import Cooking from "../chef/Cooking";
import OrderQueue from "../chef/OrderQueue";
import {GlobalState} from "../../common/types";
import AcceptedOrder from "./AcceptedOrder";
import FinishedOrder from "./FinishedOrder";

type LoginProps = {
    state: GlobalState,
    updateGlobalState: (newState: GlobalState) => void
}
function OrderProcessor({state,updateGlobalState}: LoginProps) {
    return (
        <PageWrapper state={state} updateGlobalState={updateGlobalState}>
            <div>
                <h1>Order Processor</h1>
                <Tabs
                    defaultActiveKey="profile"
                    id="uncontrolled-tab-example"
                    className="mb-3"

                >
                    <Tab eventKey="acceptedOrder" title="Accepted Orders">
                        <AcceptedOrder state={state} updateGlobalState={updateGlobalState}/>
                    </Tab>
                    <Tab eventKey="finishedOrder" title="Finished Orders">
                        <FinishedOrder state={state} updateGlobalState={updateGlobalState}/>
                    </Tab>
                </Tabs>
            </div>
        </PageWrapper>
    )
}
export default OrderProcessor
