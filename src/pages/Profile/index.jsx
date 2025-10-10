import React, { useEffect, useState } from "react";
import Account from "../../components/Account/index";
import UserProfileHeader from "../../components/UserProfileHeader";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  clearError,
  fetchUserProfile,
  updateUserProfile,
} from "../../redux/userSlice";

function Profile() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isAuthenticated } = useSelector((state) => state.auth);
  const { profile, isLoading, error } = useSelector((state) => state.user);

  const [isEditing, setIsEditing] = useState(false);
  const [formUserName, setFormUserName] = useState("");

  useEffect(() => {
    if (!isAuthenticated) {
      console.log("Utilisateur non connecté, redirection vers home");
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchUserProfile());
    }
  }, [isAuthenticated, dispatch]);

  useEffect(() => {
    if (profile?.userName) {
      setFormUserName(profile.userName);
    }
  }, [profile]);

  const handleEditName = () => {
    setFormUserName(profile?.userName || "");
    setIsEditing(true);
  };

  const handleSave = async () => {
    if (formUserName.trim() && formUserName !== profile?.userName) {
      try {
        await dispatch(
          updateUserProfile({ userName: formUserName.trim() })
        ).unwrap();
        setIsEditing(false);
      } catch (error) {
        console.error("Erreur lors de la mise à jour:", error);
      }
    } else {
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setFormUserName(profile?.userName || "");
    setIsEditing(false);
    dispatch(clearError());
  };

  if (!isAuthenticated) {
    return (
      <div style={{ textAlign: "center", padding: "50px" }}>
        <p>Redirection en cours...</p>
      </div>
    );
  }

  if (isLoading && !profile) {
    return (
      <main className="main bg-dark" style={{ padding: ".5px 0 65px 0" }}>
        <div style={{ textAlign: "center", color: "white", padding: "50px" }}>
          <p>Chargement du profil...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="main bg-dark" style={{ padding: ".5px 0 65px 0" }}>
      {error && (
        <div
          style={{
            color: "#721c24",
            marginBottom: "1rem",
            textAlign: "center",
            padding: "12px 16px",
            backgroundColor: "#f8d7da",
            border: "1px solid #f5c6cb",
            borderRadius: "4px",
            margin: "20px auto",
            maxWidth: "400px",
          }}
        >
          {error}
          <button
            onClick={() => dispatch(clearError())}
            style={{
              position: "absolute",
              right: "8px",
              top: "50%",
              transform: "translateY(-50%)",
              background: "none",
              border: "none",
              fontSize: "18px",
              cursor: "pointer",
              color: "#721c24",
            }}
          >
            ×
          </button>
        </div>
      )}

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

            <label htmlFor="userName" style={{ color: "white" }}>
              User name:
            </label>
            <input
              id="userName"
              value={formUserName}
              onChange={(e) => setFormUserName(e.target.value)}
              style={{ padding: "5px", width: "100%" }}
            />

            <label htmlFor="firstName" style={{ color: "white" }}>
              First name:
            </label>
            <input
              id="firstName"
              value={profile?.firstName || ""}
              disabled
              style={{ padding: "5px", width: "100%", backgroundColor: "#ccc" }}
            />

            <label htmlFor="lastName" style={{ color: "white" }}>
              Last name:
            </label>
            <input
              id="lastName"
              value={profile?.lastName || ""}
              disabled
              style={{ padding: "5px", width: "100%", backgroundColor: "#ccc" }}
            />

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
                disabled={isLoading}
              >
                {isLoading ? 'Saving...' : 'Save'}
              </button>
              <button
                style={{ padding: "5px 40px", borderRadius: "5px" }}
                className="edit-button"
                onClick={handleCancel}
                disabled={isLoading}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      ) : (
        <UserProfileHeader username={profile?.userName} onEditName={handleEditName} />
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
