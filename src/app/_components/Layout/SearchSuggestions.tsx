import { ScrollArea } from "@/components/ui/scroll-area";

export default function SearchSuggestions({ suggestions }: { suggestions: string[] }) {

    if (suggestions === null) return null

    return (

        <ScrollArea className=" bg-white text-black border border-black w-2/3 z-50">
            {suggestions.map(letter => (
                <div key={letter} className="w-full h-8 flex justify-center items-center">{letter}</div>
            ))}
        </ScrollArea>
    )
}
