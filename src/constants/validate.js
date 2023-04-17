export const userNameRules = {
  required: "값을 입력해주세요.",
  pattern: {
    value: /^[a-zA-Z0-9+-_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    message: "이메일 형식으로 입력해주세요",
  },
};

export const passwordRules = {
  required: "값을 입력해주세요.",
  pattern: {
    value:
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,15}$/,
    message: "영문, 숫자, 특수기호를 포함하여 8~15자로 입력해주세요.",
  },
};

export const nicknameRules = {
  required: "값을 입력해주세요.",
  maxLength: {
    value: 10,
    message: "닉네임은 10글자 이하이어야 합니다.",
  },
};

export const groupNameRule = {
  required: "이름을 지정해주세요.",
  maxLength: {
    value: 20,
    message: "그룹이름은 20글자 이하이어야 합니다.",
  },
};

export const groupSubRule = {
  required: "설명을 작성해주세요.",
  maxLength: {
    value: 20,
    message: "설명은 10글자 이하이어야 합니다.",
  },
};
