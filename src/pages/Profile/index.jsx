import React, { useEffect, useState } from "react";
import Account from "../../components/Account/index";
import UserProfileHeader from "../../components/UserProfileHeader";

function Profile() {
  const [userName, setUserName] = useState("Tony Jarvis");
  const [firstName] = useState("Tony");
  const [lastName] = useState("Jarvis");

  const [isEditing, setIsEditing] = useState(false);
  const [formUserName, setFormUserName] = useState(userName);
  useEffect(() => {
    const saved = localStorage.getItem("userName");
    if (saved) setUserName(saved);
  }, []);
  useEffect(() => {
    localStorage.setItem("userName", userName);
  }, [userName]);

  const handleEditName = () => {
    setFormUserName(userName);
    setIsEditing(true);
  };

  const handleSave = () => {
    setUserName(formUserName.trim() || userName);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormUserName(userName);
    setIsEditing(false);
  };

  return (
    <main className="main bg-dark" style={{padding: ".5px 0 65px 0"}}>
      {isEditing ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
          }}
        >
          <div
            className="header"
            style={{
              display: "flex",
              flexDirection: "column",
              width: "300px",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <h1>Edit user info</h1>

            <label htmlFor="userName">User name:</label>
            <input
              id="userName"
              value={formUserName}
              onChange={(e) => setFormUserName(e.target.value)}
            />

            <label htmlFor="firstName">First name:</label>
            <input id="firstName" value={firstName} disabled />

            <label htmlFor="lastName">Last name:</label>
            <input id="lastName" value={lastName} disabled />

            <div
              style={{
                marginTop: "16px",
                display: "flex",
                justifyContent: "center",
                gap: "15px",
              }}
            >
              <button
                style={{ padding: "5px 40px", borderRadius: "5px" }}
                className="edit-button"
                onClick={handleSave}
              >
                Save
              </button>
              <button
                style={{ padding: "5px 40px", borderRadius: "5px" }}
                className="edit-button"
                onClick={handleCancel}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      ) : (
        <UserProfileHeader username={userName} onEditName={handleEditName} />
      )}

      <>
        <h2 className="sr-only">Accounts</h2>
        <Account
          title="Argent Bank Checking (x8349)"
          amount="$2,082.79"
          description="Available Balance"
        />
        <Account
          title="Argent Bank Savings (x6712)"
          amount="$10,928.42"
          description="Available Balance"
        />
        <Account
          title="Argent Bank Credit Card (x8349)"
          amount="$184.30"
          description="Current Balance"
        />
      </>
    </main>
  );
}

export default Profile;
