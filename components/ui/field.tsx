"use client"

import * as React from "react"
import { Field as BaseField } from "@base-ui/react/field"

import { cn } from "@/lib/utils"

function FieldSet({ className, ...props }: React.ComponentProps<"fieldset">) {
  return (
    <fieldset
      data-slot="fieldset"
      className={cn("flex flex-col gap-6", className)}
      {...props}
    />
  )
}

function FieldLegend({
  className,
  variant = "legend",
  ...props
}: React.ComponentProps<"legend"> & { variant?: "legend" | "label" }) {
  return (
    <legend
      data-slot="legend"
      data-variant={variant}
      className={cn(
        variant === "legend" && "text-lg font-semibold",
        variant === "label" && "text-sm font-medium",
        className
      )}
      {...props}
    />
  )
}

function FieldGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="field-group"
      className={cn("flex flex-col gap-6", className)}
      {...props}
    />
  )
}

function Field({
  className,
  orientation = "vertical",
  "data-invalid": dataInvalid,
  ...props
}: React.ComponentProps<typeof BaseField.Root> & {
  orientation?: "vertical" | "horizontal" | "responsive"
  "data-invalid"?: boolean
}) {
  return (
    <BaseField.Root
      data-slot="field"
      data-orientation={orientation}
      data-invalid={dataInvalid}
      className={cn(
        "flex flex-col gap-2",
        orientation === "horizontal" && "flex-row items-center gap-4",
        dataInvalid && "[&_[data-slot=control]]:border-destructive",
        className
      )}
      {...props}
    />
  )
}

function FieldContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="field-content"
      className={cn("flex flex-col gap-1.5", className)}
      {...props}
    />
  )
}

function FieldLabel({
  className,
  ...props
}: React.ComponentProps<typeof BaseField.Label>) {
  return (
    <BaseField.Label
      data-slot="field-label"
      className={cn("text-sm font-medium", className)}
      {...props}
    />
  )
}

function FieldTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="field-title"
      className={cn("text-sm font-medium", className)}
      {...props}
    />
  )
}

function FieldDescription({
  className,
  ...props
}: React.ComponentProps<typeof BaseField.Description>) {
  return (
    <BaseField.Description
      data-slot="field-description"
      className={cn("text-xs text-muted-foreground", className)}
      {...props}
    />
  )
}

function FieldSeparator({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="field-separator"
      className={cn("my-2 h-px bg-border", className)}
      {...props}
    />
  )
}

function FieldError({
  className,
  children,
  errors,
  ...props
}: React.ComponentProps<"div"> & {
  errors?: Array<{ message?: string } | undefined>
}) {
  const errorMessages = errors
    ? errors.filter((e): e is { message: string } => !!e?.message)
    : []

  if (!children && errorMessages.length === 0) {
    return null
  }

  return (
    <div
      data-slot="field-error"
      className={cn("text-sm text-destructive", className)}
      {...props}
    >
      {errorMessages.length > 0 ? (
        <ul className="list-disc pl-4">
          {errorMessages.map((e, i) => (
            <li key={i}>{e.message}</li>
          ))}
        </ul>
      ) : (
        children
      )}
    </div>
  )
}

export {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
  FieldTitle,
}
