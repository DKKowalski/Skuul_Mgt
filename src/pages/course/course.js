import React, { useState, useEffect } from "react";
import Table from "../../components/table"; // Updated import statement
import { getDocuments, updateDocument, deleteDocument } from "./../../api/api";
import { Link } from "react-router-dom";
import UpdateCourse from "./updateCourse"; // Import the UpdateCourse component
import Spinner from "../../components/Spinner"; // Import the Spinner component

const Course = () => {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [loading, setLoading] = useState(true); // State to track loading status

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedCourses = await getDocuments("courses");
        setCourses(fetchedCourses);
        setLoading(false); // Set loading to false after data is fetched
      } catch (error) {
        console.error("Error fetching courses: ", error);
        setLoading(false); // Set loading to false in case of error
      }
    };
    fetchData();
  }, []);

  const handleDeleteCourse = async (id) => {
    try {
      await deleteDocument("courses", id);
      setCourses((prevCourses) =>
        prevCourses.filter((course) => course.id !== id)
      );
    } catch (error) {
      console.error("Error deleting course: ", error);
    }
  };

  const handleEditCourse = (course) => {
    setSelectedCourse(course); // Set the selected course data for editing
  };

  const handleUpdateCourse = async (updatedData) => {
    try {
      await updateDocument("courses", updatedData.id, updatedData);
      setCourses((prevCourses) =>
        prevCourses.map((course) =>
          course.id === updatedData.id ? updatedData : course
        )
      );
      setSelectedCourse(null); // Clear the selected course after updating
    } catch (error) {
      console.error("Error updating course: ", error);
    }
  };

  const columns = [
    { key: "name", title: "Name" },
    { key: "teacherId", title: "Teacher ID" },
    { key: "courseId", title: "Course ID" },
    { key: "description", title: "Description" },
    {
      key: "createdAt",
      title: "Created At",
      render: (item) => (
        <span>{new Date(item.createdAt).toLocaleDateString()}</span>
      ),
    },
  ];

  return (
    <div>
      <button
        type="button"
        className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
      >
        <Link to="add">Add course</Link>
      </button>
      {loading ? (
        <Spinner /> // Render the spinner component while data is being fetched
      ) : selectedCourse ? (
        // Render the UpdateCourse component if a course is selected for editing
        <UpdateCourse
          courseData={selectedCourse}
          onUpdate={handleUpdateCourse}
        />
      ) : (
        <Table
          columns={columns}
          data={courses}
          onUpdate={handleEditCourse} // Pass the edit handler to the Table component
          onDelete={handleDeleteCourse}
        />
      )}
    </div>
  );
};

export default Course;
