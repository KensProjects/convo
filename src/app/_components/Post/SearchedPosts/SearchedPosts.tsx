import type { PostType } from "@/types/types";
import SearchedPost from "./SearchedPost";

export default function SearchedPosts({ searchedPosts }: { searchedPosts: PostType[] }) {

  return (
    <ul className="w-full h-full grid grid-cols-1 justify-center items-center">
      {searchedPosts.map(post => (
        <li key={post.id} className="flex justify-center items-center w-full">
          <SearchedPost searchedPost={{
            id: post.id,
            body: post.body,
            createdAt: post.createdAt,
            createdById: post.createdById,
            likes: post.likes,
            likedByIds: post.likedByIds
          }} />
        </li>
      ))}
    </ul>
  )
}
