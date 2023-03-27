import { useMutation, useQuery } from "react-query";
import styled from "styled-components";
import { deletePageMembers, getDetailPage } from "../utils/api/api";
import "react-loading-skeleton/dist/skeleton.css";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { FullDateCheck } from "../element/DateCheck";
import PartyInfo from "../components/party/PartyInfo";
import { getCookie } from "../utils/infos/cookie";
import { toast } from "react-toastify";
import { flexCenter } from "../utils/style/mixins";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import alram from "../assets/ic32/alarm.svg";
import Board from "../components/party/Board";
import RadioButtons from "../components/party/RadioButtons";
import Carousel from "../components/party/Carousel";

const Party = () => {
  const navi = useNavigate();
  const pam = useParams();
  const [selected, setSelected] = useState(0);
  const [categoryValue, setCategoryValue] = useState("all");
  const options = ["전체", "공지", "투표", "과제", "게시글"];
  const [carouselList, setCarouselList] = useState([]);
  const [groupList, setGroupList] = useState([]);
  const [pageNum, setPageNum] = useState(1);
  const [groupName, setGroupName] = useState();
  const [groupInfo, setGroupInfo] = useState();
  const [groupCode, setGroupCode] = useState();
  const [groupId, setGroupId] = useState(pam.id);
  const [isAdmin, setIsAdmin] = useState(false);

  const partyRes = useQuery(
    ["party", { id: pam.id, page: pageNum, size: 99, category: categoryValue }],
    () =>
      getDetailPage({
        id: pam.id,
        page: pageNum,
        size: 99,
        category: categoryValue,
      }),
    {
      onSuccess: ({ data }) => {
        console.log(data);
        setGroupList(data.data.basicBoards.content);
        setGroupName(data.data.groupName);
        setGroupInfo(data.data.groupInfo);
        setGroupCode(data.data.groupCode);
        setGroupId(pam.id);
        setIsAdmin(data.data.admin);
        setCarouselList(data.data.deadlines);
      },
    }
  );

  useEffect(() => {
    const isUserCookie = getCookie("token");
    if (isUserCookie === undefined) {
      navi("/");
      toast.error("로그인 정보가 만료되었습니다.");
    }
  }, []);

  const deletePartyMember = useMutation(deletePageMembers, {
    onSuccess: (data) => {
      console.log("해당 멤버가 퇴출되었습니다.");
      window.alert("해당 멤버가 퇴출되었습니다");
      navi("/");
    },
  });

  const doDelete = (data) => {
    const res = deletePartyMember.mutateAsync(data);
  };

  const settings = {
    dots: false, // 개수 표시 점
    infinite: false, // 무한 캐러셀
    speed: 100, // 다음 컨텐츠 까지의 속도
    slidesToShow: 4, // 화면에 보이는 컨텐츠 수
    slidesToScroll: 1, // 스크롤 시 넘어가는 컨텐츠 수
    centerMode: false, // 현재 컨텐츠 가운데 정렬
    centerPadding: "10px", // 중앙 컨텐츠 padding 값
    autoplay: false, // 자동 캐러셀
    autoplaySpeed: 2000, // 자동 캐러셀 속도
    draggable: true, // 드래그
    fade: false, // 사라졌다 나타나는 효과
    arrows: true, // 좌,우 버튼
    vertical: false, // 세로 캐러셀
    initialSlide: 0, // 첫 컨텐츠 번호
    pauseOnFocus: true, // focus시 정지
    pauseOnHover: true, // hover시 정지
  };
  if (partyRes.isLoading || partyRes.isError) {
    return (
      <>
        <PageContainer>
          <LeftContainer>
            <PartyInfo
              groupName={groupName}
              groupInfo={groupInfo}
              groupCode={groupCode}
              groupId={pam.id}
              isAdmin={isAdmin}
            />
          </LeftContainer>
          <RightTotalContainer>
            <CarouselContainer>
              <img src={alram} alt="alram" />
              <h1 className="title">오늘 마감</h1>
            </CarouselContainer>
          </RightTotalContainer>
        </PageContainer>
      </>
    );
  }

  return (
    <>
      <PageContainer>
        <LeftContainer>
          <PartyInfo
            groupName={partyRes.data.data.data.groupName}
            groupInfo={partyRes.data.data.data.groupInfo}
            groupCode={partyRes.data.data.data.groupCode}
            groupId={pam.id}
            isAdmin={partyRes.data.data.data.admin}
          />
        </LeftContainer>
        <RightTotalContainer>
          <CarouselContainer>
            <CarouselTitle>
              <h1 className="title">오늘 마감</h1>
            </CarouselTitle>
            <Slider {...settings}>
              {carouselList?.map((item) => {
                return (
                  <Carousel
                    key={item.id}
                    groupId={pam.id}
                    id={item.id}
                    expirationDate={item.expirationDate}
                    nickName={item.nickname}
                    title={item.title}
                  />
                );
              })}
            </Slider>
          </CarouselContainer>
          <RadioBox>
            <RadioButtons
              options={options}
              categoryValue={setCategoryValue}
              partyRes={partyRes}
              selected={selected}
              setSelected={setSelected}
            />
          </RadioBox>
          <RightContainer>
            {groupList?.map((item) => {
              return (
                <Board
                  key={item.id}
                  groupId={pam.id}
                  createdAt={item.createdAt}
                  content={item.content}
                  nickName={item.nickname}
                  subtitle={item.subtitle}
                  title={item.title}
                  id={item.id}
                  dtype={item.dtype}
                  important={item.important}
                  hashtagList={item.hashtagList}
                  expirationDate={item.expirationDate}
                  groupName={partyRes.data.data.data.groupName}
                  groupInfo={partyRes.data.data.data.groupInfo}
                  groupCode={partyRes.data.data.data.groupCode}
                  isAdmin={partyRes.data.data.data.admin}
                />
              );
            })}
          </RightContainer>
        </RightTotalContainer>
      </PageContainer>
    </>
  );
};

const RadioBox = styled.div``;

const CarouselContainer = styled.div`
  width: 60vw;
  height: 30.2rem;
  overflow-x: hidden;
  margin-bottom: 5.6rem;
  gap: 3rem;
  padding: 3.2rem;
  display: flex;
  flex-direction: column;
  background-color: ${(props) => props.theme.color.zeroThree};
  border-radius: 3.2rem;

  .title {
    font-weight: 500;
    font-size: 2.2rem;
    color: #ffffff;
  }
`;

const CarouselTitle = styled.div`
  .title {
    font-weight: 500;
    font-size: 2.2rem;
    color: #ffffff;
  }
`;

const PageContainer = styled.div`
  display: flex;
  position: relative;
  flex-direction: row;
  align-items: flex-start;
  width: 100vw;
  max-width: 128rem;
  margin: 0 auto;
  padding: 2rem 0 3rem 0;
`;

const LeftContainer = styled.div`
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 30rem;
  gap: 1rem;
  font-size: 1.45rem;
`;

const RightTotalContainer = styled.div`
  @media (max-width: 860px) {
    margin-left: -8rem;
  }
`;

const RightContainer = styled.div`
  margin: 3rem 0;
  display: grid;
  grid-template-columns: repeat(2, 1fr);

  @media (max-width: 800px) {
    grid-template-columns: repeat(1, 1fr);
  }
  gap: 1rem;
`;

export default Party;
