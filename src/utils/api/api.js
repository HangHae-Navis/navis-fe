import { setCookie } from "../infos/cookie";
import { setLocalStorage } from "../infos/localStorage";
import Axios from "./axios";

const axios = new Axios(process.env.REACT_APP_BASEURL);

//아래서부터 작성

/*-----------------------로그인 기능------------------------------*/
export const postEmailConfirm = async (data) => {
  const res = await axios.get(`/api/emails/sendmail?email=${data}`);
  return res;
};

export const getEmailVerify = async (data) => {
  const res = await axios.get(`/api/emails/confirm?key=${data}`);
  return res;
};

export const postSignUp = async (data) => {
  const res = await axios.post("/api/user/signup", data);
  return res;
};

export const postSignIn = async (data) => {
  const res = await axios.post("/api/user/login", data);
  setLocalStorage("userInfo", res?.data?.data.nickname);
  setCookie("token", res?.data?.data.token);
  return res;
};

export const getKaKaoLogin = async (payload) => {
  if (payload !== null) {
    const res = await axios.get(`/api/user/kakao/callback${payload}`);
    return res;
  }
};
/*-----------------------로그인 기능------------------------------*/

export const postGroupParticipation = async (data) => {
  const res = await axios.post("/api/groups/apply", data);
  return res;
};

/*-----------------------그룹 페이지 기능------------------------------*/
export const getPartyPage = async (payload) => {
  const res = axios.get(
    `/api/groups?page=${payload.page}&size=${payload.size}&category=${payload.category}`
  );
  return res;
};

export const getDetailPage = async (payload) => {
  const res = await axios.get(
    `api/groups/${payload.id}?page=${payload.page}&size=${payload.size}&category=${payload.category}`
  );
  return res;
};

export const getPartyBoard = async (payload) => {
  const res = await axios.get(`api/${payload}/boards/`);
  return res;
};

export const postGroup = async (payload) => {
  const res = axios.post("api/groups", payload);
  return res;
};

export const postGroupApply = async (groupCode) => {
  const res = axios.post(`api/groups/apply`, groupCode);
  return res;
};

export const getBoards = async (groupId) => {
  const res = axios.post(`api/${groupId}/boards/posts`);
  return res;
};

export const postBoard = async (id, data) => {
  const res = axios.post(`api/${id}/boards`, data, {
    "Content-Type": "multipart/form-data",
  });
  return res;
};

export const postHomework = async (id, data) => {
  const res = axios.post(`api/${id}/homeworks`, data);
  return res;
};

export const postNotice = async (id, data) => {
  const res = axios.post(`/api/${id}/notices`, data, {
    "Content-Type": "multipart/form-data",
  });
  return res;
};

export const postVote = async (id, data) => {
  const res = axios.post(`/api/${id}/votes`, data, {
    "Content-Type": "multipart/form-data",
  });
  return res;
};

/*-----------------------어드민 페이지 기능------------------------------*/

export const getDetailPageForAdmin = async (payload) => {
  const res = await axios.get(`api/groups/${payload.id}/admin`);
  return res;
};

export const deletePageMembers = async (payload) => {
  if (payload.memberid) {
    const res = await axios.delete(
      `api/groups/${payload.pam}?memberId=${payload.memberid}`
    );
    return res;
  } else {
    const res = await axios.delete(`api/groups/${payload.pam}`);
    return res;
  }
};

export const undoDeletePagemembers = async (payload) => {
  const res = await axios.delete(
    `api/groups/${payload.pam}/admin/unban?bannedMemberId=${payload.bannedMemberId}`
  );
  return res;
};

export const PutGroup = async (payload) => {
  const res = axios.put(`api/groups/${payload.ID}/admin`, payload.form);
  return res;
};

export const PutMemberRole = async (payload) => {
  const res = axios.put(
    `api/groups/${payload.pam}/admin/updaterole?memberId=${payload.memberId}`
  );
  return res;
};

export const deletePage = async (payload) => {
  const res = await axios.delete(`api/groups/${payload}/admin`);
  return res;
};

/*-----------------------어드민 페이지 기능------------------------------*/

/*-----------------------상세 페이지 기능------------------------------*/

