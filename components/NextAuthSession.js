"use client"

import { SessionProvider } from "next-auth/react"

export default function NextAuthSession({ children }) {
  return <SessionProvider>{children}</SessionProvider>
}