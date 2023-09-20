import React from "react";

const ModalB = ({ onClose, onSwitchToModalA }) => {
  return (
    <div className="modal">
      <h2>Modal B</h2>
      {/* Modal B content */}
      <button onClick={onSwitchToModalA}>Switch to Modal A</button>
      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default ModalB;
