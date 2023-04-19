import Button from "../../element/Button";
import React from "react";
import { FullDateCheck, ShortCheck } from "../../element/DateCheck";
import styled from "styled-components";
import Slidechart from "../party/SlideChart.jsx"


export const VoteBox = (props) =>{
    const now = new Date().getTime();

    return(
        props.database == -1 && now < new Date(props.res?.data.data.data.expirationTime).getTime() ? (
          <DetailVoteContentContainer>
            <h1 className="smallname">마감시간 : {FullDateCheck(props.res?.data.data.data.expirationTime)}</h1>
            {props.res?.data.data.data.optionList?.map((item) => (
              <label key={item.optionId}>
                <DetailVoteContainer>
                  <input
                    type="radio"
                    value={item.optionId}
                    checked={props.voteSelectedOption == item.optionId}
                    onChange={(event) =>
                        props.setVoteSelectedOption(event.target.value)
                    }
                  />
                  <h1 className="name">{item.option}</h1>
                </DetailVoteContainer>
              </label>
            ))}
            <DetailVoteButtonBox>
              <Button onClick={props.OnVotePost}>투표하기</Button>
              <Button
                transparent={true}
                onClick={() => props.setDatabase(-2)}
                color="rgb(88, 85, 133)"
              >
                결과보기
              </Button>
            </DetailVoteButtonBox>
          </DetailVoteContentContainer>
        ) : (
          <DetailVoteContentContainer>
            <h1 className="smallname">마감시간 : {FullDateCheck(props.res?.data.data.data.expirationTime)}</h1>
            {props.res?.data.data.data.optionList?.map((item) => (
              <Slidechart
                key={item.optionId}
                option={item.option}
                voteMax={props.voteMax}
                count={item.count}
              />
            ))}
            <DetailVoteButtonBox>
              {props.database == -2 ? (
                <Button
                  transparent={true}
                  onClick={() => props.setDatabase(-1)}
                  color="rgb(88, 85, 133)"
                >
                  투표하기
                </Button>
              ) : now < new Date(props.res?.data.data.data.expirationTime).getTime() ? (
                <Button
                  transparent={true}
                  onClick={() =>
                    props.doDeleteVote({
                      groupId : props.groupId,
                      voteId: props.res?.data?.data?.data?.id,
                    })
                  }
                  color="rgb(88, 85, 133)"
                >
                  다시하기
                </Button>
              ) : null}

              <h1 className="smallname"> {props.voteMax}명 투표함</h1>
            </DetailVoteButtonBox>
          </DetailVoteContentContainer>
        )
      )
}


const DetailVoteButtonBox = styled.div`
display: flex;
flex-direction: row;
align-items: center;
gap: 1.5rem;
`;
const DetailVoteContainer = styled.div`
display: flex;
flex-direction: row;
align-items: center;
gap: 2rem;
text-align: center;
`;

const DetailVoteContentContainer = styled.div`
width: fit-content;
max-width: 50%;
height: 100%;
display: flex;
flex-direction: column;
border-radius: 4rem;
border: 0.1rem solid #d4d2e3;
padding: 5rem;
gap: 2rem;
.name {
  font-weight: 400;
  font-size: 2.2rem;
  color: #5d5a88;
}
.smallname {
  font-weight: 400;
  font-size: 1.8rem;
  color: #9795b5;
}
.date {
  font-weight: 400;
  font-size: 2rem;
  color: #9795b5;
}
`;

