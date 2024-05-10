'use client'

import { useSearchParams } from 'next/navigation'
import useSearchPublicPosts from '@/app/hooks/useSearchPublicPosts'
import SearchedPosts from '@/app/_components/Post/SearchedPosts/SearchedPosts'

export default function Search() {

  const searchParams = useSearchParams()
  const searchQuery = searchParams.get("q") ?? ""

  const { publicPosts, publicPostsLoading } = useSearchPublicPosts({ body: searchQuery })

  if (publicPostsLoading || publicPosts === undefined) return null

  return (
    <SearchedPosts searchedPosts={publicPosts} />
  )
}
