import { async } from "q";
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
  console.log(data);
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
  console.log("호출");
  console.log(payload);
  const res = await axios.get(`api/groups/${payload}/admin`);
  return res;
};

export const deletePageMembers = async (payload) => {
  if (payload.memberid) {
    const res = await axios.delete(
      `api/groups/${payload.pam}?memberId=${payload.memberid}`
    );
    return res;
  } else {
    const res = await axios.delete(`api/groups/${payload}`);
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

export const postHomeWorkData = async (data) =>{
  console.log(data)
  const payload = { multipartFiles: data.data}
  console.log(payload)
  for (let value of payload.multipartFiles.values()) {
    console.log(value);
  }

  const res = await axios.post(`api/${data.groupId}/homeworks/${data.detailId}/homeworkSubmit`, payload)
  return res;
}

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

export const getCommentPage = async (payload) => {
  const res = await axios.get(
    `api/${payload.groupId}/${payload.boardId}/comments?page=${payload.page}&size=${payload.size}`
  );
  return res;
};

export const deleteCommentPage = async (payload) => {
  console.log(payload);
  const res = await axios.delete(
    `api/${payload.groupId}/${payload.detailId}/comments/${payload.commentId}`
  );
  return res;
};

export const PostVoteDetail = async (payload) =>{
  console.log(payload)
  const data = { voteOption : payload.voteOption}
  console.log(data)
  const res = await axios.post(`api/${payload.groupId}/votes/${payload.voteId}/pick`, data)
  return res
}

export const DeleteVoteDetail = async (payload) =>{
  console.log(payload)
  const res = await axios.delete(`api/${payload.groupId}/votes/${payload.voteId}/unpick`)
  return res
}

export const putCommentPage = async (payload) => {
  console.log(payload);
  const res = await axios.put(`api/${payload.groupId}/${payload.detailId}/comments/${payload.commentId}`,payload.value
  );
  return res;
};

/*-----------------------마이 페이지 기능------------------------------*/

export const GetProfile = async () =>{
  const res = await axios.get(
    '/api/user'
  )
  return res
}

export const PutProfile = async (payload) =>{
  const res = await axios.put('api/user/profile', payload)
    return res;
}
/*-----------------------마이 페이지 기능------------------------------*/
