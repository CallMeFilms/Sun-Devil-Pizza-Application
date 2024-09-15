import React, {useEffect} from "react"
import PageWrapper from "../common/PageWrapper";
import {Tab, Tabs} from "react-bootstrap";
import Cooking from "../chef/Cooking";
import OrderQueue from "../chef/OrderQueue";
import {GlobalState} from "../../common/types";
import AcceptedOrder from "./AcceptedOrder";
import FinishedOrder from "./FinishedOrder";
import {useNavigate} from "react-router";

type LoginProps = {
    state: GlobalState,
    updateGlobalState: (newState: GlobalState) => void
}
function OrderProcessor({state,updateGlobalState}: LoginProps) {

    const navigate = useNavigate();

    useEffect(() => {
        var user: any = state.user;
        if(!user.role || user.role !== "OP") {
            navigate("/login");
        }
    });

    return (
        <PageWrapper state={state} updateGlobalState={updateGlobalState}>
            <div>
                <h1>Order Processor</h1>
                <Tabs
                    defaultActiveKey="acceptedOrder"
                    id="uncontrolled-tab-example"
                    className="mb-3"

                >
                    <Tab eventKey="acceptedOrder" title="New Orders" >
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
