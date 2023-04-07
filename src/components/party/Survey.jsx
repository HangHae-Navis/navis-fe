import React from "react";
import CopyToClipboard from "react-copy-to-clipboard";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import styled from "styled-components";
import copy from "../../assets/ic14/copy.svg";
import write from "../../assets/ic24/write.svg";
import remove from "../../assets/ic24/delete.svg";
import { useState } from "react";
import Button from "../../element/Button";
import { useEffect } from "react";

const Checkbox = (props) => {
  const [checkedItems, setCheckedItems] = useState(Array(props.props.length).fill(false));
  const handleChange = (event) => {
    const target = event.target;
    const value = target.checked;
    const index = parseInt(target.name.replace("checkbox", ""), 10) - 1;
    setCheckedItems([...checkedItems.slice(0, index), value, ...checkedItems.slice(index + 1)]); 
  };

  useEffect(() => {
    const res = []
    console.log(checkedItems)
    
    checkedItems.map((item, index) =>{
      if(item == true){
        res.push(index)
      }
    })
    props.changefunc({value : res, id : props.id})
  }, [checkedItems])
  
  return (
        props.props.map((item, index) => (
        <div key={index}>
          <label>
        <StyledCheckbox
          name={`checkbox${item}`}
          checked={checkedItems[index]}
          onChange={handleChange}
        />
            {item}
          </label>
        </div>
      ))
  );
}

const StyledCheckbox = styled.input.attrs({ type: 'checkbox' })`
  border-radius: 3px;
  border: 1px solid #ccc;
  background-color: #fff;
  width: 16px;
  height: 16px;
  margin-right: 8px;
  cursor: pointer;

  &:checked {
    background-color: transparent;
  }
`;


const Survey = (props) =>{
    const [values, setValues] = useState(Array(props.list.length).fill([]));
    const changeInputList = ({value, id}) =>{
        let val = [...values];
        val[id] = value
        setValues(val)
    }

    const onPost = () => {
      console.log(values)
    }
    return (<>
    <SurveyBackground>
        {props.list.map((item, index) => {
  switch(item.type) {
    case 'CheckBox':
      return (
        <SurveyTypeCheckBox key={index}>
          <h1 className="name">{index+1}. {item.content}</h1>
          <Checkbox id = {index} props = {item.value} changefunc = {changeInputList}></Checkbox>
        </SurveyTypeCheckBox>
      );
    case 'Descriptive':
      return (
        <SurveyTypeDescriptive key={index}>
          <h1 className="name">{index+1}. {item.content}</h1>
          
          <InputWrapper>
            <div className="form" onSubmit={(e) => {e.preventDefault();}}>
              <section className="center">
                <div className="inputLayout">
                  <textarea
                    value={values[index]}
                    onChange={(e) => changeInputList({value : e.target.value, id : index})}
                  />
                </div>
              </section>
            </div>
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
<Button onClick={onPost}>등록하기</Button>
    </SurveyBackground>
    </>)
}

export default Survey;

const SubmiterButton = styled.button`
  width: 8rem;
  height: 3rem;
  background-color: transparent;
  border-radius: 2.4rem;
  border: 0.1rem solid #5d5a88;
`;
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
height: 100%;
gap: 2rem;
    align-items: flex-start;
    flex-direction: column;
    display: flex;
    background-color: #F6F6F6;
    padding: 1rem;
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

