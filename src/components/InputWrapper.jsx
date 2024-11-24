import React, { useState } from "react";

const InputWrapper = ({ label, type, id }) => {
    const [value, setValue] = useState("");

    const handleChange = e => {
        setValue(e.target.value);
    };

    return (
        <div className="input-wrapper">
            <label htmlFor={id}>{label}</label>
            <input type={type} id={id} value={value} onChange={handleChange} />
        </div>
    );
};

export default InputWrapper;
