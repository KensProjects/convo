import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import { format } from "date-fns"
import { LockClosedIcon, CalendarIcon } from "@radix-ui/react-icons"
import EditProfileButton from "./EditProfileButton"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import FollowUserButton from "./FollowUserButton"
import { getServerAuthSession } from "@/server/auth"
import { api } from "@/trpc/server"

export default async function UserProfileCard({ username }: { username: string }) {

    console.log(username)

    const session = await getServerAuthSession()

    const personalData = await api.user.getProfile({ username })

    const isPersonalAccount = session?.user.id === personalData?.id

    const formattedJoinDate = format(personalData?.createdAt ?? 0, 'MMMM yyyy')

    if (personalData === null || personalData === undefined) return null

    return (
        <Card className="w-3/4 h-full bg-blue-200" id="user-bio">
            <CardHeader className="flex flex-col justify-start items-start gap-4">
                <Avatar className="w-32 h-32">
                    <AvatarImage src={personalData.image ?? "/google-logo.svg"} />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div id="user-card-info" className="flex justify-between items-center w-full">
                    <div id="profile-card-name" className="flex flex-col justify-center items-start gap-1">
                        <CardTitle>
                            {personalData.name}
                        </CardTitle>

                        <span className="text-sm">@{personalData.username}</span>
                    </div>
                    {personalData.isPrivateAccount && <LockClosedIcon width={25} height={25} />}
                </div>

                {isPersonalAccount ? <EditProfileButton currentBio={personalData.bio} currentPrivacy={personalData.isPrivateAccount} /> : <FollowUserButton />}
            </CardHeader>
            <CardContent className="flex justify-start items-center gap-4">
                <CardDescription className="flex justify-between items-center w-full">
                    {personalData.bio}
                </CardDescription>
            </CardContent>
            <CardFooter className="flex justify-start items-center gap-2">
                <CalendarIcon />
                {personalData.createdAt && <p>Joined {formattedJoinDate}</p>}
            </CardFooter>
        </Card>

    )
}
