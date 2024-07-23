// src/__tests__/validation.test.ts
import { emailUserFormSchema } from '../../validations/user/emailUserFormValidation';

describe('이메일 유저 스키마 검증테스트', () => {
  it('email과 password를 규칙에 맞게 넣었을때 잘 통과가 되는가', async () => {
    const validData = {
      email: 'test@example.com',
      password: 'Password1!',
    };

    await expect(emailUserFormSchema.validate(validData)).resolves.toBe(
      validData
    );
  });

  it('이메일 형식이 맞는가', async () => {
    const invalidData = {
      email: 'invalid-email',
      password: 'Password1!',
    };

    await expect(emailUserFormSchema.validate(invalidData)).rejects.toThrow(
      '올바른 이메일 형식이 아닙니다'
    );
  });

  it('비밀번호가 최소 8글자가 이상인가', async () => {
    const invalidData = {
      email: 'test@example.com',
      password: 'Pw1!',
    };

    await expect(emailUserFormSchema.validate(invalidData)).rejects.toThrow(
      '영문 대문자, 소문자, 숫자, 특수문자를 포함하여 8자 이상 입력해주세요'
    );
  });

 

  it('특수문자와 대문자가 포함된 8글자인가 ', async () => {
    const invalidData = {
      email: 'test@example.com',
      password: 'password',
    };

    await expect(emailUserFormSchema.validate(invalidData)).rejects.toThrow(
      '영문 대문자, 소문자, 숫자, 특수문자를 포함하여 8자 이상 입력해주세요'
    );
  });
});
