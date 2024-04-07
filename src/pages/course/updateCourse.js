import React, { useState } from "react";
import { updateDocument } from "../../api/api";

const UpdateCourse = ({ courseData, onUpdate }) => {
  const [name, setName] = useState(courseData.name);
  const [teacherId, setTeacherId] = useState(courseData.teacherId);
  const [classId, setClassId] = useState(courseData.classId);

  // Function to handle form submission
  const handleSubmit = async () => {
    try {
      // Update course data object
      const updatedCourseData = {
        ...courseData, // Retain existing fields
        name,
        teacherId,
        classId,
      };

      // Call API function to update course document in Firestore
      await updateDocument("courses", courseData.id, updatedCourseData);

      // Call the onUpdate function passed from the parent component
      onUpdate(updatedCourseData);

      // Optionally, you can show a success message or perform other actions
      console.log("Course updated successfully!");
    } catch (error) {
      console.error("Error updating course: ", error);
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
          value={classId}
          onChange={(e) => setClassId(e.target.value)}
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

export default UpdateCourse;
