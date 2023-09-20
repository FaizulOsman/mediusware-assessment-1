import React from "react";

const ModalA = ({ onClose, onSwitchToModalB }) => {
  return (
    <div className="modal">
      <h2>Modal A</h2>
      {/* Modal A content */}
      <button onClick={onSwitchToModalB}>Switch to Modal B</button>
      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default ModalA;
