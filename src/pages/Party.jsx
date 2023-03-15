import React from "react";
import { useQuery } from "react-query";
import styled from "styled-components";
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

  const PartyList = useQuery(['getList'], getPartyPage)



  if(PartyList.isLoading){
    return <div>로딩중.........로딩중.........딩중.........로딩중.........</div>;
  }
  else if(PartyList.isError){
    return <div>에러!!!!!!!!에러!!!!!!!!에러!!!!!!!!</div>;
  }

  console.log(PartyList)

  return(<>
  <PageContainer>
  <GroupContainer>
    <GroupBoxComp />
    <GroupBoxComp />
    <GroupBoxComp />
    <GroupBoxComp />
    <GroupBoxComp />
    <GroupBoxComp />
    <GroupBoxComp />
    <GroupBoxComp />
    </GroupContainer>;
  </PageContainer>
  </>)
};

const PageContainer = styled.div`
padding-top: 10.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;

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

export default Party;
