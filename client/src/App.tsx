import React, {useState,useEffect} from 'react';
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
import Checkout from "./pages/customer/Checkout";
import CheckoutComplete from './pages/customer/CheckoutComplete';

function App() {
    const [globalState, setGlobalState] = useState<GlobalState>({user:{}, readyToCook: [],cooking: [],accepted: [],finished: [],addToCard: []});

    function updateGlobalState(newState: GlobalState) {
        setGlobalState(newState);
    }

    useEffect(() => {
        fetch("http://localhost:3001/readyToCook")
            .then(res => res.json())
            .then(orders => {
                setGlobalState( (prevState) => {
                    return {
                    ...prevState,
                        readyToCook: orders
                    }
                })
            })
        fetch("http://localhost:3001/cooking")
            .then(res => res.json())
            .then(orders => {
                setGlobalState( (prevState) => {
                    return {
                        ...prevState,
                        cooking: orders
                    }
                })
            })
    }, [])

    return (

        <Routes>
            <Route path="/login" element={<Login state={globalState} updateGlobalState={updateGlobalState}/>}/>
            <Route path="/order-processor" element={<OrderProcessor state={globalState} updateGlobalState={updateGlobalState}/>}/>
            <Route path="/chef" element={<Chef state={globalState} updateGlobalState={updateGlobalState}/>}/>
            <Route path="/" element={<Customer state={globalState} updateGlobalState={updateGlobalState}/>}/>
            <Route path="/customer-checkout" element={<Checkout state={globalState} updateGlobalState={updateGlobalState}/>}/>
            <Route path="/checkout-complete" element={<CheckoutComplete state={globalState} updateGlobalState={updateGlobalState}/>}/>
        </Routes>
    )
}

export default App;
