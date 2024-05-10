'use client'

import useAccount from '@/app/hooks/useAccount'
import type { PostType } from '@/types/types'
import Link from 'next/link'
import LikeButton from '../LikeButton'
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card'
import { Avatar, AvatarImage, AvatarFallback } from '@radix-ui/react-avatar'
import { useSession } from 'next-auth/react'
import useToggleLike from '@/app/hooks/useToggleLike'
import { format } from 'date-fns'

export default function SearchedPost({ searchedPost }: { searchedPost: PostType }) {

    const { data: session } = useSession()

    const { personalData } = useAccount({ id: searchedPost.createdById })

    const { toggleLike, likeLoading } = useToggleLike()

    const alreadyLiked = searchedPost.likedByIds.includes(session!.user.id)

    const fixedCreatedAt = format(searchedPost.createdAt, 'MMMM d yyyy HH:mm')

    return (
        <Card className='w-full'>
            <CardHeader className='flex flex-row justify-start items-center gap-3'>
                {/* <Link href={`/user/${personalData?.username}`}> */}
                    <Avatar className="w-8 h-8 rounded-full">
                        <AvatarImage src={personalData?.image ?? "/google-logo.svg"} className='rounded-full' />
                        <AvatarFallback className='rounded-full'>CN</AvatarFallback>
                    </Avatar>
                {/* </Link> */}
                <div className="user-name-info flex flex-col justify-center items-start">
                    <CardTitle className='text-md flex flex-col justify-center items-start'>
                        {personalData?.name}
                    </CardTitle>
                    <Link href={`/user/${personalData?.username}`}>@{personalData?.username}</Link>
                </div>

            </CardHeader>

            <CardContent className='flex flex-col w-full justify-start items-start'>
                <span>{searchedPost.body}</span>
            </CardContent>

            <CardFooter className='flex flex-row justify-between items-center'>
                <Link href={`/post/${searchedPost.id}`}>{fixedCreatedAt}</Link>
                <div className="likes-container flex justify-center items-center gap-2">
                    <LikeButton isLiked={alreadyLiked} likeFunction={() => toggleLike({ id: searchedPost.id })} likeIsLoading={likeLoading} />
                    <span>{searchedPost.likes}</span>
                </div>
            </CardFooter>
        </Card >
    )
}
