import { useEffect } from "react";
import styled from "styled-components";

const RadioButtons = ({
  options,
  categoryValue,
  partyRes,
  selected,
  setSelected,
  type
}) => {
  useEffect(() => {
    if( type == 'first'){
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
    }
    else{
      switch (selected) {
        case 0:
          categoryValue("new");
          console.log("1번 작동")
          break;
        case 1:
          categoryValue("important");
          console.log("2번 작동")
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
  width: 5rem;
  height: 4rem;
  border: none;
  font-size: 1.75rem;
  background-color: transparent;
  color: ${({ selected }) => (selected ? "#585585" : "#585585")};
`;
const RadioBox = styled.div``;

export default RadioButtons;
