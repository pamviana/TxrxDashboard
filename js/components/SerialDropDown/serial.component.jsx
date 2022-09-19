import React from "react";
import "./serial.styles.css";

function SerialDropDown({ serial, setSerial }) {
  const handleSerialChange = (e) => {
    setSerial(e.target.value);
  };

  return (
    <>
      <form className="serial-form">
      <label htmlFor="serial-select">Serial</label>
        <select id="serial-select" value={serial} onChange={handleSerialChange}>
          <option>556677</option>
          
        </select>
      </form>
    </>
  );
}

export default SerialDropDown;
