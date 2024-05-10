'use client'

import PageSpinner from "@/app/_components/Layout/PageSpinner"
import useAccount from "@/app/hooks/useAccount"
import { useSession } from "next-auth/react"

export default function Hello() {

  const { data: session } = useSession()

  const { personalDataIsLoading } = useAccount({ id: session?.user.id })

  if (personalDataIsLoading) return <PageSpinner />

  return (
    <div className='w-auto h-screen flex justify-center items-center'>Hello! Please start using the app!</div>
  )
}
