import { Button } from "@/components/ui/button";
import { HeartIcon, HeartFilledIcon, SymbolIcon } from "@radix-ui/react-icons";

export default function LikeButton({ isLiked, likeFunction, likeIsLoading }: { isLiked: boolean, likeFunction: () => void, likeIsLoading: boolean }) {

    const notLiked = !isLiked && !likeIsLoading
    const liked = isLiked && !likeIsLoading

    return (
        <Button disabled={likeIsLoading} variant='outline' className="w-fit" onClick={likeFunction}>
            {likeIsLoading && <SymbolIcon width={25} height={25} className='animate-spin' />}
            {notLiked && <HeartIcon width={25} height={25} className="p-0 cursor-pointer"  />}
            {liked && <HeartFilledIcon width={25} height={25} className="p-0 cursor-pointer" />}
        </Button>
    )
}