import React from "react";

const ModalC = ({ contactDetails, onClose }) => {
  return (
    <div className="modal">
      <h2>Modal C</h2>
      {/* Display contact details here */}
      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default ModalC;
