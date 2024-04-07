import React, { useState } from "react";
import { updateDocument } from "../../api/api";

const UpdateStudent = ({ studentData, onUpdate }) => {
  const [name, setName] = useState(studentData.name);
  const [email, setEmail] = useState(studentData.email);
  const [password, setPassword] = useState(studentData.password);
 console.log(studentData);
  // Function to handle form submission
  const handleSubmit = async () => {
    try {
      // Update student data object
      const updatedStudentData = {
        ...studentData, // Retain existing fields
        name,
        email,
        password,
      };
     
      // Call API function to update student document in Firestore
      await updateDocument("students", studentData.id, updatedStudentData);

      // Call the onUpdate function passed from the parent component
      onUpdate(updatedStudentData);

      // Optionally, you can show a success message or perform other actions
      console.log("Student updated successfully!");
    } catch (error) {
      console.error("Error updating student: ", error);
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

export default UpdateStudent;
