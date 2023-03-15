import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import styled from "styled-components";
import PartyRegist from "../components/modal/PartyRegist";
import Button from "../element/Button";
import { getPartyPage } from "../utils/api/api";

const GroupBoxComp = (props) =>{

  return(<><GroupBox>
    <h3>그룹 리더 : {props.adminName}</h3>
    <h3>그룹 명 : {props.groupName}</h3>
    <h3>그룹 부재 : {props.groupInfo}</h3>
    <h3>참여자 수 : {props.memberNumber}</h3>
  </GroupBox>
  
  </>)
}

const GroupBox = styled.div`
  width: 30rem;
  height: 38rem;
  background-color: skyblue;
  border-radius: 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 2rem;
`

const Party = () => {
  const [groupList, setGroupList] = useState([])
  const [totalNum, setTotalNum] = useState(100)
  const [pageNum, setPageNum] = useState(1)
  //받아오는 데이터는 content(목록), totalElements(총 갯수), totalPages(총 페이지)를 받아옴
  //현재 받아오는 response 중 사용 중인 것은 content와 totalelements 둘 뿐, totalPages를 사용하려면 MakeButton의 로직 변경 필요
  const PartyList = useQuery(['getList', {page : pageNum, size : 8, category : 'all'}], () => getPartyPage({page : pageNum, size : 8, category : 'all'}))
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
      if(PartyList.data){
        setGroupList(PartyList.data.data.data.content)
        setTotalNum(PartyList.data.data.data.totalElements)
      }

  }, [PartyList.data])

  const MakeGroupHandler = () => {
    setIsOpen(true)
  }

  //하단부 버튼 구현, pageNum State를 변경시켜 버튼에 맞는 페이지 요청
  //컴포넌트 분리하기엔 기능이 너무 적어 Party 안에 구현함 
  const MakeButton = () => {
    const divs = []
      for(let i =0; i < (totalNum / 8); i++){
        divs.push(<PagenationButton onClick={() => setPageNum(i+1)} key = {i}>{i +1}</PagenationButton>)
      }
      return divs
  }


  return(<>
  <PageContainer>
    <Button transparent={false} onClick={() => MakeGroupHandler()}>
      새 그룹 만들기
    </Button>
  <GroupContainer>
    {
      groupList?.map((item) => {
        return(<GroupBoxComp key = {item.groupId}
        adminName = {item.adminName}
        groupInfo = {item.groupInfo}
        groupName = {item.groupName}
        memberNumber = {item.memberNumber}/>)
      })
    }
    </GroupContainer>
    <BottomButtonBox>
      <MakeButton></MakeButton>
    </BottomButtonBox>
  </PageContainer>
  {isOpen == true ? (
    <PartyRegist isOpen = {setIsOpen}/>
    ) : null
  }
  </>)
};

const PageContainer = styled.div`
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
height: 100vh;
`

const GroupContainer = styled.div`
  width: 130rem;
  height: 100rem;
  background-color: gray;
  display: flex;
  flex-direction: row;
  display: grid;
  grid-template-columns: repeat(4, 32rem);
  align-items: flex-start;
  padding: 2rem;
`

const PagenationButton = styled.button`
  width: 2rem;
  height: 2rem;
  background-color: black;
  color: white;
  font-size: 1.45rem;
  border-radius: 0.8rem;
  text-align: center;
`

const BottomButtonBox = styled.div`
width: 60rem;
height: 3rem;
background-color: darkcyan;
display: flex ;
align-items: center;
justify-content: center;
padding: 2rem;
`

export default Party;
