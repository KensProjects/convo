import Link from "next/link"
import { GearIcon, PersonIcon, HomeIcon } from "@radix-ui/react-icons"
import BannerComposeButton from "./BannerComposeButton"
import { getServerAuthSession } from "@/server/auth"
import { api } from "@/trpc/server"

export default async function Banner() {

  const session = await getServerAuthSession()

  // const personalData = await api.user.getProfile({ id:session?.user.id })

  const listStyle = "w-full h-10 flex justify-center items-center text-2xl rounded-sm hover:underline gap-4 underline-offset-2 font-medium"

  const linkStyle = "w-fit h-full flex justify-center items-center"

  return (
    <ul className='hidden md:flex max-h-max w-1/4 flex-col justify-start items-center pt-8 gap-2'>
      <li className={listStyle}><HomeIcon width={18} height={18} /><Link className={linkStyle} href={"/home"}>Home</Link></li>
      <li className={listStyle}><PersonIcon width={18} height={18} /><Link className={linkStyle} href={`/user/${session?.user.id}`}>Profile</Link></li>
      <li className={listStyle}><GearIcon width={18} height={18} /><Link className={linkStyle} href={"/settings"}>Settings</Link></li>
      <li className={listStyle}>
        <BannerComposeButton />
      </li>
    </ul>
  )
}
