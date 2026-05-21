"use client"

import * as React from "react"

interface AuthLayoutProps {
  title: string
  description: string
  children?: React.ReactNode
  footer?: React.ReactNode
}

export function AuthLayout({ title, description, children, footer }: AuthLayoutProps) {
  return (
    <div className="flex min-h-svh items-center justify-center">
      <div className="flex w-full max-w-sm flex-col items-center gap-6 text-center">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-medium">{title}</h1>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>

        {children}

        {footer && <div className="w-full">{footer}</div>}
      </div>
    </div>
  )
}
