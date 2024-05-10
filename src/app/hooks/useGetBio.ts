import { api } from "@/trpc/react";

export default function useGetBio({ id }: { id: string }) {

    const { data: bio, isLoading: userBioLoading } = api.user.getBio.useQuery({ id: id })

    const userBio = bio?.bio

    return { userBio, userBioLoading }
}
