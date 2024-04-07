import React, { useState } from "react";
import { createDocument } from "../../api/api";

const AddCourse = () => {
  const [name, setName] = useState("");
  const [teacherId, setTeacherId] = useState("");
  const [courseId, setCourseId] = useState("");
  const [description, setDescription] = useState("");

  // Function to handle form submission
  const handleSubmit = async () => {
    try {
      // Create course data object
      const courseData = {
        name,
        teacherId,
        courseId,
        description,
        createdAt: new Date().toISOString(),
      };

      // Call API function to create course document in Firestore
      await createDocument("courses", courseData);

      // Reset form fields after successful submission
      setName("");
      setTeacherId("");
      setCourseId("");
      setDescription("");

      // Optionally, you can show a success message or perform other actions
      console.log("Course added successfully!");
    } catch (error) {
      console.error("Error adding course: ", error);
    }
  };

  return (
    <form className="space-y-6 px-4 max-w-sm mx-auto font-[sans-serif]">
      <div className="flex items-center">
        <label className="text-gray-400 w-36 text-sm">Name</label>
        <input
          type="text"
          placeholder="Enter course name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="px-2 py-2 w-full border-b-2 focus:border-[#333] outline-none text-sm bg-white"
        />
      </div>
      <div className="flex items-center">
        <label className="text-gray-400 w-36 text-sm">Teacher ID</label>
        <input
          type="text"
          placeholder="Enter teacher ID"
          value={teacherId}
          onChange={(e) => setTeacherId(e.target.value)}
          className="px-2 py-2 w-full border-b-2 focus:border-[#333] outline-none text-sm bg-white"
        />
      </div>
      <div className="flex items-center">
        <label className="text-gray-400 w-36 text-sm">Class ID</label>
        <input
          type="text"
          placeholder="Enter class ID"
          value={courseId}
          onChange={(e) => setCourseId(e.target.value)}
          className="px-2 py-2 w-full border-b-2 focus:border-[#333] outline-none text-sm bg-white"
        />
      </div>
      <div className="flex items-center">
        <label className="text-gray-400 w-36 text-sm">Class ID</label>
        <input
          type="text"
          placeholder="Enter course desc"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
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

export default AddCourse;
