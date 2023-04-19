import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import styled from "styled-components";
import Button from "../element/Button";
import { getPartyPage } from "../utils/api/api";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Test from "./../assets/Image Placeholder.svg";
import Pagination from "react-js-pagination";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useSetRecoilState } from "recoil";
import { partyRegistModalState } from "../store/atom";
import NavBar from "../components/party/NavBar";
import { getCookie } from "../utils/infos/cookie";
import { HourCheck } from "../element/DateCheck";
import { useRef } from "react";

const EmptyText = () =>{
  return(<EmptyTextBox>
    <h1>가입한 그룹이 없습니다.</h1>
    <h2>가이드 그룹 코드 : jkljosgyvm</h2>
  </EmptyTextBox>)
  
}

const EmptyTextBox = styled.div`
  width: 110vw;
  height: 40rem;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.theme.color.zeroOne};
  border-radius: 0.8rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  h1 {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    font-size: 8rem;
    font-weight: 600;
    color : rgb(88, 85, 133, 0.5)
  }
  h2 {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    font-size: 3rem;
    font-weight: 600;
    color : rgb(88, 85, 133, 0.5)
  }
`;

const GroupBoxComp = (props) => {
  const navigate = useNavigate();
  const [onDeadLine, setOnDeadLine] = useState(false);
  useEffect(() => {
    if (
      props.expirationDate !== "1970년 1월 1일 오전 9:00" &&
      props.expirationDate !== "1월 1일 오전 9:00"
    ) {
      setOnDeadLine(true);
    }
  }, []);
  return (
    <>
      <GroupBox onClick={() => navigate(`/party/${props.groupId}`)}>
        <img src={props.groupImage ? props.groupImage : Test} alt="thumbnail" />
        <TextWrapper>
          <h1>{props.groupName}</h1>
          <p>{props.groupInfo}</p>
          <SubInfo>
            {props.adminName} | {props.memberNumber}명
          </SubInfo>
        </TextWrapper>
        <GroupDeadlineContainer>
          <GroupDeadline>
            {onDeadLine === true ? (
              <>
                <li>24시간 내 제출해야 할 과제</li>
                <li>
                  <div className="wrapper">
                    <span className="time">{props.expirationDate}</span>
                    <span className="homework">{props.homeworkTitle}</span>
                  </div>
                </li>
              </>
            ) : (
              <>
                <li className="unable">24시간 내 제출해야 할 과제</li>
                <div className="wrapper unable">
                  <span className="homework">과제가 존재하지 않습니다.</span>
                </div>
              </>
            )}
          </GroupDeadline>
        </GroupDeadlineContainer>
      </GroupBox>
    </>
  );
};

const Main = () => {
  const totalNum = useRef(0)
  const filterParam = useRef("all")
  const navigate = useNavigate();
  const [groupList, setGroupList] = useState([]);
  const [pageNum, setPageNum] = useState(1);
  const [activeState, setActiveState] = useState("전체그룹");
  const { isLoading } = useQuery(
    ["getList", { page: pageNum, size: 6, category: filterParam.current}],
    () => getPartyPage({ page: pageNum, size: 6, category: filterParam.current}),
    {
      onSuccess: ({ data }) => {
        setGroupList(data.data.content);
        totalNum.current = data.data.totalElements;
      },
    }
  );
  const setIsOpen = useSetRecoilState(partyRegistModalState);

  const MakeGroupHandler = () => {
    setIsOpen(true);
  };

  useEffect(() => {
    const isUserCookie = getCookie("token");
    if (isUserCookie === undefined) {
      navigate("/");
      toast.error("로그인이 다시 필요합니다.", {
        toastId: "rollback",
      });
    }
  }, []);

  //하단부 버튼 구현, pageNum State를 변경시켜 버튼에 맞는 페이지 요청
  //컴포넌트 분리하기엔 기능이 너무 적어 Party 안에 구현함
  const MakeButton = () => {
    return (
      <PaginationBox>
        <Pagination
          activePage={pageNum}
          itemsCountPerPage={6}
          totalItemsCount={totalNum.current}
          pageRangeDisplayed={5}
          onChange={(page) => {
            setPageNum(page);
          }}/>
      </PaginationBox>
    );
  };

  return (
    <>
      <PageContainer>
        <GroupHeaderWrapper>
          <NavBar
            setState={filterParam}
            activeState={activeState}
            setActiveState={setActiveState}
          />
          <Button
            className="topBtn"
            transparent={false}
            onClick={() => MakeGroupHandler()}
            br={false}
          >
            +그룹 추가
          </Button>
        </GroupHeaderWrapper>
        <GroupContainer>
          {isLoading === false ? (
          groupList?.length == 0
          ? <EmptyText></EmptyText>
          : groupList?.map((item) => {
              return (
                <GroupBoxComp
                  key={item.groupId}
                  groupId={item.groupId}
                  adminName={item.adminName}
                  groupInfo={item.groupInfo}
                  groupName={item.groupName}
                  memberNumber={item.memberNumber}
                  groupImage={item.groupImage}
                  expirationDate={HourCheck(item.expirationDate)}
                  homeworkTitle={item.homeworkTitle}
                />
              );
            })
          ) : (
            <>
              <Skeleton width={380} height={510} />
              <Skeleton width={380} height={510} />
              <Skeleton width={380} height={510} />
              <Skeleton width={380} height={510} />
              <Skeleton width={380} height={510} />
              <Skeleton width={380} height={510} />
            </>
          )}
        </GroupContainer>
        <MakeButton />
      </PageContainer>
    </>
  );
};

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100vw;
  margin: 0 auto;
  margin-top: 14rem;
  gap: 1rem;
