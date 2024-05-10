/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
'use client'
import { Button } from "@/components/ui/button"
import useFollowUser from "@/app/hooks/useFollowUser"
import { useParams } from "next/navigation"
import useAccount from "@/app/hooks/useAccount"
import { useSession } from "next-auth/react"

export default function FollowUserButton() {

  const { data: session } = useSession()

  const params = useParams<({ username: string })>()

  const { personalData: otherUser, personalDataIsLoading: otherUserIsLoading } = useAccount({ username: params.username })
  const { personalData: sessionUser, personalDataIsLoading: sessionDataLoading } = useAccount({ id: session!.user.id })

  // const isPrivateAccount = otherUser?.isPrivateAccount

  const alreadyFollowing = otherUser?.followedUsers.includes(session!.user.id)

  // const alreadyPending = otherUser?.pendingFollowers.includes(session!.user.id)

  const { toggleFollowUser } = useFollowUser()

  function handleFollow() {
    if (!otherUser || !sessionUser) return
    toggleFollowUser(otherUser.id)
  }

  if (otherUserIsLoading || sessionDataLoading) return null

  return (
    <Button onClick={() => handleFollow()}>
      {alreadyFollowing ? "unFollow" : "follow"}
    </Button>
  )
}
