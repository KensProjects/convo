'use client'

import PageSpinner from "@/app/_components/Layout/PageSpinner"
import WallPost from "@/app/_components/Post/WallPost"
import useAccount from "@/app/hooks/useAccount"
import usePost from "@/app/hooks/usePost"

export default function Post({ params }: { params: { postId: string } }) {

  const { post, postIsLoading } = usePost({ postId: params.postId })

  const { personalData, personalDataIsLoading } = useAccount({ id: post?.createdById })

  if (personalDataIsLoading || postIsLoading || !post || !personalData) return <PageSpinner />

  return (
    <WallPost id={post.id} body={post.body} createdAt={post.createdAt} image={personalData.image!} username={personalData.username} likes={post.likes} likedByIds={post.likedByIds} createdById={post.createdById} />
  )
}
