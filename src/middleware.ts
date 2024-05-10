import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { getServerAuthSession } from "./server/auth";
// This function can be marked `async` if using `await` inside
export async function middleware(req: NextRequest) {
    return
}
