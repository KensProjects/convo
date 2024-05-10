import Link from "next/link"
import NavbarButtons from "./NavbarButtons"
import { SearchBar } from "./SearchBar"

export default function Navbar() {

    return (
        <header className="inline-flex justify-between items-center w-full h-full px-2 sm:px-8 py-4 gap-2 sm:gap-0 bg-primary border-b-2 border-black">
            <Link href="/">Convo</Link>
            <SearchBar />
            <NavbarButtons />
        </header>
    )
}
