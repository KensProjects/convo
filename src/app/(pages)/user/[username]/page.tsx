import WallPosts from "@/app/_components/Post/WallPosts";
import UserProfileCard from "@/app/_components/User/UserProfileCard";

export default async function Username({ params }: { params: { username: string } }) {

  console.log(3)

  return (
    <div className="flex flex-col justify-center items-center w-full h-full gap-8">
      <UserProfileCard username={params.username} />
      <WallPosts />
    </div>

  )
}




