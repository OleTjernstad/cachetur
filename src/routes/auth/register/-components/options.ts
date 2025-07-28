import { formOptions } from '@tanstack/react-form'

export const formOpts = formOptions({
  defaultValues: {
    username: '',
    referral: '',
    terms: false,
    email: '',
    isEmailSent: false,
    password: '',
    confirmPassword: '',
    verificationCode: '',
  },
})
