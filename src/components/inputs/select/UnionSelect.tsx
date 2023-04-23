import React, { FC } from "react";
import Select from "./Select";

interface UnionSelectProps<T> {
  value: string;
  options: readonly string[];
  onChange: (s: T) => void;
}

const UnionSelect = <T extends any>({ value, options, onChange }: UnionSelectProps<T>) =>
  <Select value={value} onChange={(v) => onChange(v as T)} options={options as string[]}/>

export default UnionSelect