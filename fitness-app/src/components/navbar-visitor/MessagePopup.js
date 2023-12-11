import React, { useState } from "react";

const MessagePopup = ({ message }) => {
  const [isOpen, setIsOpen] = useState(true);

  const handleClose = () => {
    setIsOpen(false);
    window.location.reload();
  };

  return (
    isOpen && (
      <div style={styles.popup}>
        <div style={styles.popupContent}>
          <span style={styles.closeButton} onClick={handleClose}>
            &times;
          </span>
          <p style={styles.text}>{message}</p>
        </div>
      </div>
    )
  );
};

const styles = {
  popup: {
    position: "fixed",
    top: "50%", // Center vertically
    left: "50%", // Center horizontally
    transform: "translate(-50%, -50%)", // Center the element itself
    backgroundColor: "#fff", // White background color
    padding: "10px",
    borderRadius: "5px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    zIndex: "999",
  },

  popupContent: {
    position: "relative",
  },

  text: {
    color: "black",
  },

  closeButton: {
    position: "absolute",
    top: "5px",
    right: "5px",
    fontSize: "18px",
    cursor: "pointer",
    color: "#000", // Black color for close 'x'
  },
};

export default MessagePopup;
