export type FormItem = { value: string; errMsg?: string };
export interface RegisterFormData {
  email: FormItem;
  pw: FormItem;
  confirmPw: FormItem;
}
