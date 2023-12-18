import { useEffect, useState } from "react"

const useDebounce = <T>(value: T, delay: number) => {
  const [state, setState] = useState<T>(value)

  useEffect(() => {
    const timeout = setTimeout(() => setState(value), delay)
    return () => clearTimeout(timeout)
  }, [value, delay])

  return state
}

export default useDebounce
