// import Sidebar from "./components/sidebar";
// import Regform from "./components/regform";
import LoginForm from "./components/loginform";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/dashboard";
import PageNotFound from "./pages/PageNotFound";
import { AuthProvider } from "./authentication/authContext";
import ProtectedRoute from "./authentication/ProtectedRoute";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginForm />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
