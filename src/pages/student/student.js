import React, { useState, useEffect } from "react";
import Table from "../../components/table"; // Updated import statement
import { getDocuments, updateDocument, deleteDocument } from "./../../api/api";
import { Link } from "react-router-dom";
import UpdateStudent from "./updateStudent"; // Import the UpdateStudent component
import Spinner from "../../components/Spinner"; // Import the Spinner component

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [loading, setLoading] = useState(true); // State to track loading status

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedStudents = await getDocuments("students");
        setStudents(fetchedStudents);
        setLoading(false); // Set loading to false after data is fetched
      } catch (error) {
        console.error("Error fetching students: ", error);
        setLoading(false); // Set loading to false in case of error
      }
    };
    fetchData();
  }, []);

  const handleDeleteStudent = async (id) => {
    try {
      await deleteDocument("students", id);
      setStudents((prevStudents) =>
        prevStudents.filter((student) => student.id !== id)
      );
    } catch (error) {
      console.error("Error deleting student: ", error);
    }
  };

  const handleEditStudent = (student) => {
    setSelectedStudent(student); // Set the selected student data for editing
  };

  const handleUpdateStudent = async (updatedData) => {
    try {
      await updateDocument("students", updatedData.id, updatedData);
      setStudents((prevStudents) =>
        prevStudents.map((student) =>
          student.id === updatedData.id ? updatedData : student
        )
      );
      setSelectedStudent(null); // Clear the selected student after updating
    } catch (error) {
      console.error("Error updating student: ", error);
    }
  };

  return (
    <div>
      <button
        type="button"
        class="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
      >
        <Link to="add">Add student</Link>
      </button>
      {loading ? (
        <Spinner /> // Render the spinner component while data is being fetched
      ) : selectedStudent ? (
        // Render the UpdateStudent component if a student is selected for editing
        <UpdateStudent
          studentData={selectedStudent}
          onUpdate={handleUpdateStudent}
        />
      ) : (
        <Table
          data={students}
          onUpdate={handleEditStudent} // Pass the edit handler to the Table component
          onDelete={handleDeleteStudent}
        />
      )}
    </div>
  );
};

export default StudentList;
