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
import TeacherMain from "./pages/teacher";
import AddTeacher from "./pages/teacher/addTeacher";
import CourseMain from "./pages/course";
import AddCourse from "./pages/course/addCourse";

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
            <Route path="teachers" element={<TeacherMain />}>
              <Route index element={<Teacher />} />
              <Route path="add" element={<AddTeacher />} />
            </Route>
            <Route path="students" element={<StudentMain />}>
              <Route index element={<Student />} />
              <Route path="add" element={<AddStudent />} />
            </Route>
            <Route path="courses" element={<CourseMain />}>
              <Route index element={<Course />} />
              <Route path="add" element={<AddCourse />} />
            </Route>
          </Route>
          /
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
