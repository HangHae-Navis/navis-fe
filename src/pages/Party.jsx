import { useQuery, useQueryClient } from "react-query";
import styled from "styled-components";
import { getDetailPage } from "../utils/api/api";
import "react-loading-skeleton/dist/skeleton.css";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import PartyInfo from "../components/party/PartyInfo";
import { getCookie } from "../utils/infos/cookie";
import { toast } from "react-toastify";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Board from "../components/party/Board";
import RadioButtons from "../components/party/RadioButtons";
import Carousel from "../components/party/Carousel";
import { settings } from "../constants/carousel";
import Chat from "../components/global/Chat";
import FloatingMenu from "../components/party/FloatingMenu";
import EditReady from "../components/edit/EditReady";
import { editReadyState } from "../store/atom";
import { useRecoilState } from "recoil";
import { EmptyText } from "../components/party/EmptyText";
import { useRef } from "react";
import { PartyPageContainer, PartyLeftContainer, CarouselContainer, CarouselTitle, PartyRadioBox, PartyRightContainer } from "../utils/style/pageLayout";

const Party = () => {
  const queryClient = useQueryClient();
  const navi = useNavigate();
  const pam = useParams();
  const [selected, setSelected] = useState(0);
  const [selectedSecond, setSelectedSecond] = useState(0);
  const [categoryValue, setCategoryValue] = useState("all");
  const [categoryValueSecond, setCategoryValueSecond] = useState("id");
  const options = ["전체", "공지", "투표", "과제", "게시글", "설문"];
  const optionsSecond = ["최신순", "중요도순"];
  const [groupList, setGroupList] = useState([]);
  const [groupName, setGroupName] = useState();
  const [groupInfo, setGroupInfo] = useState();
  const [groupCode, setGroupCode] = useState();
  const [groupId, setGroupId] = useState(pam.id);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isOpen, setIsOpen] = useRecoilState(editReadyState);

  const partyRes = useQuery(
    ["party", { id: pam.id, page: 1, size: 999, category: categoryValue }],
    () =>
      getDetailPage({
        id: pam.id,
        page: 1,
        size: 999,
        category: categoryValue,
      }),
    {
      onSuccess: ({ data }) => {
        console.log(data.data)
        //파티디테일의 dtype에 따라 렌더링 실패 이슈를 방지하기 위해, 모든 파티디테일 쿼리를 삭제한다.
        queryClient.removeQueries("partyDetail", { inactive: true });
      },
    }
  );

  useEffect(() => {
    console.log(partyRes?.data?.data?.data?.basicBoards?.content)
    console.log(partyRes?.data?.data?.data)
    let sortedGroupList = partyRes?.data?.data?.data?.basicBoards?.content;
    if (categoryValueSecond !== "createdAt") {
      partyRes?.data?.data?.data?.basicBoards?.content.sort((a, b) => {
        if (categoryValueSecond === "id") {
          return b.id - a.id;
        } else if (categoryValueSecond === "important") {
          return b.important - a.important;
        }
      });
    }

    setGroupList(partyRes?.data?.data?.data?.basicBoards?.content);
  }, [categoryValueSecond]);

  useEffect(() => {
    setIsOpen(false);
    const isUserCookie = getCookie("token");
    if (isUserCookie === undefined) {
      navi("/");
      toast.error("로그인 정보가 만료되었습니다.", {
        toastId: "loginError",
      });
    }
  }, []);

  if (partyRes.isLoading || partyRes.isError) {
    return (
      <>
        <PartyPageContainer>
          <PartyLeftContainer>
            <PartyInfo
            />
          </PartyLeftContainer>
          <div>
            <CarouselContainer>
              <CarouselTitle>
                <svg
                  width="22"
                  height="26"
                  viewBox="0 0 22 26"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M11 10.3333V15.6667H13.6667M1 15C1 16.9778 1.58649 18.9112 2.6853 20.5557C3.78412 22.2002 5.3459 23.4819 7.17317 24.2388C9.00043 24.9957 11.0111 25.1937 12.9509 24.8079C14.8907 24.422 16.6725 23.4696 18.0711 22.0711C19.4696 20.6725 20.422 18.8907 20.8079 16.9509C21.1937 15.0111 20.9957 13.0004 20.2388 11.1732C19.4819 9.3459 18.2002 7.78412 16.5557 6.6853C14.9112 5.58649 12.9778 5 11 5C8.34784 5 5.8043 6.05357 3.92893 7.92893C2.05357 9.8043 1 12.3478 1 15V15ZM11 5V1V5ZM7 1H15H7Z"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <h1 className="title">24시간 내 마감</h1>
              </CarouselTitle>
            </CarouselContainer>
          </div>
        </PartyPageContainer>
      </>
    );
  }

  return (
    <>
      <PartyPageContainer>
        <PartyLeftContainer>
          <PartyInfo
            groupName={partyRes.data.data.data.groupName}
            groupInfo={partyRes.data.data.data.groupInfo}
            groupCode={partyRes.data.data.data.groupCode}
            groupId={pam.id}
            isAdmin={partyRes.data.data.data.admin}
          />
          <FloatingMenu
            props={partyRes.data.data.data.recentlyViewed}
            groupId={pam.id}
            groupName={groupName}
            groupInfo={groupInfo}
            groupCode={groupCode}
          ></FloatingMenu>
        </PartyLeftContainer>
        <div>
          <CarouselContainer>
            <CarouselTitle>
              <svg
                width="22"
                height="26"
                viewBox="0 0 22 26"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11 10.3333V15.6667H13.6667M1 15C1 16.9778 1.58649 18.9112 2.6853 20.5557C3.78412 22.2002 5.3459 23.4819 7.17317 24.2388C9.00043 24.9957 11.0111 25.1937 12.9509 24.8079C14.8907 24.422 16.6725 23.4696 18.0711 22.0711C19.4696 20.6725 20.422 18.8907 20.8079 16.9509C21.1937 15.0111 20.9957 13.0004 20.2388 11.1732C19.4819 9.3459 18.2002 7.78412 16.5557 6.6853C14.9112 5.58649 12.9778 5 11 5C8.34784 5 5.8043 6.05357 3.92893 7.92893C2.05357 9.8043 1 12.3478 1 15V15ZM11 5V1V5ZM7 1H15H7Z"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <h1 className="title">24시간 내 마감</h1>
            </CarouselTitle>
            {partyRes?.data.data.data.deadlines.length != 0 ? (
              <Slider {...settings}>
                {partyRes?.data.data.data.deadlines.map((item) => {
                  return (
                    <Carousel
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
              </Slider>
            ) : (
              <EmptyText/>
            )}
          </CarouselContainer>
          <PartyRadioBox>
            <RadioButtons
              options={options}
              categoryValue={setCategoryValue}
              partyRes={partyRes}
              selected={selected}
              setSelected={setSelected}
              type={"first"}
            />
            <PartyRadioBox>
              <RadioButtons
                options={optionsSecond}
                categoryValue={setCategoryValueSecond}
                partyRes={partyRes}
                selected={selectedSecond}
                setSelected={setSelectedSecond}
                type={"second"}
              />
              {/* <h1 className="check">만료 제외</h1> */}
            </PartyRadioBox>
          </PartyRadioBox>
          <PartyRightContainer>
            {groupList?.length != 0 ? (
              groupList?.map((item) => {
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
              })
            ) : (
              <EmptyText type={"board"} />
            )}
          </PartyRightContainer>
        </div>
        <Chat />
        {isOpen === true && (
          <EditReady role={partyRes?.data?.data?.data?.groupRole} />
        )}
      </PartyPageContainer>
    </>
  );
};

export default Party;
