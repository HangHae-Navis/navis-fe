import { atom } from "recoil";
import { v4 } from "uuid";

export const loginModalState = atom({
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

export const markdownState = atom({
  key: `state${v4()}`,
  default: "",
});

export const markdownInfoState = atom({
  key: `state${v4()}`,
  default: {
    title: "",
  },
});

export const chatModalState = atom({
  key: `state${v4()}`,
  default: false,
});

export const chatInfoState = atom({
  key: `state${v4()}`,
  default: null,
});
