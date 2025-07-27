import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select.tsx'

import { Label } from '../ui/label.tsx'
import { useFieldContext } from './form-context.tsx'

export default function SelectField({
  label,
  placeholder,
  items,
}: {
  label: string
  placeholder?: string
  items?: { value: string; label: string }[]
}) {
  // The `Field` infers that it should have a `value` type of `string`
  const field = useFieldContext<string>()
  return (
    <div>
      <Label htmlFor={field.name}>{label}</Label>
      <Select value={field.state.value} onValueChange={field.handleChange}>
        <SelectTrigger>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {items?.map((item) => (
            <SelectItem key={item.value} value={item.value}>
              {item.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {field.state.meta.errors && (
        <p className="text-red-500 text-xs mt-1">
          {field.state.meta.errors[0]}
        </p>
      )}
    </div>
  )
}
{
  /* <div className="space-y-2">
      <Label htmlFor={field.name}>{label}</Label>
      <Input
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
    </div> */
}
