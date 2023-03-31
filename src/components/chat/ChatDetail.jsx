import React, { useEffect } from "react";
import { useRecoilValue, useResetRecoilState } from "recoil";
import { chatInfoState } from "../../store/atom";

const ChatDetail = () => {
  const chatDetailInfo = useRecoilValue(chatInfoState);
  const chatDetailInfoReset = useResetRecoilState(chatInfoState);
  useEffect(() => {
    return () => {
      chatDetailInfoReset();
    };
  }, []);
  return <></>;
};

export default ChatDetail;
