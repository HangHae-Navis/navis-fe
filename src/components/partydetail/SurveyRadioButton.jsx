import React from "react";
import { useState } from "react";
import { useEffect } from "react";

export const SurveyRadioButton = (props) => {
    const [selectedOption, setSelectedOption] = useState("");
  
    const handleOptionChange = (event) => {
      setSelectedOption(props.props[event.target.value - 1]);
    };
  
    useEffect(() => {
      const res = [];
      res.push(selectedOption);
      props.changefunc({ value: res, id: props.id, isList: true });
    }, [selectedOption]);
  
    return (
      <>
        {props.props.map((item, index) => (
          <label key={props.survId + index}>
            <input
              type="radio"
              name={item + props.survId}
              value={index + 1}
              checked={selectedOption === props.props[index]}
              onChange={handleOptionChange}
            />
            <span className="smallname"> {item}</span>
          </label>
        ))}
      </>
    );
  };