export const postSurveyData = async (data) => {
  const payload = data.data;
  const res = await axios.post(
    `api/${data.groupId}/surveys/${data.detailId}/fillForm`,
    payload
  );
  return res;
};


export const getSurveyForAdmin = async (payload) => {
  const res = await axios.get(`api/${payload.groupId}/surveys/${payload.detailId}/surveyStatDetails/${payload.id}`);
  return res;
};

export const putSurveyData = async (data) => {
  const payload = data.data;
  const res = await axios.put(
    `api/${data.groupId}/surveys/${data.detailId}/updateForm`,
    payload
  );
  return res;
};

export const putHomeWorkData = async (data) => {

  const res = await axios.put(
    `api/${data.groupId}/homeworks/${data.detailId}/updateSubjects`,
    data.data,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return res;
};

export const postFeedback = async (data) => {
  //목록의 섭젝트 아이디 있음
  const payload = { feedback: data.data, submitCheck: data.check };
  const res = await axios.post(
    `api/${data.groupId}/homeworks/${data.detailId}/${data.subjectId}/feedbacks`,
    payload
  );
  return res;
};

export const postHomeWorkData = async (data) => {
  const payload = { multipartFiles: data.data };

  const res = await axios.post(
    `api/${data.groupId}/homeworks/${data.detailId}/homeworkSubmit`,
    data.data,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return res;
};

export const deleteHomeWorkData = async (data) => {
  const res = await axios.delete(
    `api/${data.groupId}/homeworks/${data.detailId}/cancel`
  );

  return res;
};

export const postComment = async (data) => {
  const payload = { content: data.comment };
  const res = await axios.post(
    `api/${data.groupId}/${data.detailId}/comments`,
    payload
  );
  return res;
};

export const getBoardDetailPage = async (payload) => {
  const res = await axios.get(
    `api/${payload.groupId}/${payload.dtype}s/${payload.detailId}`
  );
  return res;
};

export const deleteBoardDetailPage = async (payload) => {
  const res = await axios.delete(
    `api/${payload.groupId}/${payload.dtype}s/${payload.detailId}`
  );
  return res;
};

export const getCommentPage = async (payload) => {
  const res = await axios.get(
    `api/${payload.groupId}/${payload.boardId}/comments?page=${payload.page}&size=${payload.size}`
  );
  return res;
};

export const deleteCommentPage = async (payload) => {
  const res = await axios.delete(
    `api/${payload.groupId}/${payload.detailId}/comments/${payload.commentId}`
  );
  return res;
};

export const PostVoteDetail = async (payload) => {
  const data = { voteOption: payload.voteOption };
  const res = await axios.post(
    `api/${payload.groupId}/votes/${payload.voteId}/pick`,
    data
  );
  return res;
};

export const DeleteVoteDetail = async (payload) => {
  const res = await axios.delete(
    `api/${payload.groupId}/votes/${payload.voteId}/unpick`
  );
  return res;
};

export const putCommentPage = async (payload) => {
  const res = await axios.put(
    `api/${payload.groupId}/${payload.detailId}/comments/${payload.commentId}`,
    payload.value
  );
  return res;
};

/*-----------------------마이 페이지 기능------------------------------*/

export const GetProfile = async () => {
  const res = await axios.get("/api/user");
  return res;
};

export const PutProfile = async (payload) => {
  const res = await axios.put("api/user/profile", payload);
  return res;
};
/*-----------------------마이 페이지 기능------------------------------*/

export const getChat = async () => {
  const res = await axios.get("api/chats/lists");
  return res;
};

export const postChat = async ({ to }) => {
  const res = await axios.post(`api/chats/room`, {
    to: to,
  });
  return res;
};

export const postChatPrevious = async (dto) => {
  const res = await axios.get(
    `api/chats/room/${dto.roomId}?to=${dto.to}&page=${dto.page}&size=${dto.size}`
  );
  return res;
};

export const getNotification = async () => {
  const res = await axios.get("/api/subscribe");
  return res;
};

export const deleteNotification = async () => {
  const res = await axios.delete("/api/subscribe/all");
  return res;
};

export const postSurvey = async (id, requestDto) => {
  const res = await axios.post(`/api/${id}/surveys`, requestDto);
  return res;
};
