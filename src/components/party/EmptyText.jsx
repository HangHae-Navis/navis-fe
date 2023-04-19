import { PartyEmptyTextBox } from "../../utils/style/componentLayout";

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