`;

const GroupContainer = styled.div`
  align-items: center;
  justify-content: center;
  gap: 2rem;
  display: flex;
  max-width: 160rem;
  flex-direction: row;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  @media (max-width: 965px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 700px) {
    grid-template-columns: repeat(1, 1fr);
  }
  align-items: flex-start;
`;

const GroupHeaderWrapper = styled.section`
  justify-content: space-between;
  display: flex;
  align-items: center;
  width: 85vw;
  margin-bottom: 3rem;
  max-width: 158rem;
`;

const GroupBox = styled.div`
  cursor: pointer;
  width: 38rem;
  height: 51rem;
  background-color: ${(props) => props.theme.color.zeroOne};
  border-radius: 0.8rem;
  display: flex;
  gap: 1rem;
  flex-direction: column;
  @media (max-width: 1400px) {
    width: 29rem;
  }
  @media (max-width: 965px) {
    width: 32rem;
  }
  @media (max-width: 700px) {
    width: 80vw;
    min-width: 30rem;
  }
  padding: 1.6rem;
  img {
    background-color: ${(props) => props.theme.color.zeroThree};
    height: 26.6rem;
    border-radius: 1.6rem;
    object-fit: cover;
    object-position: center;
  }
  .tag {
    margin: 1rem 0;
    padding: 0.6rem 0.8rem;
    width: fit-content;
    border-radius: 0.8rem;
    font-size: 1.4rem;
    background-color: #ffffff;
    color: ${(props) => props.theme.color.zeroFour};
    font-weight: 500;
  }
  h1 {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    font-size: 2.3rem;
    font-weight: 600;
  }
  p {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    font-size: 1.6rem;
  }
`;

const GroupDeadlineContainer = styled.div`
  padding-top: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const GroupDeadline = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  height: 7.2rem;
  border-radius: 2.2rem;
  padding: 1.2rem 1.6rem;
  background-color: #ffffff;
  gap: 0.4rem;

  .unable {
    color: ${(props) => props.theme.color.zeroThree};
    font-size: 1.5rem;

    .homework {
      font-size: 1.4rem;
    }
  }

  li {
    width: 100%;
    font-size: 1.6rem;
    .wrapper {
      display: flex;
      gap: 0.5rem;
      width: 28rem;
      align-items: center;
      .time {
        width: fit-content;
        font-size: 1.3rem;
        color: #dc3545;
      }
      .homework {
        width: 15rem;
        font-size: 1.25rem;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
  }
`;

const SubInfo = styled.div`
  font-size: 1.5rem;
  color: #878d96;
`;

const TextWrapper = styled.section`
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
`;

const PaginationBox = styled.div`
  .pagination {
    padding: 10rem 0;
    display: flex;
    bottom: 5rem;
    left: 50%;
  }
  ul {
    list-style: none;
    padding: 0;
  }
  ul.pagination li {
    display: inline-block;
    width: 5rem;
    height: 3rem;
    border: 0.05rem solid ${(props) => props.theme.color.zeroFour};
    display: flex;
    justify-content: center;
    align-items: center;
    a {
      font-size: 1.2rem;
    }
  }
  ul.pagination li:first-child {
    border-radius: 5px 0 0 5px;
    a {
      font-size: 1.8rem;
    }
  }
  ul.pagination li:last-child {
    border-radius: 0 5px 5px 0;
    a {
      font-size: 1.8rem;
    }
  }
  ul.pagination li a {
    text-decoration: none;
    color: ${(props) => props.theme.color.zeroThree};
  }
  ul.pagination li.active {
    background-color: ${(props) => props.theme.color.zeroFour};
  }
`;

export default Main;
