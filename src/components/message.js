import React from "react";

const Message = ({ type, message }) => {
  // Determine the background and text color based on the message type
  let bgColor = "";
  let textColor = "";
  switch (type) {
    case "success":
      bgColor = "bg-green-100";
      textColor = "text-green-800";
      break;
    case "error":
      bgColor = "bg-red-100";
      textColor = "text-red-800";
      break;
    default:
      bgColor = "bg-gray-100";
      textColor = "text-gray-800";
      break;
  }

  return (
    <div
      className={`rounded relative ${bgColor} ${textColor} pl-4 pr-10 py-4`}
      role="alert"
    >
      <div className="inline-block max-sm:mb-2">
        {/* Display success or error icon */}
        {type === "success" ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 fill-green-500 inline mr-4"
            viewBox="0 0 512 512"
          >
            {/* Success icon */}
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 fill-red-500 inline mr-4"
            viewBox="0 0 32 32"
          >
            {/* Error icon */}
          </svg>
        )}
        {/* Display message type */}
        <strong className="font-bold text-base">
          {type === "success" ? "Success!" : "Error!"}
        </strong>
      </div>
      {/* Display message content */}
      <span className="block sm:inline text-sm mx-4 max-sm:ml-0 max-sm:mt-1">
        {message}
      </span>
    </div>
  );
};

export default Message;
