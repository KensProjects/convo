import { api } from "@/trpc/react"

export default function useSearchPublicPosts({ username }: { username: string }) {

    const { data: publicUsers, isLoading: publicUsersLoading } = api.user.searchPublicUsers.useQuery({ username: username })

    return { publicUsers, publicUsersLoading }
}
