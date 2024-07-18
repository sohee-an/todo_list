import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

export const getRegisterFormSchema = (expert: boolean) => {
  const schema = yup.object({
    mb_id: yup
      .string()
      .required("이메일을 입력해주세요")
      .email("올바른 이메일 형식이 아닙니다"),
    mb_password: yup
      .string()
      .required("비밀번호를 입력해주세요")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z\d!@#$%^&*]{8,}$/,
        "영문 대문자, 소문자, 숫자, 특수문자를 포함하여 8자 이상 입력해주세요"
      )
      .min(8, "최소 8자 이상 입력해주세요")
      .max(20, "최대 20자를 입력해주세요"),
    mb_repassword: yup
      .string()
      .oneOf([yup.ref("mb_password")], "비밀번호가 일치해야 합니다")
      .required("비밀번호를 다시 입력해주세요"),
    mb_nick: yup
      .string()
      .required("닉네임을 입력해주세요")
      .min(2, "최소 2자 이상 입력해주세요")
      .max(10, "최대 10자를 입력해주세요"),
    mb_belong: expert
      ? yup
          .string()
          .required("소속을 입력해주세요.")
          .max(10, "최대 10자를 입력해주세요")
      : yup.string().default(""),
    mb_position: expert
      ? yup
          .string()
          .required("직책을 입력해주세요.")
          .max(10, "최대 10자를 입력해주세요")
      : yup.string().default(""),
    mb_hp: expert
      ? yup
          .string()
          .required("핸드폰 번호를 입력해주세요.")
          .max(20, "최대 10자를 입력해주세요")
      : yup.string().default(""),
  });

  return yupResolver(schema);
};
