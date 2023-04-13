import { atom } from "recoil";
import { v4 } from "uuid";

export const loginModalState = atom({
  key: `state${v4()}`,
  default: false,
});

export const signinModalState = atom({
  key: `state${v4()}`,
  default: true,
});

export const partyRegistModalState = atom({
  key: `state${v4()}`,
  default: false,
});

export const partyInfoState = atom({
  key: `state${v4()}`,
  default: {
    title: "",
    ID: "",
  },
});

export const userInfoState = atom({
  key: `state${v4()}`,
  default: "",
});

export const chatModalState = atom({
  key: `state${v4()}`,
  default: false,
});

export const chatInfoState = atom({
  key: `state${v4()}`,
  default: null,
});

export const editReadyState = atom({
  key: `state${v4()}`,
  default: false,
});

export const editorState = atom({
  key: `state${v4()}`,
  default: {
    title: "",
    subtitle: "",
    content: "",
    category: "board",
    important: 0,
    hashtagList: "",
    expirationDate: "",
    optionList: "",
  },
});

// requestDto.append("title", markdownInfo.title);
// requestDto.append("subtitle", data.subtitle);
// requestDto.append("content", markdownValue);
// requestDto.append("important", data.important);
// requestDto.append("hashtagList", data.tags);

// if (data.writing === "게시글") {
//   const res = await boardMutation.mutateAsync(requestDto);
// } else if (data.writing === "공지사항") {
//   const res = await noticeMutation.mutateAsync(requestDto);
// } else if (data.writing === "과제") {
//   requestDto.append(
//     "expirationDate",
//     new Date(data.datetime).getTime() / 1000
//   );
//   const res = await homeWorkMutation.mutateAsync(requestDto);
// } else if (data.writing === "투표") {
//   requestDto.append("optionList", data.votes);
//   requestDto.append(
//     "expirationDate",
//     new Date(data.datetime).getTime() / 1000
//   );
