import { api } from "@/trpc/react"

export default function useCreatePost() {

    const utils = api.useUtils()

    const { mutate: createPost, isLoading: postIsCreating } = api.post.createPost.useMutation({
        onSuccess: async () => {
            await Promise.all([utils.user.invalidate(), utils.post.invalidate()]).catch(err => console.error(err))
        }
    })

    function createPublicPost(postBody: string) {
        createPost({ body: postBody })
    }

    return { createPublicPost, postIsCreating }
}
