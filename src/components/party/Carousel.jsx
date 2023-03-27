import { useNavigate } from "react-router";
import styled from "styled-components";
import { FullDateCheck } from "../../element/DateCheck";

const Carousel = (props) => {
  const currentTime = new Date();
  const targetTime = new Date(props.expirationDate);
  const timeDiffInMs = targetTime - currentTime;
  const hoursDiff = Math.floor(timeDiffInMs / (1000 * 60 * 60));
  const navi = useNavigate();

  return (
    <CarouselItem
      onClick={() =>
        navi(
          `/party/detail?groupId=${props.groupId}&detailId=${props.id}&dtype=homework`
        )
      }
    >
      <BoardBoxTitleBox>
        <TopInfoWrapper>
          {hoursDiff >= 0 ? (
            <span className="plus">마감 {hoursDiff}시간 전</span>
          ) : (
            <span className="minus">마감 {-hoursDiff}시간 지남</span>
          )}
          <h1>{props.title}</h1>
        </TopInfoWrapper>
        <BottomInfoWrapper>
          <p>
            {props.nickName} | {FullDateCheck(props.expirationDate)}
          </p>
        </BottomInfoWrapper>
      </BoardBoxTitleBox>
    </CarouselItem>
  );
};

const TopInfoWrapper = styled.section`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

const BottomInfoWrapper = styled.section`
  p {
    color: ${(props) => props.theme.color.grey40};
    font-size: 1.1rem;
  }
`;

const CarouselItem = styled.div`
  width: 25rem;
  height: 15rem;
  border-radius: 1rem;
  background-color: #ffffff;
`;

const BoardBoxTitleBox = styled.div`
  padding: 2rem;
  height: 100%;
  flex-direction: column;
  justify-content: space-around;
  width: 100%;
  font-size: 2.45rem;
  display: flex;
  gap: 0.8rem;
  .title {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 1.8rem;
    font-weight: 600;
  }
  .subtitle {
    font-size: 1.3rem;
    color: ${(props) => props.theme.color.grey80};
  }
  span {
    background: rgba(220, 53, 69, 0.2);
    border-radius: 0.8rem;
    font-size: 1.2rem;
    width: fit-content;
    padding: 0.8rem;
  }
`;

export default Carousel;
