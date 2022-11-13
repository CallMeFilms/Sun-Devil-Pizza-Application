import React from 'react'
import {Tab, TabContainer, TabContent, Tabs} from "react-bootstrap";
import Cooking from "./Cooking";
import OrderQueue from "./OrderQueue";
import PageWrapper from "../common/PageWrapper";
import {GlobalState} from "../../common/types";
type ChefProps = {
    state: GlobalState,
    updateGlobalState: (newState: GlobalState) => void
}

function Chef({state,updateGlobalState}: ChefProps) {
    return (
        <PageWrapper state={state} updateGlobalState={updateGlobalState}>
            <div>
                <h1>Chef</h1>
                <Tabs
                    defaultActiveKey="profile"
                    id="uncontrolled-tab-example"
                    className="mb-3"
                >
                    <Tab eventKey="cooking" title="Cooking">
                        <Cooking state={state} updateGlobalState={updateGlobalState}/>
                    </Tab>
                    <Tab eventKey="orderQueue" title="Order Queue">
                        <OrderQueue state={state} updateGlobalState={updateGlobalState}/>
                    </Tab>
                </Tabs>
            </div>
        </PageWrapper>
    )
}
export default Chef
