'use client'

import usePost from '@/app/hooks/usePost'
import usePostLikesByUsers from '@/app/hooks/usePostLikesByUsers'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function PostLikesUserList() {

    const pathname = usePathname()
    const postId = pathname.split('/')[2]
    const { post } = usePost({ postId: postId ?? 'd' })

    const { usersWhoLikedPost } = usePostLikesByUsers({ postId: post?.id ?? 'd', userIds: post?.likedByIds ?? ['s'] })

    return (
        <div className='flex flex-col w-full h-full justify-center items-center'>
            <h2 className='font-bold text-2xl py-2'>Post Liked By</h2>

            <ul className='flex justify-center items-start w-full h-full border-t border-black'>
                {usersWhoLikedPost?.map(({ name, username, image, bio }) => (
                    <li key={name} className='flex flex-col justify-center items-start h-fit w-full border-b border-black p-4'>
                        <Link href={`/user/${username}`} className='flex justify-center items-center gap-2'>
                            <Avatar>
                                <AvatarImage src={image ?? "/google-logo.svg"} />
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>

                            <div className="user-names flex flex-col">
                                <span>{name}</span>
                                <span className='text-sm'>@{username}</span>
                            </div>
                        </Link>


                        <p>{bio}</p>
                    </li>
                ))}
            </ul>
        </div>

    )
}
