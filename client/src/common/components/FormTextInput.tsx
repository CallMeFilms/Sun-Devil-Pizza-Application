import "./forms.css";
import { useState } from "react";

const FormTextInput = (props: any) => {
    const [focused, setFocused] = useState(false);
    const {id, label, isCardInput, errorMessage, onChange, ...inputProps} = props;

    const luhnValidate = (card: any) => {
        return !/^\d+$/.test(card) || (card.split('').reduce((sum: any, d: any, n: any) => { 
            return sum + parseInt(((n + card.length) %2)? d: [0,2,4,6,8,1,3,5,7,9][d]);
        }, 0)) % 10 == 0;
    };

    const onBlur = (event: any) => {
        if(isCardInput && !luhnValidate(inputProps.value)) {
            event.target.setCustomValidity("Please match the requested format.");
        } else if(isCardInput) {
            event.target.setCustomValidity("");
        }
        setFocused(true);
    };

    return (
        <div className="form-group">
            <br/>
            <label
                htmlFor={id}
            >{label}</label>
            <input
                id={id}
                className="form-control"
                type="text"
                {...inputProps}
                onChange={event => {
                    if(isCardInput) {
                        var valid = luhnValidate(event.target.value);
                    }
                    onChange(event);
                }}
                onBlur={onBlur}
                focused={focused.toString()}
            ></input>
            <span id={isCardInput ? "cardNumberSpan" : ""} className="text-danger">{errorMessage}</span>
        </div>
    )
};

export default FormTextInput;