import { createFormHook, createFormHookContexts } from '@tanstack/react-form'

import { lazy } from 'react'

const TextField = lazy(() => import('./text-field'))
const SelectField = lazy(() => import('./select-field'))
const CheckboxField = lazy(() => import('./checkbox-field'))

// export useFieldContext for use in your custom components
export const { fieldContext, formContext, useFieldContext } =
  createFormHookContexts()

export const { useAppForm, withForm } = createFormHook({
  fieldContext,
  formContext,
  // We'll learn more about these options later
  fieldComponents: {
    TextField,
    SelectField,
    CheckboxField,
  },
  formComponents: {},
})
