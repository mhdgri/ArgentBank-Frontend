import { useState } from "react";
import Account from "../components/Account";
import UserProfileHeader from "../components/UserProfileHeader";

function Profile() {

  const [username, setUsername] = useState("Tony Jarvis")

  const handleEditName = () => {
    const newName = prompt("Entrez votre nom")
    if(newName) {
      setUsername(newName)
    }
  }

    return (
      <main className="main bg-dark">

        <UserProfileHeader username={username} onEditName={handleEditName} />
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

      </main>
    );
  }

  export default Profile

