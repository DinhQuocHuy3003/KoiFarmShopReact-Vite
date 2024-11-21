import { Navigate } from "react-router-dom";
import useStore from "./app/store";
import PropTypes from "prop-types";

const ProtectedRoute = ({ roles, element }) => {
  const userInfo = useStore((state) => state.userInfo);
  const auth = useStore((state) => state.auth);

  console.log("User Role:", userInfo?.account?.data?.role);

  if (!auth) {
    return <Navigate to="/login" />;
  }

  if (!roles.includes(userInfo?.account?.data?.role)) {
    return <Navigate to="/access-denied" />;
  }

  return element;
};

export default ProtectedRoute;

ProtectedRoute.prototype = {
  roles: PropTypes.arrayOf(PropTypes.string).isRequired,
  element: PropTypes.node.isRequired,
};
