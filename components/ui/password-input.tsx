"use client"

import * as React from "react"
import { Eye, EyeClosed } from "@phosphor-icons/react"

import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"

type PasswordInputProps = Omit<React.ComponentProps<typeof Input>, "type"> & {
  containerClassName?: string
}

const PasswordInput = React.forwardRef<
  React.ComponentRef<typeof Input>,
  PasswordInputProps
>(({ containerClassName, className, ...props }, ref) => {
  const [show, setShow] = React.useState(false)

  return (
    <div className={cn("relative", containerClassName)}>
      <Input
        ref={ref}
        type={show ? "text" : "password"}
        className={cn("pr-10", className)}
        {...props}
      />
      <button
        type="button"
        tabIndex={-1}
        aria-label={show ? "Hide password" : "Show password"}
        onClick={() => setShow((s) => !s)}
        className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
      >
        {show ? <EyeClosed size={20} /> : <Eye size={20} />}
      </button>
    </div>
  )
})
PasswordInput.displayName = "PasswordInput"

export { PasswordInput }
