import React from "react";
import PropTypes from "prop-types";

const ErrorMessage = ({ message }) => {
    if (!message) return null;

    return <p className="error-message">{message}</p>;
};

ErrorMessage.propTypes = {
    message: PropTypes.string,
};

export default ErrorMessage;