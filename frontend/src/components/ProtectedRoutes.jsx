import {Navigate} from "react-router-dom";
import {getToken} from "../utils/auth";

const ProtectedRoutes = ({children}) => {
    if(! getToken()){
        return <Navigate to="/login"/>;
    }
    return children;
};

export default ProtectedRoutes;