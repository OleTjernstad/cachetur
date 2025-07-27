import type { HTMLInputTypeAttribute } from 'react'
import { Input } from '../ui/input.tsx'
import { Label } from '../ui/label.tsx'
import { useFieldContext } from './form-context.tsx'

export default function TextField({
  label,
  placeholder,
  type,
}: {
  label: string
  placeholder?: string
  type?: HTMLInputTypeAttribute | undefined
}) {
  // The `Field` infers that it should have a `value` type of `string`
  const field = useFieldContext<string>()
  return (
    <div>
      <Label htmlFor={field.name}>{label}</Label>
      <Input
        type={type}
        id={field.name}
        name={field.name}
        value={field.state.value}
        onBlur={field.handleBlur}
        onChange={(e) => field.handleChange(e.target.value)}
        placeholder={placeholder}
        className={field.state.meta.errors.length > 0 ? 'border-red-500' : ''}
      />
      {field.state.meta.errors.length > 0 && (
        <p className="text-sm text-red-600">{field.state.meta.errors[0]}</p>
      )}
    </div>
  )
}
