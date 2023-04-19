
import { toast } from "react-toastify";
import Button from "../../element/Button";
import { FullDateCheck, ShortCheck } from "../../element/DateCheck";
import { useForm } from "react-hook-form";
import styled from "styled-components";

export const HomeworkBox = (props) =>{

  const { register, formState: errors, handleSubmit } = useForm();

  console.log(props)

  const addInput = (data) => {
    if (props.homeWorkInputFile.length < 5) {
        const lastVal = props.homeWorkInputFile.length > 0 ? props.homeWorkInputFile[props.homeWorkInputFile.length - 1].id : 0;
        props.setHomeWorkInputFile((homeWorkInputFile) => [...homeWorkInputFile, { id: lastVal + 1, type: data },]);
      }
    else toast.success("최대 업로드 가능 갯수는 5개 입니다");
  };

  const FileHandler = (event) => {
    const file = event.target.files[0];
    props.homeWorkInputFileList.current.push(file)
  };
    return(
      props.res?.data?.data?.data?.role == "USER" && props.res?.data?.data?.data?.submitResponseDto == null) || props.submitAgain.current === true
          ? (<form onSubmit={(e) => {e.preventDefault(); handleSubmit(props.postOrPutHomeWork);}}>
            <DetailHomeWorkSubmitContainer>
              <DetailHomeWorkSubmitButtonBox>
                <Button onClick={() => addInput("file")}>파일 추가하기</Button>
                <Button onClick={handleSubmit(props.postOrPutHomeWork)} transparent={true} color="rgb(88, 85, 133)">과제 제출하기</Button>
              </DetailHomeWorkSubmitButtonBox>
              <DetailHomeWorkSubmitButtonBox>
                <DetailHomeworkContentContainer>
                  <h1 className="name">제출할 파일</h1>
                  {props.homeWorkInputFile.map((item) => (
                    <DetailInputContainer key={item.id}>
                      <StyledInput type="file" onChange={FileHandler} />
                      <section style={{ cursor: 'pointer' }} className="name" onClick={() => props.deleteInput(item.id)}>X</section>
                    </DetailInputContainer>
                  ))}
                </DetailHomeworkContentContainer>
              </DetailHomeWorkSubmitButtonBox>
            </DetailHomeWorkSubmitContainer>
          </form>)
          : props.res?.data?.data?.data?.role == "USER" && props.res?.data?.data?.data?.submitResponseDto != null
          ? (<>{/*과제 여부를 판단, 제출한 과제가 있을 경우 과제 관련 컴포넌트 랜더링*/}
            <DetailHomeWorkSubmitContainer>
              <DetailHomeWorkSubmitButtonBox>
                {props.res?.data?.data?.data?.submitResponseDto.submitCheck == false
                  ? (props.res?.data?.data?.data?.submitResponseDto.feedbackList
                    ?.length == 0 ? (
                    <Button transparent={true} color="rgb(88, 85, 133)" onClick={() => props.doDeleteHomework( {groupId: props.groupId, detailId: props.detailId} )}>제출 취소하기</Button>)
                    : (<Button transparent={true} onClick={() => props.submitAgain.current = true} color="rgb(88, 85, 133)">다시 제출하기</Button>))
                  : null}
              </DetailHomeWorkSubmitButtonBox>
              <DetailHomeWorkSubmitButtonBox>
                <DetailHomeworkContentContainer>
                  <DetailPostedHomeWorkFileBox>
                    <h1 className="name">제출한 파일</h1>
                    <h1 className="smallname">
                      {FullDateCheck(props.res?.data?.data?.data?.submitResponseDto.createdAt)}{" "}{props.res?.data?.data?.data?.submitResponseDto.late == true ? "제출(지각)" : "제출"}{" "}
                    </h1>
                  </DetailPostedHomeWorkFileBox>
                  {props.res?.data.data.data.submitResponseDto.fileList.map((item) => (
                    <a key={item.fileUrl} href={`${item.fileUrl}?download=true`} className="filename"> {" "} {item.fileName}</a>
                  ))}
                </DetailHomeworkContentContainer>
                {<DetailHomeworkContentContainer>
                    {props.res?.data?.data?.data?.submitResponseDto.feedbackList
                        ?.length != 0 ? (props.res?.data?.data?.data?.submitResponseDto.submitCheck == true
                            ? (<><h1 className="name">확정됨</h1>
                              {props.res?.data?.data?.data?.submitResponseDto.feedbackList.map(
                                (item, index) => (<h1 key={item} className="name">{index + 1}번째 피드백 : {item}</h1>)
                              )}</>)
                            : (<><h1 className="name">반려됨</h1>
                              {props.res?.data?.data?.data?.submitResponseDto.feedbackList.map(
                                (item, index) => (
                                  <h1 key={item} className="name">{index + 1}번째 사유 : {item}</h1>)
                              )}</>))
                        : (<h1 className="name">피드백 대기 중</h1>)}
                  </DetailHomeworkContentContainer>}
              </DetailHomeWorkSubmitButtonBox>
            </DetailHomeWorkSubmitContainer>
          </>)
          : (<><DetailPostedHomeWorkFileBox>
              <DetailHomeworkContentContainer width="80vw">
                <h1 className="name">제출완료</h1>
                {props.res?.data.data.data.submitMember.map((item) => (
                  <DetailSubmitterContainer key={item.id}>
                    <h1 className="smallname">{item.nickname}</h1>
                    <DetailSubmitterBox>
                      <h1 className="smallname">{ShortCheck(item.createdAt)} 제출</h1>
                      <SubmiterButton onClick={() => props.CheckUpModal(item)} className="buttontext">제출 과제</SubmiterButton>
                    </DetailSubmitterBox>
                  </DetailSubmitterContainer>))}
              </DetailHomeworkContentContainer>
              <DetailHomeworkContentContainer borderColor="#CF5C4C">
                <h1 className="name">미제출자</h1>
                {props.res?.data.data.data.notSubmitMember.map((item) => (
                  <DetailSubmitterContainer key={item.id}>
                    <h1 className="smallname">{item.nickname}</h1>
                  </DetailSubmitterContainer>))}
              </DetailHomeworkContentContainer>
            </DetailPostedHomeWorkFileBox></>)
}

