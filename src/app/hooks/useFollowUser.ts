import { api } from "@/trpc/react"

export default function useFollowUser() {

    const utils = api.useUtils()

    const { mutate: toggleFollow, isLoading:userFollowLoading } = api.user.toggleFollowUser.useMutation({
        onSuccess: async () => await utils.user.invalidate()
    })

    const { mutate: togglePending } = api.user.togglePendingUser.useMutation({
        onSuccess: async () => await utils.user.invalidate()
    })

    const { mutate: acceptFollow } = api.user.acceptUserFollow.useMutation({
        onSuccess: async () => await utils.user.invalidate()
    })

    function toggleFollowUser(userId: string) {
        toggleFollow({ id: userId })
    }
    function togglePendingUser(userId: string) {
        togglePending({ id: userId })
    }

    function acceptPendingFollow(userId: string) {
        acceptFollow({ id: userId })
    }

    return { toggleFollowUser, togglePendingUser, acceptFollow, acceptPendingFollow,userFollowLoading }
}