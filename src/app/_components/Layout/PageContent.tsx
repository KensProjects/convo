import type { ReactNode } from "react";

export default function PageContent({children}:{children:ReactNode}) {
  return (
    <div className="h-full w-full">{children}</div>
  )
}
