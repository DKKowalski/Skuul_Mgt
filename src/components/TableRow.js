import React from "react";

const TableRow = ({ student }) => {
  return (
    <tr className="hover:bg-blue-50">
      <td className="px-6 py-4 text-sm">{student.name}</td>
      <td className="px-6 py-4 text-sm">{student.email}</td>
      <td className="px-6 py-4 text-sm">{student.role}</td>
      <td className="px-6 py-4 text-sm">{student.joinedAt}</td>
      <td className="px-6 py-4">
        <button className="mr-4" title="Edit">
          {/* Add your edit icon SVG here */}
        </button>
        <button className="mr-4" title="Delete">
          {/* Add your delete icon SVG here */}
        </button>
      </td>
    </tr>
  );
};

export default TableRow;
