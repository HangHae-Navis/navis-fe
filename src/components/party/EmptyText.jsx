import styled from "styled-components";

export const EmptyText = (props) => {
  return (
    <>
      {props.type === "board" ? (
        <PartyEmptyTextBox>
          <h1>게시글이 없습니다.</h1>
        </PartyEmptyTextBox>
      ) : (
        <PartyEmptyTextBox style={{ width: "65vw", backgroundColor: "transparent" }}>
          <h2>마감이 임박한 과제가 없습니다.</h2>
        </PartyEmptyTextBox>
      )}
    </>
  );
};

const PartyEmptyTextBox = styled.div`
  width: 65vw;
  height: 40rem;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.theme.color.zeroOne};
  border-radius: 0.8rem;
  margin-left: 1rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  h1 {
    font-size: 3.5rem;
    color: rgb(88, 85, 133, 0.5);
  }
  h2 {
    padding-bottom: 2rem;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    font-size: 3rem;
    font-weight: 600;
    color: white;
  }
`;
