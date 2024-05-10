'use client'

import WallPost from "./WallPost"
import useAccount from "@/app/hooks/useAccount"
import { useParams } from "next/navigation"

export default function WallPosts() {

    const params = useParams<({ username: string })>()

    const { personalData } = useAccount({ username: params.username })

    return (
        <ul className="flex flex-col w-full h-full bg-gray-100">
            {personalData?.posts.map(({ id, body, createdAt, likes, likedByIds, createdById }) => (
                <li key={id}><WallPost id={id} body={body} createdAt={createdAt} image={personalData.image ?? "/google-logo.svg"} username={personalData.username} likes={likes} likedByIds={likedByIds} createdById={createdById} /></li>
            ))}
        </ul>
    )
}
