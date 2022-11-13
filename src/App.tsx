import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';
import {
    createBrowserRouter,
    RouterProvider,
    Route, Routes,
} from "react-router-dom";
import OrderProcessor from "./pages/order-processor/OrderProcessor";
import Login from "./pages/Login";
import Chef from "./pages/chef/Chef";
import Customer from "./pages/customer/Customer";
import {GlobalState} from "./common/types";

function App() {
    const [globalState, setGlobalState] = useState<GlobalState>({orders: []});

    function updateGlobalState(newState: GlobalState) {
        setGlobalState(newState);
    }

    return (

        <Routes>
            <Route path="/" element={<Login state={globalState} updateGlobalState={updateGlobalState}/>}/>
            <Route path="/order-processor"
                   element={<OrderProcessor state={globalState} updateGlobalState={updateGlobalState}/>}/>
            <Route path="/chef" element={<Chef state={globalState} updateGlobalState={updateGlobalState}/>}/>
            <Route path="/customer" element={<Customer state={globalState} updateGlobalState={updateGlobalState}/>}/>
        </Routes>
    )
}

export default App;
