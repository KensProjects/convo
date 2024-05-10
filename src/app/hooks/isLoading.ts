'use client'

import { useSession } from "next-auth/react";
import useAccount from "./useAccount";
import useCreatePost from "./useCreatePost";
import useDeletePost from "./useDeletePost";
import useFollowUser from "./useFollowUser";

export default function useIsLoading() {

    const { data: session } = useSession()
    
    const { personalDataIsLoading } = useAccount({ id: session?.user.id })
    const { postIsCreating } = useCreatePost()
    const { postDeleting } = useDeletePost()
    const { userFollowLoading } = useFollowUser()


    const pageLoading = personalDataIsLoading || postIsCreating || postDeleting || userFollowLoading

    return pageLoading
}


