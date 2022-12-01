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
        })
        .catch((error) => { console.log(error); });
        return false;
    }


    return (
        <PageWrapper state={state} updateGlobalState={updateGlobalState}>

            <form>
                <Card className="col-8 m-auto">
                    <Card.Header>
                        <h1>Welcome to SunDevil Pizza</h1>
                    </Card.Header>
                    <Card.Body>
                        Choose your pizza
                        <div className="container">

                            <fieldset>
                                <p>
                                    <input
                                        type="radio"
                                        name="pizzaType"
                                        value="Pepperoni"
                                        id="pep"
                                        onChange={radioHandler}
                                    />
                                    <label htmlFor="pep">Pepperoni</label>
                                </p>

                                <p>
                                    <input
                                        type="radio"
                                        name="pizzaType"
                                        value="Vegetable"
                                        id="veg"
                                        onChange={radioHandler}
                                    />
                                    <label htmlFor="veg">Vegetable</label>
                                </p>

                                <p>
                                    <input
                                        type="radio"
                                        name="pizzaType"
                                        value="Cheese"
                                        id="che"
                                        onChange={radioHandler}
                                    />
                                    <label htmlFor="che">Cheese</label>
                                </p>
                            </fieldset>
                        </div>
                        <div className="checkList">
                            <div className="title">Toppings:</div>
                            <div className="list-container">
                                {checkList.map((item, index) => (
                                    <div key={index}>
                                        <input name="toppings" value={item} type="checkbox" onChange={handleCheck} />
                                        <span className={isChecked(item)}>{item}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div>
                            {`Items checked are: ${checkedItems}`}
                        </div>
                    </Card.Body>
                </Card>
            </form>
            <button onClick={sendData}>Add to Cart</button>
        </PageWrapper>
    )
}

export default Customer
