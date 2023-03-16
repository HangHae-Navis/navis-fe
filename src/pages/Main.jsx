import React, { useState } from "react";
import { useQuery } from "react-query";
import styled from "styled-components";
import PartyRegist from "../components/modal/PartyRegist";
import Button from "../element/Button";
import { getPartyPage } from "../utils/api/api";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Test from "../assets/d65d5952-d801-4225-ab16-8720733b499a.png";

const GroupBoxComp = (props) => {
  return (
    <>
      <GroupBox>
        <img src={Test} alt="thumbnail" />
        <span className="tag">태그</span>
        <TextWrapper>
          <h1>{props.groupName}</h1>
          <p>{props.groupInfo}</p>
          <SubInfo>
            {props.adminName} | {props.memberNumber}명
          </SubInfo>
        </TextWrapper>
      </GroupBox>
    </>
  );
};

const GroupBox = styled.div`
  cursor: pointer;
  width: 32rem;
  height: 45rem;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
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
  padding: 0.8rem;
  img {
    background-color: yellow;
    height: 45%;
    border-radius: 0.8rem;
    object-fit: cover;
    object-position: center;
  }
  .tag {
    margin: 1rem 0;
    padding: 0.8rem;
    background-color: #dc3545;
    width: fit-content;
    border-radius: 0.3rem;
    font-size: 1.3rem;
    color: white;
    font-weight: 500;
  }
  h1 {
    font-size: 2.3rem;
    font-weight: 600;
  }
  p {
    font-size: 1.6rem;
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

const Main = () => {
  const [groupList, setGroupList] = useState([]);
  const [totalNum, setTotalNum] = useState(100);
  const [pageNum, setPageNum] = useState(1);
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
  const [isOpen, setIsOpen] = useState(false);

  const MakeGroupHandler = () => {
    setIsOpen(true);
  };

  //하단부 버튼 구현, pageNum State를 변경시켜 버튼에 맞는 페이지 요청
  //컴포넌트 분리하기엔 기능이 너무 적어 Party 안에 구현함
  const MakeButton = () => {
    const divs = [];
    for (let i = 0; i < totalNum / 8; i++) {
      divs.push(
        <PagenationButton onClick={() => setPageNum(i + 1)} key={i}>
          {i + 1}
        </PagenationButton>
      );
    }
    return divs;
  };

  return (
    <>
      <PageContainer>
        <Button
          className="topBtn"
          transparent={false}
          onClick={() => MakeGroupHandler()}
        >
          그룹 참여하기
        </Button>
        <GroupContainer>
          {isLoading === false ? (
            groupList?.map((item) => {
              return (
                <GroupBoxComp
                  key={item.groupId}
                  adminName={item.adminName}
                  groupInfo={item.groupInfo}
                  groupName={item.groupName}
                  memberNumber={item.memberNumber}
                />
              );
            })
          ) : (
            <>
              <Skeleton width={320} height={534} />
              <Skeleton width={320} height={534} />
              <Skeleton width={320} height={534} />
              <Skeleton width={320} height={534} />
              <Skeleton width={320} height={534} />
              <Skeleton width={320} height={534} />
              <Skeleton width={320} height={534} />
              <Skeleton width={320} height={534} />
              <Skeleton width={320} height={534} />
              <Skeleton width={320} height={534} />
            </>
          )}
        </GroupContainer>
        <BottomButtonBox>
          <MakeButton />
        </BottomButtonBox>
      </PageContainer>
      {isOpen === true ? <PartyRegist isOpen={setIsOpen} /> : null}
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
  gap: 2rem;
`;

const GroupContainer = styled.div`
  align-items: center;
  justify-content: center;
  gap: 2rem;
  display: flex;
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

const PagenationButton = styled.button`
  background-color: black;
  color: white;
  font-size: 1.45rem;
  border-radius: 0.8rem;
  text-align: center;
`;

const BottomButtonBox = styled.div`
  width: 60rem;
  height: 3rem;
  background-color: darkcyan;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
`;

export default Main;
