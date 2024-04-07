import { useEffect } from "react";
import { useAuth } from "./authContext"; // Assuming this path is correct
import { useNavigate } from "react-router-dom";

const AdminProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth(); // Destructure to get the user object

  useEffect(() => {
    // Check if not authenticated or user type is not 'admins'
    if (!isAuthenticated || user?.userType !== "admins") {
      navigate("/");
    }
  }, [user, isAuthenticated, navigate]);

  return isAuthenticated && user?.userType === "admins" ? children : null;
};

export default AdminProtectedRoute;
