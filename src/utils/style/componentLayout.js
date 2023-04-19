import styled from "styled-components";
import { motion } from "framer-motion";
import { flexCenter } from "./mixins";

export const PartyEmptyTextBox = styled.div`
  width: 65vw;
  height: 40rem;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.theme.color.zeroOne};
  border-radius: 0.8rem;
  margin-left: 1rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  h1 {
    font-size: 3.5rem;
    color: rgb(88, 85, 133, 0.5);
  }
  h2 {
    padding-bottom: 2rem;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    font-size: 3rem;
    font-weight: 600;
    color: white;
  }
`;

export const SurveyModalSurveyAnswerBox = styled.div`
align-items: flex-start;
flex-direction: column;
display: flex;
gap: 1rem;
    width: 100%;
    padding: 2rem;
    background-color: white;
border-radius: 2.4rem;
border: 0.2rem solid #C0C0C0;
    white-space: pre-wrap;
    text-overflow: ellipsis;
    word-break: break-all;
`

export const SurveyModalRegistModalBackGround = styled.div`    
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 999;
  background-color: rgba(0, 0, 0, 0.5);
  ${flexCenter}
  .filetext {
  font-weight: 700;
  font-size: 2.2rem;
  }
.buttontitle {
  font-weight: 700;
  font-size: 2.4rem;
  color: #5D5A88;
}
.buttontitleoff {
  font-weight: 400;
  font-size: 2.4rem;
  color: #9795B5;
}
.infotitle{
  font-weight: 700;
  font-size: 2.4rem;
  color: #5D5A88;
}

.rejecttext{
  font-weight: 500;
  font-size: 1.8rem;
  color: #5D5A88
}

.infocontent{
  font-weight: 400;
  font-size: 1.8rem;
  color: #9795B5
}
`;

export const SurveyModalSubmitFileContainer = styled.div`
min-width: 100%;
min-height: 90%;
padding-bottom: 2rem;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: flex-start;
  gap: 2rem;
`;

export const SurveyModalSubmitFileModalWrapper = styled(motion.section)` 
  width: 40vw;
  min-height: 40vw;
  overflow-y: auto;  
  max-height: 90vh;  
  display: flex;
align-items: flex-start;
  flex-direction: column;
  padding: 4rem;
  border-radius: 2.5rem;     
  background-color: #F2F1FA; 
  gap: 10rem;
  ::-webkit-scrollbar {
    display: none;
  }
`;


export const StyledCheckbox = styled.input.attrs({ type: "checkbox" })`
  border-radius: 3px;
  border: 1px solid #ccc;
  background-color: #fff;
  width: 16px;
  height: 16px;
  margin-right: 8px;
  cursor: pointer;

  &:checked {
  }
`;
export const ProfileGroupButtonBox = styled.div`
display: flex;
flex-direction: row;
align-items: center;
gap: 0.5rem;
`;

export const ProfileGroupListBox = styled.div`
display: flex;
padding-right: 2rem;
flex-direction: row;
align-items: center;
justify-content: space-between;
border-radius: 2rem;
width: 100%;
@media (max-width: 1230px) {
  flex-direction: column;
align-items: flex-start;
}
`;

export const ProfileGroupListTitleBoxRight = styled.div`
width: 100%;
display: flex;
flex-direction: row;
justify-content: flex-end;
align-items: center;
gap: 0.5rem;
`
export const ProfileGroupListTitleBox = styled.div`
width: 100%;
padding: 2rem;
display: flex;
flex-direction: row;
justify-content: space-between;
align-items: center;
gap: 0.5rem;
.name {
  width: 35%;
  font-weight: 400;
  font-size: 2.2rem;
  color: #5d5a88;
}
.date {
  text-align: left;
  font-weight: 400;
  font-size: 1.8rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: #9795b5;
}
`;




export const StyledInput = styled.input`
  border: none;
  padding: 10px;
  background-color: transparent;
  color: #333;
  font-size: 16px;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: #d4d2e3;
  }
`;

export const SubmiterButton = styled.button`
  width: 8rem;
  height: 3rem;
  background-color: transparent;
  border-radius: 2.4rem;
  border: 0.1rem solid #5d5a88;
`;

export const ProfileGroupInfoImage = styled.img`
  border-radius: 2rem;
  width: 100%;
  height: 100%;
  max-width: 18rem;
  max-height: 18rem;
  object-fit: cover;
`;