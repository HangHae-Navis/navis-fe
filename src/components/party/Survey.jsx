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
import { useMutation } from "react-query";
import { postSurveyData, putSurveyData } from "../../utils/api/api";
import axios from "axios";
import { FullDateCheck } from "../../element/DateCheck";

const Checkbox = (props) => {
  const [checkedItems, setCheckedItems] = useState(Array(props.props.length).fill(false));
  const handleChange = (event) => {
    const target = event.target;
    const value = target.checked;
    const index = parseInt(target.name.replace("checkbox", ""), 10);
    setCheckedItems([...checkedItems.slice(0, index), value, ...checkedItems.slice(index + 1)]); 
  };
  useEffect(() => {
    const res = []
    console.log(checkedItems)
    
    checkedItems.map((item, index) =>{
      if(item === true){
        console.log(props.props[index])
        res.push(props.props[index])
      }
    })
    props.changefunc({value : res, id : props.id, isList : true})
  }, [checkedItems])
  
  return (
        props.props.map((item, index) => (
        <div key={index}>
          <label>
        <StyledCheckbox
          name={`checkbox${index}`}
          checked={checkedItems[index]}
          onChange={handleChange}
        />
            <span className="smallname">{item}</span>
          </label>
        </div>
      ))
  );
}
const RadioButton = (props) =>{

  //console.log(props)
  const [selectedOption, setSelectedOption] = useState("");

  const handleOptionChange = (event) => {
    setSelectedOption(props.props[event.target.value -1]);
    console.log(props.props[event.target.value -1])
  };

  useEffect(() => {
    const res = []
    res.push(selectedOption)
    props.changefunc({value : res, id : props.id, isList : true})
  }, [selectedOption])
  
  return(<>
  {props.props.map((item, index) =>(<label key = {index}>
        <input
          type="radio"
          name= {item + index}
          value= {index + 1}
          checked={selectedOption == props.props[index]}
          onChange={handleOptionChange}
        />
        {item}
      </label>))}
  </>)
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
  }
`;
//props.res?.data?.data?.data?.questionResponseDto?.
const Survey = (props) =>{
  console.log(props)
  console.log(props.res)
  console.log(props.res0)
  console.log(props.list)
  const [values, setValues] = useState(props?.res?.data?.data?.data?.questionResponseDto?.map((item) => ({ questionId: item.id, answerList: [''] })));
  const [isSubmit, setIsSubmit] = useState(props?.res?.data?.data?.data?.submit);
  console.log(props.res)
  console.log(props.submit)
  console.log(props.res?.data?.data?.data?.submit)
  console.log(isSubmit)
//console.log(values)
/*
useEffect(() => {
    setValues(props?.list?.map((item) => ({ questionId: item.id, answerList: [''] })));
}, []);
*/
useEffect(() => {
 props.res.refetch()
}, [])

useEffect(() => {
  setIsSubmit(props.res?.data?.data?.data?.submit)
}, [props.res?.data?.data?.data?.submit])

  const postsurvey = useMutation(postSurveyData, {
    onSuccess: ({ data }) => {
      toast.success("설문이 작성되었습니다.");
    },
  });

  const putsurvey = useMutation(putSurveyData,  {
    onSuccess: ({ data }) => {
      toast.success("설문이 수정되었습니다.");
      setIsSubmit(true)
    },
  });
    const changeInputList = ({value, id, survId, isList}) =>{
      console.log(value)
        let val = [...values];
        //이 에러 또
        isList == true ?val[id].answerList = value :val[id].answerList = [value]
        setValues(val)
        console.log(values)
    }

    console.log(values)
    //console.log(props)

    const onPost = () => {
      //여기서 
      let a = values.length; 
      let b = 0;
      const payload = {
        groupId : props.groupId,
        detailId : props.detailId,
        data : { answerRequestDto: values}
      }
      
        console.log(payload)
        if(props.submit == true){
          const res = putsurvey.mutateAsync(payload)
        }
        else{
          const res = postsurvey.mutateAsync(payload)
        }
      //console.log(values)
    }

    return (
    <SurveyBackground>
      {/* */}
      
      <TitleBox>
      <h1 className="name">총 {props?.list?.length}개 항목이 있습니다.</h1>
      {/*<h1 className="smalltitle">만료일자 : {FullDateCheck(props?.res?.data?.data?.data?.expirationDate)} </h1> */}
       
      
      </TitleBox>
      {isSubmit == false
      ?<>
      {props?.list?.map((item, index) => {
switch(item.type) {
  case 'CHECKBOX':
    return (
      <SurveyTypeCheckBox key={index}>
        <h1 className="name">{index+1}. {item.question}</h1>
        <Checkbox id = {index} props = {item.optionList} changefunc = {changeInputList} survId ={item.id}></Checkbox>
      </SurveyTypeCheckBox>
    );
  case 'DESCRIPTIVE':
    return (
      <SurveyTypeDescriptive key={index}>
        <h1 className="name">{index+1}. {item.question}</h1>
        
        <InputWrapper>
          <div className="form">
            <section className="center">
              <div className="inputLayout">
                <textarea
                  value={values[index]?.answerList}
                  onChange={(e) => changeInputList({value : e.target.value, id : index, isList: false})}
                />
              </div>
            </section>
          </div>
        </InputWrapper>
      </SurveyTypeDescriptive>
    );
  case "OBJECTIVE":
    return (
      <SurveyTypeObjective key={index}>
        <h1 className="name">{index+1}. {item.question}</h1>
        <RadioButton  id = {index} props = {item.optionList} survId ={item.id} changefunc = {changeInputList}/>
      </SurveyTypeObjective>
    );
  default:
    return null;
}
})}
<Button onClick={onPost}>등록하기</Button>
      </>
    :<>
    <h1 className="name">설문에 응해주셔서 감사합니다.</h1>
<Button onClick={() => setIsSubmit(false)}>다시하기</Button>
    </>
    }
    {/* */} {/* */}
    </SurveyBackground>
    )
}

export default Survey;

const TitleBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`

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
    padding: 2rem;
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
  .smalltitle {
    font-weight: 300;
    font-size: 1.3rem;
    color: #222222;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .smallname {
    font-weight: 400;
    font-size: 1.8rem;
    color: #222222;
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

