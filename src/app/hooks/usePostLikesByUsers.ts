import { api } from "@/trpc/react"

export default function usePostLikesByUsers({ postId, userIds }: { postId: string, userIds: string[] }) {

    const { data: usersWhoLikedPost, status } = api.post.getLikedUsersByPost.useQuery({ id: postId, likedByIds: userIds })

    return { usersWhoLikedPost,status }
}
