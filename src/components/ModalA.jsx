import React from "react";

const ModalA = ({
  searchQuery,
  handleSearchChange,
  onlyEvenId,
  handleCheckboxChange,
  handleScroll,
  openModalA,
  openModalB,
  closeModal,
  renderContactList,
}) => {
  return (
    <div>
      <div className="modal" style={{ display: "block" }}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Modal A</h5>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                />
              </div>
              <div className="form-check my-3">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="onlyEvenIdCheckbox"
                  checked={onlyEvenId}
                  onChange={handleCheckboxChange}
                />
                <label
                  className="form-check-label"
                  htmlFor="onlyEvenIdCheckbox"
                >
                  Only even ID
                </label>
              </div>
              <div className="contact-list" onScroll={handleScroll}>
                {renderContactList()}
              </div>
            </div>
            <div className="modal-footer">
              <button
                className="btn btn-primary"
                type="button"
                onClick={openModalA}
                style={{ backgroundColor: "#46139f" }}
              >
                All Contacts
              </button>
              <button
                className="btn btn-primary"
                type="button"
                onClick={openModalB}
                style={{ backgroundColor: "#ff7f50" }}
              >
                US Contacts
              </button>
              <button
                className="btn btn-primary"
                type="button"
                onClick={closeModal}
                style={{
                  backgroundColor: "#46139f",
                  color: "white",
                  border: "1px solid #46139f",
                }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalA;
