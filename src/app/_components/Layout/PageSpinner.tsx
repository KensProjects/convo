'use client'

import { Alert } from "@/components/ui/alert";
import Image from "next/image";
// import useAccount from "@/app/hooks/useAccount";
// import usePost from "@/app/hooks/usePost";
// import { useParams } from "next/navigation";

export default function PageSpinner() {

    // const params = useParams<({ username: string })>()

    // const { personalDataIsLoading } = useAccount({ username: params.username })

    // if (personalDataIsLoading) {
        return (
            <Alert className="max-w-max max-h-max flex justify-center items-center">
                <Image src={"/spinner.svg"} alt={"loading..."} width={100} height={100} priority className="animate-spin flex justify-center items-center" />
            </Alert>
        )
    }


