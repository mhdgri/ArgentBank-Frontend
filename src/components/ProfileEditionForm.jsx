import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { hideProfileEdit, updateProfile } from "../store/authSlice";
import ErrorMessage from "./ErrorMessage";

export const ProfileEditionForm = ({ user }) => {
    const [errorMessage, setErrorMessage] = useState("");
    const [userName, setUserName] = useState(user?.userName);

    useEffect(() => {
        setUserName(user?.userName);
    }, [user]);

    const dispatch = useDispatch();
    const handleCancelButton = e => {
        e.preventDefault();
        dispatch(hideProfileEdit());
    };

    const handleSubmit = async e => {
        e.preventDefault();
        const { userName } = e.target.elements;

        try {

            if (!userName.value) {
                setErrorMessage("User name is required");
                return;
            }

            // If the user name is not changed, close the form
            if (userName.value === user?.userName) {
                dispatch(hideProfileEdit());
                return;
            }

            if (userName.value.length < 3) {
                setErrorMessage("User name must be at least 3 characters long");
                return;
            }

            const resultAction = await dispatch(updateProfile(userName.value));
            console.log(resultAction);
            if (updateProfile.fulfilled.match(resultAction)) {
                dispatch(hideProfileEdit());
            } else {
                setErrorMessage(resultAction.message || "Failded to update user info");
            }
        } catch (err) {
            setErrorMessage(err.message || "Failed to update user info");
        }
    };

    return (
        <form className="profile" onSubmit={handleSubmit}>
            <h2>Edit user info</h2>
            <div className="input-group">
                <div className="input-wrapper">
                    <label htmlFor="userName">User name:</label>
                    <input type="text" id="userName" value={userName} onChange={e => setUserName(e.target.value)} />
                </div>
                <div className="input-wrapper">
                    <label htmlFor="email">First name:</label>
                    <input type="text" id="firstname" value={user?.firstName} disabled />
                </div>
                <div className="input-wrapper">
                    <label htmlFor="email">Last name:</label>
                    <input type="text" id="lastname" value={user?.lastName} disabled />
                </div>
                <ErrorMessage message={errorMessage} />
            </div>

            <div className="button-group">
                <button type="submit">Save</button>
                <button type="button" onClick={handleCancelButton}>
                    Cancel
                </button>
            </div>
        </form>
    );
};

export default ProfileEditionForm;
