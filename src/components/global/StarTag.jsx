import styled from "styled-components";
import star from "../../assets/ic20/star.svg";
import { tagStyle } from "../../utils/style/mixins";

const StarTag = ({ important }) => {
  const arr = new Array(important).fill(0);
  return (
    <TagWrapper>
      {important !== 0 && (
        <>
          {arr.map((_, i) => (
            <img src={star} alt="과제" />
          ))}
          <span>중요도</span>
        </>
      )}
    </TagWrapper>
  );
};

const TagWrapper = styled.section`
  ${tagStyle}
`;

export default StarTag;
