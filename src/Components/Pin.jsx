import React, { useState } from "react";
import PropTypes from "prop-types";
import { useRef } from "react";

export const Pin = ({ length, setPinInput }) => {
  const inputRef = useRef([]);
  const [inputBoxValue, setinputBoxValue] = useState(
    new Array(length).fill("")
  );
  const [inputBoxLen] = useState(new Array(length).fill(1));
  // const [PinInput, setPinInput] = useState([]);
  

  const handleChange = (e, index) => {
    if (e.nativeEvent.inputType !== "deleteContentBackward") {
      inputBoxValue[index] = e.target.value;
      setinputBoxValue(inputBoxValue);
      if (index < length - 1) {
        inputRef.current[index + 1].focus();
      }
      setPinInput(inputBoxValue.join(""));
    }
  };

  const onBackSpacehandler = (e, index) => {
    if (e.keyCode === 8) {
      if (index > 0) {
        inputRef.current[index - 1].focus();
      }
      inputBoxValue[index] = e.target.value;
      setinputBoxValue(inputBoxValue);
      setPinInput(inputBoxValue.join(""));
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const data = e.clipboardData
      .getData("text")
      .split("")
      .filter((item, index) => index < length);

    data.forEach((value, index) => {
      inputBoxValue[index] = value;
      inputRef.current[index].value = value;
      if (index < length - 1) {
        inputRef.current[index + 1].focus();
      }
    });
  };

  return (
    <div className="outer" onPaste={handlePaste}>
      {inputBoxLen.map((item, index) => {
        return (
          <input
            className="inputbox"
            ref={(ele) => {
              inputRef.current[index] = ele;
            }}
            maxLength={1}
            key={index}
            onKeyUp={(e) => onBackSpacehandler(e, index)}
            onChange={(e) => handleChange(e, index)}
          />
        );
      })}
    </div>
  );
};

Pin.propTypes = {
  length: PropTypes.number,
  onChange: PropTypes.func,
};
