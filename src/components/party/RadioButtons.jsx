import { useEffect } from "react";
import styled from "styled-components";

const RadioButtons = ({
  options,
  categoryValue,
  partyRes,
  selected,
  setSelected,
  type,
}) => {
  useEffect(() => {
    if (type == "first") {
      switch (selected) {
        case 0:
          categoryValue("all");
          partyRes.refetch();
          break;
        case 1:
          categoryValue("notice");
          partyRes.refetch();
          break;
        case 2:
          categoryValue("vote");
          partyRes.refetch();
          break;
        case 3:
          categoryValue("homework");
          partyRes.refetch();
          break;
        case 4:
          categoryValue("board");
          partyRes.refetch();
          break;
        default:
          break;
      }
    } else {
      switch (selected) {
        case 0:
          categoryValue("id");
          break;
        case 1:
          categoryValue("important");
          break;
        default:
          break;
      }
    }
  }, [selected]);

  return (
    <RadioBox>
      {options.map((option, index) => (
        <RadioButtonStyled
          key={index}
          style={{ opacity: selected === index ? 1 : 0.5 }}
          onClick={() => setSelected(index)}
        >
          {option}
        </RadioButtonStyled>
      ))}
    </RadioBox>
  );
};

const RadioButtonStyled = styled.button`
  width: max-content;
  height: 4rem;
  border: none;
  font-size: 1.75rem;
  background-color: transparent;
  color: ${({ selected }) => (selected ? "#585585" : "#585585")};
`;
const RadioBox = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 2rem;
`;

export default RadioButtons;
