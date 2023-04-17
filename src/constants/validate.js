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
};
