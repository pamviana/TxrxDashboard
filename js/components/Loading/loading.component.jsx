import React from "react";
import "./loading.styles.css";

export default function Loading({ open }) {
  if (!open) return null;

  return (
    <div className="loading__wrapper">
      <div className="loader"></div>
    </div>
  );
}
