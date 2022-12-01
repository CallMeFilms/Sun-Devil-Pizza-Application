import React, {useCallback, useState} from "react"
import {GlobalState} from "../../common/types";
import {Card} from "react-bootstrap";
import PageWrapper from "../common/PageWrapper";
import {useNavigate} from "react-router";

type CheckoutProps = {
    state: GlobalState,
    updateGlobalState: (newState: GlobalState) => void
}

function Checkout({ state, updateGlobalState }: CheckoutProps) {
    const [firstName,setFirstName] = useState("");
    const [lastName,setLastName] = useState("");
    const [email,setEmail] = useState("");
    const [cardNumber,setCardNumber] = useState("");
    // const [cardExpiration,setCardExpiration] = useState("");
    const [expirationMonth,setExpirationMonth] = useState("");
    const [expirationYear,setExpirationYear] = useState("");
    const [cardCVV,setCardCVV] = useState("");
    const [asuID,setAsuID] = useState("");
    const navigate = useNavigate();
    const sendData = useCallback(() => {
        fetch("/checkout", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(
                {"firstName":firstName,
                    "lastName":lastName,
                    "email":email,
                    "expirationMonth":expirationMonth,
                    "expirationYear":expirationYear,
                    "cardCVV":cardCVV,
                    "cardNumber":cardNumber,
                    "asuID": asuID}),})
            .then((result) => {
                if (result.status != 200) { throw new Error("Bad Server Response"); }
                console.log(result);
                return result.text();
            })
            .then((response) => {
                navigate("/customer-checkout-complete");
                console.log(response);
            })
            .catch((error) => { console.log(error); });
        return false;
    },[firstName,cardNumber,asuID])
    return (
        <PageWrapper state={state} updateGlobalState={updateGlobalState}>

            <form>
                <Card className="col-8 m-auto">
                    <Card.Header>
                        <h1>Welcome to SunDevil Pizza</h1>
                    </Card.Header>
                    <Card.Body>
                        Checkout
                        <div className="container">
                            <h2>Please Enter</h2>
                            <div className="form-group">
                                <label htmlFor="rg-from">First Name: </label>
                                <input type="text" id="firstName" name="firstName" className="form-control" value={firstName} onChange={(evt)=>setFirstName(evt.currentTarget.value)}/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="rg-from">Last Name: </label>
                                <input type="text" id="lastName" name="lastName" className="form-control" value={lastName} onChange={(evt)=>setLastName(evt.currentTarget.value)}/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="rg-from">Email: </label>
                                <input type="text" id="email" name="email" className="form-control" value={email} onChange={(evt)=>setEmail(evt.currentTarget.value)}/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="rg-from">Credit Card: </label>
                                <input type="text" id="cardNumber" name="cardNumber" className="form-control" value={cardNumber} onChange={(evt)=>setCardNumber(evt.currentTarget.value)}/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="rg-from">Card Expiration: </label>
                                {/* <input type="text" id="cardExpiration" name="cardExpiration" className="form-control" value={cardExpiration} onChange={(evt)=>setCardExpiration(evt.currentTarget.value)}/> */}
                                <select id="expirationMonth" name="expirationMonth" className="form-control" value={expirationMonth} onChange={(evt)=>setExpirationMonth(evt.currentTarget.value)}>
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                    <option>6</option>
                                    <option>7</option>
                                    <option>8</option>
                                    <option>9</option>
                                    <option>10</option>
                                    <option>11</option>
                                    <option>12</option>
                                </select>
                                <select id="expirationYear" name="expirationYear" className="form-control" value={expirationYear} onChange={(evt)=>setExpirationYear(evt.currentTarget.value)}>
                                    <option>23</option>
                                    <option>24</option>
                                    <option>25</option>
                                    <option>26</option>
                                    <option>27</option>
                                    <option>28</option>
                                    <option>29</option>
                                    <option>30</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label htmlFor="rg-from">Card CVV: </label>
                                <input type="text" id="cardCVV" name="cardCVV" className="form-control" value={cardCVV} onChange={(evt)=>setCardCVV(evt.currentTarget.value)}/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="rg-from">ASU ID: </label>
                                <input type="text" id="asuID" name="asuID" className="form-control" value={asuID} onChange={(evt)=>setAsuID(evt.currentTarget.value)}/>
                            </div>
                            <button onClick={sendData}>Checkout</button>
                        </div>
                    </Card.Body>
                </Card>
            </form>
        </PageWrapper>
    )
}

export default Checkout;