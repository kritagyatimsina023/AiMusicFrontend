import Cookies from "js-cookie";
import { Navigate } from "react-router-dom";
interface childrenProptype {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: childrenProptype) => {
  const token = Cookies.get("authToken");
  return token ? children : <Navigate to={"/"} replace />;
};

export default ProtectedRoute;
