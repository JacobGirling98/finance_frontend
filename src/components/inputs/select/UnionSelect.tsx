import Select from "./Select"

interface UnionSelectProps<T> {
  value: string
  options: readonly string[]
  onChange: (s: T) => void
  title?: string
}

const UnionSelect = <T,>({
  value,
  options,
  onChange,
  title
}: UnionSelectProps<T>) => (
  <Select
    value={value}
    onChange={(v) => onChange(v as T)}
    options={options as string[]}
    title={title}
  />
)

export default UnionSelect
