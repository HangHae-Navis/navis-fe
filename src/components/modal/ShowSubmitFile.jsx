import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { flexCenter } from "../../utils/style/mixins";
import { modalVariants } from "../../utils/variants/variants";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { postGroup, postGroupApply, PutGroup } from "../../utils/api/api";
import Input from "../../element/Input";
import Button from "../../element/Button";
import Test from "../../assets/d65d5952-d801-4225-ab16-8720733b499a.png";
import { useNavigate, useParams } from "react-router";
import { useRecoilState, useResetRecoilState } from "recoil";
import { partyInfoState, partyRegistModalState } from "../../store/atom";
import { InputStyle } from "../../utils/style/mixins";
import { ShortCheck } from "../../element/DateCheck";

const ShowSubmitFile = (props) =>{

    const [fileContainer, setFileContainer] = useState([])
    console.log(props.courrentModalContent)
  const ModalClose = (event) => {
    if (event.target === event.currentTarget) {
        props.setShowModal(false)
    }
  };
    useEffect(() => {
        for(let i = 0; i < props.courrentModalContent.fileList.length; i++){
            const a = {file: props.courrentModalContent.fileList[i], name : props.courrentModalContent.fileName[i] }
            console.log(a)
            setFileContainer(fileContainer => [...fileContainer, a])
        }
    }, [])
    return(<RegistModalBackGround onClick={ModalClose}>

        <SubmitFileModalWrapper>
            <SubmitFileContainer>
                <SubmitTitle>
                <h1 className="buttontitle">{props.courrentModalContent.nickname}</h1>
                <h1 className="infocontent">{ShortCheck(props.courrentModalContent.createdAt)} 제출함{props.courrentModalContent.late == true ? <span> (지각)</span> :null} </h1>
                
                </SubmitTitle>
                <h1 className="buttontitleoff">제출 파일 목록</h1>
                {fileContainer.map((item) => (<a key = {item.file} href={`${item.file}?download=true`} className="filetext">&middot; {item.name}</a>))}
            </SubmitFileContainer>

        </SubmitFileModalWrapper>
    
    
    </RegistModalBackGround>)
}

export default ShowSubmitFile
const RegistModalBackGround = styled.div`
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

.infocontent{
  font-weight: 400;
  font-size: 1.8rem;
  color: #9795B5
}
`;
const SubmitTitle = styled.div`
display: flex;
align-items: center;
flex-direction: row;
justify-content: space-between;
text-align: center;
gap: 2rem;
`

const SubmitFileContainer = styled.div`
min-width: 80%;
min-height: 80%;
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  justify-content: center;
  gap: 2rem;
`;

const SubmitFileModalWrapper = styled(motion.section)`
  min-width: 60rem;
  min-height: 30rem;
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 4rem;
  border-radius: 2.5rem;     
  background-color: #F2F1FA; 
  gap: 10rem;
`;
