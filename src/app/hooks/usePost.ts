import { api } from "@/trpc/react"

export default function usePost({ postId }: { postId: string }) {

    const { data: post, isLoading: postIsLoading } = api.post.getPost.useQuery({ id: postId }, { refetchInterval: 10000, refetchOnWindowFocus: false, refetchOnReconnect: false, refetchOnMount: false })

    return { post, postIsLoading }
}
