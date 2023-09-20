import React, { useState, useEffect } from "react";
import ModalA from "./ModalA";
import ModalB from "./ModalB";
import ModalC from "./ModalC";

const Problem2 = () => {
  const containerRef = React.useRef(null);
  const [modalAOpen, setModalAOpen] = useState(false);
  const [modalBOpen, setModalBOpen] = useState(false);
  const [modalCOpen, setModalCOpen] = useState(false);
  const [contacts, setContacts] = useState([]);
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [onlyEvenId, setOnlyEvenId] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [contactDetails, setContactDetails] = useState({});

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
        `https://contact.mediusware.com/api/contacts/?page=${currentPage}`
      );
      const data = await response.json();
      setContacts(data?.results);
      setTotalPages(data?.count / 20);
      console.log(data?.count / 20);
    } catch (error) {
      console.error("Error fetching contacts:", error);
    }
  };

  const filterContacts = () => {
    let filtered = contacts;

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter((contact) =>
        contact.country.name.toLowerCase().includes(searchQuery.toLowerCase())
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
    setSearchQuery("");
  };

  const openModalB = () => {
    setModalAOpen(false);
    setModalBOpen(true);
    setModalCOpen(false);
    setCurrentPage(1);
    setSearchQuery("United States");
  };

  const openModalC = (contact) => {
    setModalAOpen(false);
    setModalBOpen(false);
    setModalCOpen(true);
    setContactDetails(contact);
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
    const { scrollTop, clientHeight, scrollHeight } = containerRef.current;

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
          <li
            style={{ cursor: "pointer", marginTop: "6px" }}
            key={contact.id}
            onClick={() => openModalC(contact)}
          >
            {contact.phone}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className="container" ref={containerRef}>
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
        <ModalA
          searchQuery={searchQuery}
          handleSearchChange={handleSearchChange}
          onlyEvenId={onlyEvenId}
          handleCheckboxChange={handleCheckboxChange}
          handleScroll={handleScroll}
          openModalA={openModalA}
          openModalB={openModalB}
          closeModal={closeModal}
          renderContactList={renderContactList}
        />
      )}

      {/* Modal B */}
      {modalBOpen && (
        <ModalB
          searchQuery={searchQuery}
          handleSearchChange={handleSearchChange}
          onlyEvenId={onlyEvenId}
          handleCheckboxChange={handleCheckboxChange}
          handleScroll={handleScroll}
          openModalA={openModalA}
          openModalB={openModalB}
          closeModal={closeModal}
          renderContactList={renderContactList}
        />
      )}

      {/* Modal C */}
      {modalCOpen && (
        <ModalC
          openModalA={openModalA}
          openModalB={openModalB}
          closeModal={closeModal}
          contactDetails={contactDetails}
        />
      )}
    </div>
  );
};

export default Problem2;
