"use client"

import Link from "next/link"

import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { useSession } from "next-auth/react"


export default function NavbarButtons() {

    const { data: session } = useSession()

    return (
        <NavigationMenu className="hidden sm:flex">
            <NavigationMenuList>
                <NavigationMenuItem>
                    <Link href="/" legacyBehavior passHref className="bg-red-200">
                        <NavigationMenuLink className={navigationMenuTriggerStyle()} target="_blank">
                            Home
                        </NavigationMenuLink>
                    </Link>
                </NavigationMenuItem>
                {!session && <NavigationMenuItem>
                    <Link href={"/api/auth/signin"} legacyBehavior passHref>
                        <NavigationMenuLink className={navigationMenuTriggerStyle()} target="_blank">
                            Signin
                        </NavigationMenuLink>
                    </Link>
                </NavigationMenuItem>}
                {session && <NavigationMenuItem>
                    <Link href={"/api/auth/signout"} legacyBehavior passHref>
                        <NavigationMenuLink className={navigationMenuTriggerStyle()} target="_blank">
                            Signout
                        </NavigationMenuLink>
                    </Link>
                </NavigationMenuItem>}
            </NavigationMenuList>
        </NavigationMenu>
    )
}
