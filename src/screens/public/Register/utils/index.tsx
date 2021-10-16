import React from 'react';
import { RegisterFormData } from '../../../../types/Forms/Register';
import { VALID_EMAIL_RE } from '../../../../utils';

export const formValidation = (
  pw: string,
  confirmPw: string,
  email: string,
  t: (s: string) => void,
  setFormData: React.Dispatch<React.SetStateAction<RegisterFormData>>,
): boolean => {
  const emailIsValid = VALID_EMAIL_RE.test(String(email).toLowerCase());
  const passwordsMatch = pw === confirmPw;
  const passwordIsValid = pw.length > 7;

  if (!emailIsValid) {
    setFormData((prev: RegisterFormData) => {
      return {
        ...prev,
        email: { value: prev.email.value, errMsg: t('translation:common.errors.email_format') },
      } as RegisterFormData;
    });
  } else {
    setFormData((prev: RegisterFormData) => {
      return { ...prev, email: { value: prev.email.value } };
    });
  }

  if (!passwordsMatch) {
    setFormData((prev: RegisterFormData) => {
      return {
        ...prev,
        pw: { value: prev.pw.value, errMsg: t('translation:screens.public.register.errors.password_mismatch') },
      } as RegisterFormData;
    });
  } else {
    setFormData((prev: RegisterFormData) => {
      return { ...prev, pw: { value: prev.pw.value } };
    });
  }

  if (!passwordIsValid) {
    setFormData((prev: RegisterFormData) => {
      return {
        ...prev,
        pw: { value: prev.pw.value, errMsg: t('translation:screens.public.register.errors.password_composition') },
      } as RegisterFormData;
    });
  } else if (passwordsMatch) {
    setFormData((prev: RegisterFormData) => {
      return { ...prev, pw: { value: prev.pw.value } };
    });
  }

  return emailIsValid && passwordIsValid && passwordsMatch;
};
