import React from "react";
import "./sucess_alert.styles.css";

export default function SuccessAlert({ open, setOpen }) {
  if (!open) return null;
  return (
    <div className="sucess__alert__wrapper">
      <div className="sucess__alert__box">
        <p> Success </p>
        <button className="close__button" onClick={() => setOpen(false)}>
          Close
        </button>
      </div>
    </div>
  );
}
