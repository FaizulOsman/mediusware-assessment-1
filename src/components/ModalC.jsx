import React from "react";

const ModalC = ({ openModalA, openModalB, closeModal, contactDetails }) => {
  console.log(contactDetails);
  return (
    <div>
      <div className="modal" style={{ display: "block" }}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Modal C</h5>
            </div>
            <div className="modal-body">
              <p>Country: {contactDetails?.country?.name}</p>
              <p>Phone: {contactDetails?.phone}</p>
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

export default ModalC;
