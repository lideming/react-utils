import { Callbacks, Ref, AnyFunc } from '@yuuza/utils'
import React, {
  useEffect,
  useState,
  useRef,
} from 'react'

/** Get and watch the value of a {@link Ref} */
export function useWebfxRef<T>(ref: Ref<T>) {
  const [val, setVal] = useState(ref.value)
  useWebfxCallbacks(
    ref.onChanged,
    (x) => {
      setVal(x.value)
    }
  )
  if (val !== ref.value) setVal(ref.value)
  return val
}

/** Add callback to {@link Callbacks} */
export function useWebfxCallbacks<T extends AnyFunc>(
  callbacks: Callbacks<T> | null,
  cb: T
) {
  var cbRef = useRef(cb)
  cbRef.current = cb
  useEffect(() => {
    if (callbacks) {
      var wrapCb: any = (...args: any) => {
        return cbRef.current?.(...args)
      }
      callbacks.add(wrapCb)
      return () => callbacks.remove(wrapCb)
    }
  }, [callbacks])
}
