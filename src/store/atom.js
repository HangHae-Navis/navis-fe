import { atom } from "recoil";
// import { recoilPersist } from "recoil-persist";
import { v4 } from "uuid";

// const { persistAtom } = recoilPersist({
//   key: `userInfo`,
//   default: localStorage,
// });

export const loginModalState = atom({
  key: `state${v4()}`,
  default: false,
});

// export const userInfoState = atom({
//   key: "userInfo",
//   default: "",
//   effects_UNSTABLE: [persistAtom],
// });
