import React, { useState, useEffect } from "react";
import Table from "../../components/table"; // Updated import statement
import { getDocuments, updateDocument, deleteDocument } from "./../../api/api";
import { Link } from "react-router-dom";
import UpdateTeacher from "./updateTeacher"; // Import the UpdateTeacher component
import Spinner from "../../components/Spinner"; // Import the Spinner component

const Teacher = () => {
  const [teachers, setTeachers] = useState([]);
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [loading, setLoading] = useState(true); // State to track loading status

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedTeachers = await getDocuments("teachers");
        setTeachers(fetchedTeachers);
        setLoading(false); // Set loading to false after data is fetched
      } catch (error) {
        console.error("Error fetching teachers: ", error);
        setLoading(false); // Set loading to false in case of error
      }
    };
    fetchData();
  }, []);

  const handleDeleteTeacher = async (id) => {
    try {
      await deleteDocument("teachers", id);
      setTeachers((prevTeachers) =>
        prevTeachers.filter((teacher) => teacher.id !== id)
      );
    } catch (error) {
      console.error("Error deleting teacher: ", error);
    }
  };

  const handleEditTeacher = (teacher) => {
    setSelectedTeacher(teacher); // Set the selected teacher data for editing
  };

  const handleUpdateTeacher = async (updatedData) => {
    try {
      await updateDocument("teachers", updatedData.id, updatedData);
      setTeachers((prevTeachers) =>
        prevTeachers.map((teacher) =>
          teacher.id === updatedData.id ? updatedData : teacher
        )
      );
      setSelectedTeacher(null); // Clear the selected teacher after updating
    } catch (error) {
      console.error("Error updating teacher: ", error);
    }
  };

 const columns = [
   { key: "name", title: "Name" },
   { key: "email", title: "Email" },
   { key: "teacherId", title: "Teacher ID" },
   {
     key: "joinedAt",
     title: "Joined At",
     render: (item) => (
       <span>{new Date(item.joinedAt).toLocaleDateString()}</span>
     ),
   },
 ];


  return (
    <div>
      <button
        type="button"
        className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
      >
        <Link to="add">Add teacher</Link>
      </button>
      {loading ? (
        <Spinner /> // Render the spinner component while data is being fetched
      ) : selectedTeacher ? (
        // Render the UpdateTeacher component if a teacher is selected for editing
        <UpdateTeacher
          teacherData={selectedTeacher}
          onUpdate={handleUpdateTeacher}
        />
      ) : (
        <Table
          columns={columns}
          data={teachers}
          onUpdate={handleEditTeacher} // Pass the edit handler to the Table component
          onDelete={handleDeleteTeacher}
        />
      )}
    </div>
  );
};

export default Teacher;
