import { Checkbox } from '../ui/checkbox.tsx'
import { Label } from '../ui/label.tsx'
import { useFieldContext } from './form-context.tsx'

export default function CheckboxField({ label }: { label: string }) {
  // The `Field` infers that it should have a `value` type of `string`
  const field = useFieldContext<boolean>()
  return (
    <div className="flex items-center space-x-2 pt-2">
      <Checkbox
        id={field.name}
        checked={field.state.value}
        onCheckedChange={(checked) => {
          field.handleChange(!!checked)
          console.log('Checkbox changed:', checked)
        }}
      />
      <Label htmlFor={field.name} className="text-sm">
        {label}
      </Label>
    </div>
  )
}
