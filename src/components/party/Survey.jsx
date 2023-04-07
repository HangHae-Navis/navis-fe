import React from "react";
import CopyToClipboard from "react-copy-to-clipboard";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import styled from "styled-components";
import copy from "../../assets/ic14/copy.svg";
import write from "../../assets/ic24/write.svg";
import remove from "../../assets/ic24/delete.svg";
import { useState } from "react";

function Checkbox({ children, disabled, checked, onChange }) {
    return (
      <label>
        <input
          type="checkbox"
          disabled={disabled}
          checked={checked}
          onChange={({ target: { checked } }) => onChange(checked)}
        />
        {children}
      </label>
    );
  }

const Survey = (props) =>{

    const testList = [{type : "CheckBox", content : "이것은 체크박스입니다.", value : ["1번","2번","3번"]},
                      {type : "Descriptive", content : "이것은 서술형입니다.", value : "",},
                      {type : "Objective", content : "이것은 객관형입니다.", value : ["1번","2번","3번","4번"],}];

    const [value, setValue] = useState()
    return (<>
    <SurveyBackground>
        {testList.map((item, index) => {
  switch(item.type) {
    case 'CheckBox':
      return (
        <SurveyTypeCheckBox key={index}>
          <h1 className="name">{index+1}. {item.content}</h1>
          {/* 체크박스 컴포넌트 구현 */}
        </SurveyTypeCheckBox>
      );
    case 'Descriptive':
      return (
        <SurveyTypeDescriptive key={index}>
          <h1 className="name">{index+1}. {item.content}</h1>
          
          <InputWrapper>
            <form className="form" onSubmit={(e) => {e.preventDefault();}}>
              <section className="center">
                <div className="inputLayout">
                  <textarea
                    cols="49"
                    rows="2"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                  />
                </div>
              </section>
            </form>
          </InputWrapper>
        </SurveyTypeDescriptive>
      );
    case 'Objective':
      return (
        <SurveyTypeObjective key={index}>
          <h1 className="name">{index+1}. {item.content}</h1>
          {/* 객관형 컴포넌트 구현 */}
        </SurveyTypeObjective>
      );
    default:
      return null;
  }
})}
    </SurveyBackground>
    </>)
}

export default Survey;

const InputWrapper = styled.section`
  width: 100%;
  display: flex;
  gap: 1rem;

  .center {
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
  }

  .form {
    width: 100%;
    .inputLayout {
      display: flex;
      align-items: center;
      textarea {
        background-color: #F6F6F6;
border-radius: 1.6rem;
        width: 100%;
        border-radius: 0.4rem;
        border: none;
        font-size: 1.1rem;
        padding: 0.8rem;
        resize: none;
        &:focus {
          outline: none;
        }
      }
    }
  }
`;

const SurveyTypeDescriptive = styled.div`
align-items: flex-start;
flex-direction: column;
display: flex;
gap: 1rem;
    width: 90%;
    max-height: 20rem;
    padding: 2rem;
    background-color: white;
border-radius: 2.4rem;
border: 0.2rem solid #C0C0C0;
`

const SurveyTypeCheckBox = styled.div`
align-items: flex-start;
flex-direction: column;
display: flex;
gap: 1rem;
width: 90%;
max-height: 20rem;
    padding: 2rem;
background-color: white;
border-radius: 2.4rem;
border: 0.2rem solid #C0C0C0;
`

const SurveyTypeObjective = styled.div`
align-items: flex-start;
flex-direction: column;
display: flex;
gap: 1rem;
width: 90%;
max-height: 20rem;
    padding: 2rem;
background-color: white;
border-radius: 2.4rem;
border: 0.2rem solid #C0C0C0;
`

const SurveyBackground = styled.div`
width: 100%;
height: 100rem;
gap: 2rem;
    align-items: center;
    flex-direction: column;
    display: flex;
    background-color: #F6F6F6;
    padding-top: 1rem;
  overflow: hidden;
  border-radius: 2.4rem;
  .buttontext {
    font-weight: 400;
    font-size: 1.4rem;
    color: #5d5a88;
  }
  .filename {
    font-weight: 400;
    font-size: 1.6rem;
    color: #9795b5;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
  .name {
    font-weight: 400;
    font-size: 2.2rem;
    color: #222222;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .smallname {
    font-weight: 400;
    font-size: 1.8rem;
    color: #9795b5;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .date {
    font-weight: 400;
    font-size: 2rem;
    color: #9795b5;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
`

