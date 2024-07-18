import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

export const getEmailUserFormSchema = () =>
  yupResolver(
    yup.object({
      email: yup
      .string()
      .required("이메일을 입력해주세요")
      .email("올바른 이메일 형식이 아닙니다"),
      password: yup
        .string()
        .required("비밀번호를 입력해주세요")
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z\d!@#$%^&*]{8,}$/,
          "영문 대문자, 소문자, 숫자, 특수문자를 포함하여 8자 이상 입력해주세요"
        )
        .min(8, "최소 8자 이상 입력해주세요")
        .max(20, "최대 20자를 입력해주세요"),
    //   mb_repassword: yup
    //     .string()
    //     .oneOf([yup.ref("mb_password")], "비밀번호가 일치해야 합니다")
    //     .required("비밀번호를 다시 입력해주세요"),
     })
  );