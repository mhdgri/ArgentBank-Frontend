import React from "react";
import { useDispatch } from "react-redux";

import { showProfileEdit } from "../store/authSlice";

const UserProfileHeader = ({user}) => {

    const dispatch = useDispatch();

    const handleEditProfile = () => {
        dispatch(showProfileEdit());
    };

    return (
        <div className="user-profile-header">
            <h1>
                Welcome back
                <br />
                {user?.firstName} {user?.lastName} !
            </h1>
            <button className="edit-button" onClick={handleEditProfile}>
                Edit Name
            </button>
        </div>
    );
};

export default UserProfileHeader;