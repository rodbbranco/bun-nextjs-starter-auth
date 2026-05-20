import { Input as InputPrimitive } from "@base-ui/react/input"
import * as React from "react"

import { cn } from "@/lib/utils"

const Input = React.forwardRef<
  React.ComponentRef<typeof InputPrimitive>,
  React.ComponentProps<typeof InputPrimitive>
>(({ className, type, ...props }, ref) => {
  return (
    <InputPrimitive
      ref={ref}
      type={type}
      data-slot="input"
      className={cn(
        "flex h-10 w-full rounded-none border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    />
  )
})
Input.displayName = "Input"

export { Input }
