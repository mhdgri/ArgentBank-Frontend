import { useSelector } from "react-redux";
import AccountCard from "../components/AccountCard";
import useAuth from "../hooks/useAuth";
import ProfileEditionForm from "../components/ProfileEditionForm";
import UserProfileHeader from "../components/UserProfileHeader";

const UserPage = () => {
    const { user } = useAuth();

    const { isProfileEditVisible } = useSelector(state => state.auth);

    const handleViewTransactions = () => {};



    return (
        <main className="main bg-dark">
            <div className="header">
                {isProfileEditVisible ? (
                    <ProfileEditionForm user={user} />
                ) : (
                    <UserProfileHeader user={user} />
                )}
            </div>
            <h2 className="sr-only">Accounts</h2>
            <AccountCard title="Argent Bank Checking (x8349)" amount="$2,082.79" description="Available Balance" onViewTransactions={handleViewTransactions} />
            <AccountCard title="Argent Bank Savings (x6712)" amount="$10,928.42" description="Available Balance" onViewTransactions={handleViewTransactions} />
            <AccountCard title="Argent Bank Credit Card (x8349)" amount="$184.30" description="Current Balance" onViewTransactions={handleViewTransactions} />
        </main>
    );
};

export default UserPage;
