import "./forms.css";
import { useState } from "react";

const FormSelectInput = (props: any) => {
    const [focused, setFocused] = useState(false);
    const {id, options, label, errorMessage, onChange, ...inputProps} = props;

    const onBlur = () => {
        setFocused(true);
    };

    return (
        <div className="form-group">
            <br/>
            <label
                htmlFor={id}
            >{label}</label>
            <select
                id={id}
                className="form-control"
                {...inputProps}
                onChange={onChange}
                onBlur={onBlur}
                focused={focused.toString()}
            >
                {options.split("&").map((option: any) => {
                    return <option value={option === options.split("&")[0] ? "" : option.toLowerCase()}>{option}</option>
                })}
            </select>
            <span className="text-danger">{errorMessage}</span>
        </div>
    )
};

export default FormSelectInput;