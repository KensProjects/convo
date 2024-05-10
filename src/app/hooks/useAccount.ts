import { api } from "@/trpc/react"

// import { z } from "zod";

// const paramsSchema = z.object({
//     username: z.string().catch('').optional(),
//     id: z.string().catch('').optional(),
// });

// const searchParams = new URLSearchParams(window.location.search);

// const params = paramsSchema.parse({
//     username: searchParams.get('username')
//     id: searchParams.get('id')
// })

export default function useAccount({ username, id }: { id?: string, username?: string }) {


    const { data: personalData, status: accountStatus, isLoading: personalDataIsLoading } = api.user.getProfile.useQuery({ username: username, id: id }, { refetchInterval: 5000, refetchOnWindowFocus: false, refetchOnReconnect: false, refetchOnMount: false })

    return { personalData, accountStatus, personalDataIsLoading }
}