const StyledInput = styled.input`
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

const SubmiterButton = styled.button`
width: 8rem;
height: 3rem;
background-color: transparent;
border-radius: 2.4rem;
border: 0.1rem solid #5d5a88;
`;

const DetailInputContainer = styled.div`
display: flex;
flex-direction: row;
align-items: center;
justify-content: space-between;
gap:1rem;
`;

const DetailSubmitterBox = styled.div`
display: flex;
flex-direction: row;
align-items: center;
justify-content: flex-end;
gap: 1rem;
`;

const DetailSubmitterContainer = styled.div`
width: 100%;
display: flex;
flex-direction: row;
align-items: center;
justify-content: space-between;
`;

const DetailPostedHomeWorkFileBox = styled.div`
display: flex;
flex-direction: row;
align-items: center;
text-align: center;
gap: 2rem;
`;
const DetailHomeworkContentContainer = styled.div`
width: ${({ width }) => width || "50vw"};
max-width: 100%;
height: 100%;
align-items: flex-start;
display: flex;
flex-direction: column;
border-radius: 4rem;
border: 0.2rem solid ${({ borderColor }) => borderColor || "#D4D2E3"};
text-overflow: ellipsis;
overflow: hidden;
white-space: normal;
padding: 5rem;
gap: 2rem;
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
  color: #5d5a88;
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
`;
const DetailHomeWorkSubmitContainer = styled.div`
display: flex;
flex-direction: column;
align-items: flex-start;
gap: 1.5rem;
`;

const DetailHomeWorkSubmitButtonBox = styled.div`
display: flex;
max-width: 100%;
flex-direction: row;
align-items: flex-start;
gap: 1.5rem;
`;