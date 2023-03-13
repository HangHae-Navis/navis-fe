import { atom } from "recoil";
import { v4 } from "uuid";

export const loginModalState = atom({
  key: `state${v4()}`,
  default: false,
});
