import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { StyledCheckbox } from "../../utils/style/componentLayout";

export const Checkbox = (props) => {
    const [checkedItems, setCheckedItems] = useState(
      Array(props.props.length).fill(false)
    );
    const handleChange = (event) => {
      const target = event.target;
      const value = target.checked;
      const index = parseInt(target.name.replace("checkbox", ""), 10);
      setCheckedItems([
        ...checkedItems.slice(0, index),
        value,
        ...checkedItems.slice(index + 1),
      ]);
    };
    useEffect(() => {
      const res = [];
      checkedItems.map((item, index) => {
        if (item === true) {
          res.push(props.props[index]);
        }
      });
      props.changefunc({ value: res, id: props.id, isList: true });
    }, [checkedItems]);
  
    return props.props.map((item, index) => (
      <div key={index}>
        <label>
          <StyledCheckbox
            name={`checkbox${index}`}
            checked={checkedItems[index]}
            onChange={handleChange}
          />
          <span className="smallname">{item}</span>
        </label>
      </div>
    ));
  };