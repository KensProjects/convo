'use client'

import { Button } from '@/components/ui/button'
import { signIn } from 'next-auth/react'
import Image from 'next/image'

export default function GoogleLoginButton() {
    
    async function handleGoogleSignIn() {
        await signIn("google")
    }

    return (
        <Button onClick={() => handleGoogleSignIn()} id="google-button" variant={'ghost'} className="w-60 h-10 overflow-hidden rounded-full flex items-center justify-center border border-black" >
            <Image src={"/google-logo.svg"} alt={""} width={30}
                height={12} />
            Sign In with Google
        </Button>
    )
}
