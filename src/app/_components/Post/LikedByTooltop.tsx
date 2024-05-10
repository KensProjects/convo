// import { Button } from '@/components/ui/button'
// import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@radix-ui/react-tooltip'

// export default function LikedByTooltop({ likedBy }: { likedBy: string[] }) {

//     return (
//         <TooltipProvider>
//             <Tooltip>
//                 <TooltipTrigger asChild>
//                     <Button variant="outline">Hover</Button>
//                 </TooltipTrigger>
//                 <TooltipContent>
//                     <ul className="flex flex-col w-40 h-full overflow-auto">
//                         {likedBy.map(userId => (
//                             <li className="h-10 w-full flex justify-center items-center" key={userId}>{userId}</li>
//                         ))}
//                         {/* <li className="h-10 w-full flex justify-center items-center" key={crypto.randomUUID()}>sdsd</li>
//                         <li className="h-10 w-full flex justify-center items-center" key={crypto.randomUUID()}>sdsd</li>
//                         <li className="h-10 w-full flex justify-center items-center" key={crypto.randomUUID()}>sdsd</li>
//                         <li className="h-10 w-full flex justify-center items-center" key={crypto.randomUUID()}>sdsd</li> */}

//                     </ul>
//                 </TooltipContent>
//             </Tooltip>
//         </TooltipProvider>
//     )
// }
