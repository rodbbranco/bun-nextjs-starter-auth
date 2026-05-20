"use client"

import * as React from "react"
import { Field } from "@base-ui/react/field"

import { cn } from "@/lib/utils"

function FormItem({ className, ...props }: React.ComponentProps<typeof Field.Root>) {
  return (
    <Field.Root
      data-slot="form-item"
      className={cn("flex flex-col gap-2", className)}
      {...props}
    />
  )
}

function FormLabel({
  className,
  ...props
}: React.ComponentProps<typeof Field.Label>) {
  return (
    <Field.Label
      data-slot="form-label"
      className={cn("text-sm font-medium", className)}
      {...props}
    />
  )
}

function FormControl({ children, ...props }: React.ComponentProps<"div">) {
  return (
    <div data-slot="form-control" {...props}>
      {children}
    </div>
  )
}

function FormMessage({
  className,
  children,
  ...props
}: React.ComponentProps<typeof Field.Error>) {
  return (
    <Field.Error
      data-slot="form-message"
      className={cn("text-sm text-destructive", className)}
      {...props}
    >
      {children}
    </Field.Error>
  )
}

function FormDescription({
  className,
  ...props
}: React.ComponentProps<typeof Field.Description>) {
  return (
    <Field.Description
      data-slot="form-description"
      className={cn("text-xs text-muted-foreground", className)}
      {...props}
    />
  )
}

export { FormItem, FormLabel, FormControl, FormMessage, FormDescription }
