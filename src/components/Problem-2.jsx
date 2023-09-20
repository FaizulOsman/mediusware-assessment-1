import React, { useState, useEffect } from "react";

const Problem2 = () => {
  const [modalAOpen, setModalAOpen] = useState(false);
  const [modalBOpen, setModalBOpen] = useState(false);
  const [modalCOpen, setModalCOpen] = useState(false);
  const [contacts, setContacts] = useState([]);
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [onlyEvenId, setOnlyEvenId] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    // Fetch all contacts from the API
    fetchContacts();
  }, []);

  useEffect(() => {
    // Filter contacts based on search query and even ID checkbox
    filterContacts();
  }, [searchQuery, onlyEvenId]);

  const fetchContacts = async () => {
    try {
      // Make API request to fetch all contacts
      const response = await fetch(
        "https://contact.mediusware.com/api/contacts"
      );
      const data = await response.json();
      setContacts(data.contacts);
      setTotalPages(data.total_pages);
    } catch (error) {
      console.error("Error fetching contacts:", error);
    }
  };

  const filterContacts = () => {
    let filtered = contacts;

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter((contact) =>
        contact.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by even ID checkbox
    if (onlyEvenId) {
      filtered = filtered.filter((contact) => contact.id % 2 === 0);
    }

    setFilteredContacts(filtered);
  };

  const openModalA = () => {
    setModalAOpen(true);
    setModalBOpen(false);
    setModalCOpen(false);
    setCurrentPage(1);
  };

  const openModalB = () => {
    setModalAOpen(false);
    setModalBOpen(true);
    setModalCOpen(false);
    setCurrentPage(1);
  };

  const openModalC = () => {
    setModalAOpen(false);
    setModalBOpen(false);
    setModalCOpen(true);
  };

  const closeModal = () => {
    setModalAOpen(false);
    setModalBOpen(false);
    setModalCOpen(false);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleCheckboxChange = (event) => {
    setOnlyEvenId(event.target.checked);
  };

  const handleScroll = (event) => {
    const { scrollTop, clientHeight, scrollHeight } = event.target;

    // Check if scrolled to the bottom of the modal
    if (scrollTop + clientHeight >= scrollHeight) {
      // Load next page if not already on the last page
      if (currentPage < totalPages) {
        setCurrentPage((prevPage) => prevPage + 1);
      }
    }
  };

  const renderContactList = () => {
    // Determine which contacts to display based on the current page
    const startIndex = (currentPage - 1) * 20;
    const endIndex = startIndex + 20;
    const contactsToDisplay = filteredContacts.slice(startIndex, endIndex);

    return (
      <ul>
        {contactsToDisplay.map((contact) => (
          <li key={contact.id} onClick={openModalC}>
            {contact.name}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <h4 className="text-center text-uppercase mb-5">Problem-2</h4>

        <div className="d-flex justify-content-center gap-3">
          <button
            className="btn btn-lg btn-outline-primary"
            type="button"
            onClick={openModalA}
          >
            All Contacts
          </button>
          <button
            className="btn btn-lg btn-outline-warning"
            type="button"
            onClick={openModalB}
          >
            US Contacts
          </button>
        </div>
      </div>

      {/* Modal A */}
      {modalAOpen && (
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
                <div className="form-check">
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
      )}

      {/* Modal B */}
      {modalBOpen && (
        <div className="modal" style={{ display: "block" }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Modal B</h5>
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
                <div className="form-check">
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
      )}

      {/* Modal C */}
      {modalCOpen && (
        <div className="modal" style={{ display: "block" }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Modal C</h5>
              </div>
              <div className="modal-body">{/* Contact details */}</div>
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
      )}
    </div>
  );
};

export default Problem2;
