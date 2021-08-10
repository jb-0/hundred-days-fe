import { RegisterFormData } from './Register';
export { FormItem } from './Register';
export type LogInFormData = Omit<RegisterFormData, 'confirmPw'>;
