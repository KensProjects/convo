import GoogleLoginButton from "@/app/_components/Layout/GoogleLoginButton"
import { PersonIcon } from "@radix-ui/react-icons"

export default function Home() {

  return (
    <main className="flex flex-col sm:flex-row justify-center items-center w-full h-auto border-b border-black">
      <div id="convo-splash-container" className="flex justify-center items-center w-1/2 overflow-auto">
        <PersonIcon />
      </div>
      <div id="intro-container" className="flex flex-col justify-center items-center w-1/2 border-t sm:border-l sm:border-t-0 border-black">
        <h1>Connect with anyone on the planet.</h1>
        <GoogleLoginButton />
      </div>
    </main>
  )
}