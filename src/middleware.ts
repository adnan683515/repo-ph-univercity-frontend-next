import { NextRequest, NextResponse } from "next/server";


export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;


    if (pathname.startsWith("/Course")) {
        const token = request.cookies.get("accessToken")?.value;

        if (!token) {
            // redirect only when unauthenticated
            return NextResponse.redirect(new URL("/Login", request.url));
        }
    }

    // allow everything else to continue
    return NextResponse.next();
}

export const config = {
    matcher: ["/Course/:path*"],
};
