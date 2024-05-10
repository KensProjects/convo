import { api } from "@/trpc/react"

export default function useSearchPublicPosts({ body }: { body: string }) {

    const { data: publicPosts, isLoading: publicPostsLoading } = api.post.searchPublicPosts.useQuery({ body: body })

    return { publicPosts, publicPostsLoading }
}
