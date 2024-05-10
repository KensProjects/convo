'use client'

import useToggleLike from "@/app/hooks/useToggleLike";
import { format } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";
import LikeButton from "./LikeButton";
import DeleteButton from "./DeleteButton";
import useDeletePost from "@/app/hooks/useDeletePost";

export default function WallPost({ id, body, createdAt, image, username, likes, likedByIds, createdById }: { id: string, body: string, createdAt: Date, image: string, username: string, likes: number, likedByIds: string[], createdById: string }) {

  const { data: session } = useSession()

  const { toggleLike, likeLoading } = useToggleLike()

  const { deletePublicPost, postDeleting } = useDeletePost()

  const fixedCreatedAt = format(createdAt, 'MMMM d yyyy HH:mm')

  const alreadyLiked = likedByIds.includes(session!.user.id)

  const isPostedBySessionUser = session?.user.id === createdById

  return (
    <div className="flex flex-col w-auto h-40 border-b border-gray-400 p-3 px-6 gap-2 justify-between items-start overflow-auto">
      <div className="creator flex justify-center items-center gap-2">
        <Image src={image} alt="icon" width={30} height={30} className="rounded-full" priority />
        <Link href={`/user/${username}`} className="username hover:underline underline-offset-4">@{username}</Link>
      </div>
      <div className="text-sm">{body}</div>
      <div className="post-info-span flex justify-between items-center w-full">
        <Link href={`/post/${id}`} className="text-gray-500">{fixedCreatedAt}</Link>

        <div className="post-buttons flex justify-center items-center gap-12">
          <span className="text-red-500 flex justify-center items-center gap-1">
            <LikeButton isLiked={alreadyLiked} likeFunction={() => toggleLike({ id: id })} likeIsLoading={likeLoading} />
            <Link href={`/post/${id}/likes`}>{likes}</Link>
          </span>
          {isPostedBySessionUser && <DeleteButton deleteFunction={() => deletePublicPost(id)} isDeleting={postDeleting} />}
        </div>
      </div>
    </div>
  )
}

