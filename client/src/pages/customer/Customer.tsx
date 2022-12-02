import React, { useState } from "react";
import { GlobalState } from "../../common/types";
import PageWrapper from "../common/PageWrapper";
import { Card } from "react-bootstrap";
import {useNavigate} from "react-router";

type CustomerProps = {
    state: GlobalState,
    updateGlobalState: (newState: GlobalState) => void
}

function Customer({ state, updateGlobalState }: CustomerProps) {
    const navigate = useNavigate();
    const [selected, setSelected] = useState<string>();

    const radioHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelected(event.target.value);
    };

    const [checked, setChecked] = useState([] as string[]);
    const checkList = ["Mushrooms", "Onions", "Olives", "Extra Cheese"];

    const handleCheck = (event: React.ChangeEvent<HTMLInputElement>) => {
        var updatedList = [...checked];
        if (event.target.checked) {
            updatedList = [...checked, event.target.value];
        } else {
            updatedList.splice(checked.indexOf(event.target.value), 1);
        }
        setChecked(updatedList);
    };

    var isChecked = (item: string) =>
        checked.includes(item) ? "checked-item" : "not-checked-item";

    const checkedItems = checked.length
        ? checked.reduce((total: any, item: any) => {
            return total + ", " + item;
        })
        : "";


    function sendData(event: React.MouseEvent<HTMLElement>) {
        console.log(selected, checked);
        console.log(checked);
        fetch("/addToCart", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({"type": selected, "toppings": checked}),
        })
        .then((result) => {
            if (result.status != 200) { throw new Error("Bad Server Response"); }
            var doc = event.view.document;
            var pizzaTypeInputs = doc.getElementsByName("pizzaType");
            let curInput: any;
            for(var pizzaType of pizzaTypeInputs) {
                curInput = pizzaType;
                curInput.checked = false;
            }
            var toppingInputs = doc.getElementsByName("toppings");
            for(var topping of toppingInputs) {
                curInput = topping;
                curInput.checked = false;
            }
            setChecked([]);
            navigate("/customer-checkout")
        })
        .catch((error) => { console.log(error); });
        return false;
    }


    return (
        <PageWrapper state={state} updateGlobalState={updateGlobalState}>
            <Card className="col-8 m-auto">
                <Card.Header>
                    <h1>Welcome to SunDevil Pizza</h1>
                </Card.Header>
                <Card.Body>
                    <form>
                        <Card>
                            <Card.Header>
                                <h4>
                                    Choose a Pizza to Start With
                                </h4>
                            </Card.Header>
                            <Card.Body>
                                <div className="form-check form-check-inline">
                                    <input
                                        id="pep"
                                        className="btn-check"
                                        type="radio"
                                        name="pizzaType"
                                        value="Pepperoni"
                                        onChange={radioHandler}
                                    />
                                    <label className="btn btn-outline-danger" htmlFor="pep">Pepperoni</label>
                                </div>
                                <div className="form-check form-check-inline">
                                    <input
                                        id="veg"
                                        className="btn-check"
                                        type="radio"
                                        name="pizzaType"
                                        value="Vegetable"
                                        onChange={radioHandler}
                                    />
                                    <label className="btn btn-outline-danger" htmlFor="veg">Vegetable</label>
                                </div>
                                <div className="form-check form-check-inline">
                                    <input
                                        id="che"
                                        className="btn-check"
                                        type="radio"
                                        name="pizzaType"
                                        value="Cheese"
                                        onChange={radioHandler}
                                    />
                                    <label className="btn btn-outline-danger" htmlFor="che">Cheese</label>
                                </div>
                            </Card.Body>
                        </Card>
                        <br/>
                        <Card>
                            <Card.Header className="title">
                                <h4>
                                    Toppings
                                    <small className="text-muted"> Choose Any</small>
                                </h4>
                            </Card.Header>
                            <Card.Body>
                                {checkList.map((item, index) => (
                                    <div key={index} className="form-check form-check-inline">
                                        <input id={"toppings" + item} className="btn btn-check" name="toppings" value={item} type="checkbox" onChange={handleCheck} />
                                        <label htmlFor={"toppings" + item} className={"btn btn-outline-success " + isChecked(item)}>{item}</label>
                                    </div>
                                ))}
                            </Card.Body>
                        </Card>
                        <br/>
                    </form>
                    <button className="btn btn-secondary btn-lg" onClick={sendData}>Add to Cart</button>
                </Card.Body>
            </Card>
        </PageWrapper>
    )
}

export default Customer
