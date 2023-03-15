import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import styled from "styled-components";
import Button from "../element/Button";
import { getPartyPage } from "../utils/api/api";

const GroupBoxComp = () =>{

  


  return(<><GroupBox>
    <h3>sdsd</h3>
    <h3>cc</h3>
    <h3>bb</h3>
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
  const PartyList = useQuery(['getList'], getPartyPage)

  useEffect(() => {
      if(PartyList.data){
        setGroupList(PartyList.data.data)
        console.log('받아오기 성공')
        console.log(groupList)
      }

  }, [PartyList.data])

  const MakeGroupHandler = () => {


  }

  const MakeButton = () => {
    const divs = []
      for(let i =0; i < (totalNum / 8); i++){
        console.log(i+1)
        divs.push(<PagenationButton>{i +1}</PagenationButton>)
      }
      return divs
  }

  if(PartyList.isLoading){
    return <div>로딩중.........로딩중.........딩중.........로딩중.........</div>;
  }
  else if(PartyList.isError){
    return <div>에러!!!!!!!!에러!!!!!!!!에러!!!!!!!!</div>;
  }
  //console.log(PartyList.data.data)
//<Button transparent={true} onClick={onLogout}>
  return(<>
  <PageContainer>
    <Button transparent={false} onClick={() => MakeGroupHandler()}>
      새 그룹 만들기
    </Button>
  <GroupContainer>
    <GroupBoxComp />
    <GroupBoxComp />
    <GroupBoxComp />
    <GroupBoxComp />
    <GroupBoxComp />
    <GroupBoxComp />
    <GroupBoxComp />
    <GroupBoxComp />
    </GroupContainer>
    <BottomButtonBox>
      <MakeButton></MakeButton>
    </BottomButtonBox>
  </PageContainer>
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
  display: grid;
  grid-template-columns: repeat(4, 32rem);
  align-items: center;
  padding: 2rem;
`

const PagenationButton = styled.div`
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
