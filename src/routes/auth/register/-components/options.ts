import { formOptions } from '@tanstack/react-form'

export const formOpts = formOptions({
  defaultValues: {
    username: '',
    referral: '',
    terms: false,
    email: '',
    password: '',
    confirmPassword: '',
    verificationCode: '',
  },
})
