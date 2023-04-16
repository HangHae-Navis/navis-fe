import { useNavigate } from "react-router";
import styled from "styled-components";
import { useQueryClient } from "react-query";

const FloatingMenu = (props) => {
  const navi = useNavigate();
  const queryClient = useQueryClient();

  const naviToRecent = (data) => {
    queryClient.removeQueries("partyDetail");
    navi(
      `/party/detail?groupId=${props.groupId}&detailId=${data.id}&dtype=${data.dtype}&groupName=${props.groupName}&groupInfo=${props.groupInfo}&groupCode=${props.groupCode}`
    );
    window.location.reload();
  };

  return (
    <FloatingButtonsContainer>
      <FloatingButtonsList>
        <h1 className="title">최근 열람한 게시글</h1>
        {props?.props?.map((item) => (
          <h1
            onClick={() => naviToRecent(item)}
            key={item.id}
            className="subtitle"
          >
            {item.title}
          </h1>
        ))}
      </FloatingButtonsList>
    </FloatingButtonsContainer>
  );
};

export default FloatingMenu;

const FloatingButtonsContainer = styled.div`
  width: 100%;
  max-width: 22.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.3rem;
  position: fixed;
  top: 48rem;
  left: 6vw;
  gap: 0.4rem;

  .title {
    margin-bottom: 0.8rem;
    font-weight: 600;
    font-size: 1.6rem;
    color: rgb(88, 85, 133);
  }
  .subtitle {
    width: 100%;
    cursor: pointer;
    font-weight: 400;
    font-size: 1.15rem;
    color: #9795b5;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

const FloatingButtonsList = styled.ul`
  display: inline-block;
  list-style: none;
  position: fixed;
  top: 50rem;
  width: 20vw;
  max-width: 15rem;
  left: 4vw;
  gap: 1rem;
  padding: 1rem;
  min-height: 5rem;
  border-radius: 2rem;
  background: #ffffff;
`;
