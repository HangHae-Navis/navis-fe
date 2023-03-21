import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import styled from "styled-components";
import Button from "../element/Button";
import { getPartyPage } from "../utils/api/api";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Test from "../assets/d65d5952-d801-4225-ab16-8720733b499a.png";
import Pagination from "react-js-pagination";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useSetRecoilState } from "recoil";
import { partyRegistModalState } from "../store/atom";
import NavBar from "../components/party/NavBar";
import { getCookie } from "../utils/infos/cookie";

const GroupBoxComp = (props) => {
  const navigate = useNavigate();
  return (
    <>
      <GroupBox onClick={() => navigate(`/party/${props.groupId}`)}>
        <img src={props.groupImage ? props.groupImage : Test} alt="thumbnail" />
        <span className="tag">태그</span>
        <TextWrapper>
          <h1>{props.groupName}</h1>
          <p>{props.groupInfo}</p>
          <SubInfo>
            {props.adminName} | {props.memberNumber}명
          </SubInfo>
        </TextWrapper>
        <GroupDeadlineContainer>
          <GroupDeadline>
            <li>오늘까지 제출해야 할 파일</li>
            <li>
              <div className="wrapper">
                <span className="time">08:25</span>
                <span className="homework">{props.groupInfo}</span>
              </div>
            </li>
          </GroupDeadline>
        </GroupDeadlineContainer>
      </GroupBox>
    </>
  );
};

const Main = () => {
  const [groupList, setGroupList] = useState([]);
  const [totalNum, setTotalNum] = useState(0);
  const [pageNum, setPageNum] = useState(1);
  const navigate = useNavigate();
  const [activeState, setActiveState] = useState("전체그룹");
  //받아오는 데이터는 content(목록), totalElements(총 갯수), totalPages(총 페이지)를 받아옴
  //현재 받아오는 response 중 사용 중인 것은 content와 totalelements 둘 뿐, totalPages를 사용하려면 MakeButton의 로직 변경 필요
  const { isLoading } = useQuery(
    ["getList", { page: pageNum, size: 8, category: "all" }],
    () => getPartyPage({ page: pageNum, size: 8, category: "all" }),
    {
      onSuccess: ({ data }) => {
        setGroupList(data.data.content);
        setTotalNum(data.data.totalElements);
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
          itemsCountPerPage={8}
          totalItemsCount={totalNum}
          pageRangeDisplayed={5}
          onChange={(page) => {
            setPageNum(page);
          }}
        />
      </PaginationBox>
    );
  };

  return (
    <>
      <PageContainer>
        <GroupHeaderWrapper>
          <NavBar activeState={activeState} setActiveState={setActiveState} />
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
            groupList?.map((item) => {
              return (
                <GroupBoxComp
                  key={item.groupId}
                  groupId={item.groupId}
                  adminName={item.adminName}
                  groupInfo={item.groupInfo}
                  groupName={item.groupName}
                  memberNumber={item.memberNumber}
                  groupImage={item.groupImage}
                />
              );
            })
          ) : (
            <>
              <Skeleton width={380} height={510} />
              <Skeleton width={380} height={534} />
              <Skeleton width={380} height={534} />
              <Skeleton width={380} height={534} />
              <Skeleton width={380} height={534} />
              <Skeleton width={380} height={534} />
              <Skeleton width={380} height={534} />
              <Skeleton width={380} height={534} />
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
  grid-template-columns: repeat(4, 1fr);
  @media (max-width: 1400px) {
    grid-template-columns: repeat(3, 1fr);
  }
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

  li {
    font-size: 1.6rem;
    .wrapper {
      display: flex;
      gap: 0.5rem;
      width: 28rem;
      .time {
        font-size: 1.5rem;
        color: #dc3545;
      }
      .homework {
        width: 20rem;
        font-size: 1.5rem;
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
