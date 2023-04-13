import styled from "styled-components";
import star from "../../assets/ic20/star.svg";
import { tagStyle } from "../../utils/style/mixins";

const StarTag = ({ important }) => {
  const arr = important ? new Array(parseInt(important)).fill(0) : [];
  return (
    <>
      {important !== undefined && important !== 0 && (
        <TagWrapper>
          {arr.map((_, i) => (
            <img src={star} alt="과제" key={i} />
          ))}
          <span>중요도</span>
        </TagWrapper>
      )}
    </>
  );
};

const TagWrapper = styled.section`
  ${tagStyle}
`;

export default StarTag;
