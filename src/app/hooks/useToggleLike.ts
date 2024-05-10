import { api } from "@/trpc/react"

export default function useToggleLike() {

    const utils = api.useUtils()

    const { mutate: toggleLike, isPending: likeLoading } = api.post.toggleLikeForPost.useMutation({
        onSuccess: async () => {
            await utils.post.invalidate()
        }
    })
    return { toggleLike, likeLoading }
}
