import "./forms.css";
import { useState } from "react";

const FormTextInput = (props: any) => {
    const [focused, setFocused] = useState(false);
    const {id, label, errorMessage, onChange, ...inputProps} = props;

    const onBlur = () => {
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
                onChange={onChange}
                onBlur={onBlur}
                focused={focused.toString()}
            ></input>
            <span className="text-danger">{errorMessage}</span>
        </div>
    )
};

export default FormTextInput;