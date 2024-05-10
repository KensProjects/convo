import { api } from "@/trpc/react";

export default function useDeletePost() {

    const utils = api.useUtils()

    const { mutate: deletePost, isLoading: postDeleting, } = api.post.deletePost.useMutation({
        onSuccess: async () => {
            await Promise.all([utils.user.invalidate(), utils.post.invalidate()]).catch(err => console.error(err))
        }
    })

    function deletePublicPost(postId:string) {
        deletePost({ id: postId })
    }

    return { deletePublicPost, postDeleting }
}
