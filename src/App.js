import LoginForm from "./components/loginform";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "./pages/Main";
import Teacher from "./pages/teacher/teacher";
import PageNotFound from "./pages/PageNotFound";
import { AuthProvider } from "./authentication/authContext";
import ProtectedRoute from "./authentication/ProtectedRoute";
import Course from "./pages/course/course";
import Student from "./pages/student/student";
import Dashboard from "./pages/dashboard/dashboard";
import AddStudent from "./pages/student/addStudent";
import StudentMain from "./pages/student";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginForm />} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <Main />
              </ProtectedRoute>
            }
          >
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="teachers" element={<Teacher />} />
            <Route path="students" element={<StudentMain />}>
              <Route path="add" element={<AddStudent />} />
              <Route index element={<Student />} />
            </Route>
            <Route path="courses" element={<Course />} />
          </Route>
          /
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
