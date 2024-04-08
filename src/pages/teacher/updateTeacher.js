// UpdateTeacher component
import React, { useState, useEffect } from "react";
import { updateDocument, getDocuments } from "../../api/api";

const UpdateTeacher = ({ teacherData, onUpdate }) => {
  const [name, setName] = useState(teacherData.name);
  const [email, setEmail] = useState(teacherData.email);
  const [password, setPassword] = useState(teacherData.password);
  const [teacherId, setTeacherId] = useState(teacherData.teacherId); // Added teacherId state
  const [courses, setCourses] = useState(teacherData.courses);
  const [allCourses, setAllCourses] = useState([]);

  // Fetch all courses when component mounts
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const courses = await getDocuments("courses");
        setAllCourses(courses);
      } catch (error) {
        console.error("Error fetching courses: ", error);
      }
    };
    fetchCourses();
  }, []);
  // Function to handle form submission
  const handleSubmit = async () => {
    try {
      // Update teacher data object
      const updatedTeacherData = {
        ...teacherData, 
        name,
        email,
        password,
        teacherId, 
        courses,
      };

      // Call API function to update teacher document in Firestore
      await updateDocument("teachers", teacherData.id, updatedTeacherData);

      // Call the onUpdate function passed from the parent component
      onUpdate(updatedTeacherData);

      // Optionally, you can show a success message or perform other actions
      console.log("Teacher updated successfully!");
    } catch (error) {
      console.error("Error updating teacher: ", error);
    }
  };

  return (
    <form className="space-y-6 px-4 max-w-sm mx-auto font-[sans-serif]">
      <div className="flex items-center">
        <label className="text-gray-400 w-36 text-sm">Name</label>
        <input
          type="text"
          placeholder="Enter teacher's name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="px-2 py-2 w-full border-b-2 focus:border-[#333] outline-none text-sm bg-white"
        />
      </div>
      <div className="flex items-center">
        <label className="text-gray-400 w-36 text-sm">Email</label>
        <input
          type="email"
          placeholder="Enter teacher's email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="px-2 py-2 w-full border-b-2 focus:border-[#333] outline-none text-sm bg-white"
        />
      </div>
      <div className="flex items-center">
        <label className="text-gray-400 w-36 text-sm">Password</label>
        <input
          type="password"
          placeholder="Enter teacher's password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="px-2 py-2 w-full border-b-2 focus:border-[#333] outline-none text-sm bg-white"
        />
      </div>
      <div className="flex items-center">
        <label className="text-gray-400 w-36 text-sm">Teacher ID</label>
        <input
          type="text"
          placeholder="Enter teacher's ID"
          value={teacherId}
          onChange={(e) => setTeacherId(e.target.value)}
          className="px-2 py-2 w-full border-b-2 focus:border-[#333] outline-none text-sm bg-white"
        />
      </div>
      <div className="flex items-center">
        <label className="text-gray-400 w-36 text-sm">Courses</label>
        <select
          multiple
          value={courses}
          onChange={(e) =>
            setCourses(
              Array.from(e.target.selectedOptions, (option) => option.value)
            )
          }
          className="px-2 py-2 w-full border-b-2 focus:border-[#333] outline-none text-sm bg-white"
        >
          {allCourses.map((course) => (
            <option key={course.id} value={course.id}>
              {course.name}
            </option>
          ))}
        </select>
      </div>
      <button
        type="button"
        onClick={handleSubmit}
        className="px-6 py-2 w-full bg-[#333] text-sm text-white hover:bg-[#444] mx-auto block"
      >
        Submit
      </button>
    </form>
  );
};

export default UpdateTeacher;
