import { useSelector } from "react-redux";

const useAuth = () => {
    const { isAuthenticated, user, token } = useSelector(state => state.auth);
    return { isAuthenticated, user, token };
};

export default useAuth;