import React, { useState, useEffect } from "react";
import { createDocument, getDocuments } from "../../api/api";

const AddStudent = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [studentId, setStudentId] = useState("");
  const [courses, setCourses] = useState([]);
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
      // Create student data object
      const studentData = {
        studentId,
        courses,
        name,
        email,
        password,
        joinedAt: new Date().toISOString(),
      };

      // Call API function to create student document in Firestore
      await createDocument("students", studentData);

      // Reset form fields after successful submission
      setName("");
      setEmail("");
      setPassword("");
      setStudentId("");
      setCourses([]);

      // Optionally, you can show a success message or perform other actions
      console.log("Student added successfully!");
    } catch (error) {
      console.error("Error adding student: ", error);
    }
  };

  return (
    <form className="space-y-6 px-4 max-w-sm mx-auto font-[sans-serif]">
      <div className="flex items-center">
        <label className="text-gray-400 w-36 text-sm">Name</label>
        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="px-2 py-2 w-full border-b-2 focus:border-[#333] outline-none text-sm bg-white"
        />
      </div>
      <div className="flex items-center">
        <label className="text-gray-400 w-36 text-sm">Email</label>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="px-2 py-2 w-full border-b-2 focus:border-[#333] outline-none text-sm bg-white"
        />
      </div>
      <div className="flex items-center">
        <label className="text-gray-400 w-36 text-sm">Password</label>
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="px-2 py-2 w-full border-b-2 focus:border-[#333] outline-none text-sm bg-white"
        />
      </div>
      <div className="flex items-center">
        <label className="text-gray-400 w-36 text-sm">Student ID</label>
        <input
          type="text"
          placeholder="Enter student's ID"
          value={studentId}
          onChange={(e) => setStudentId(e.target.value)}
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

export default AddStudent;
