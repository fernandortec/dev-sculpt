import { type NextRequest, NextResponse } from "next/server";

export const config = {
	matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};

const excludedRoutes = ["/signin", "/", "/signup"];

export function middleware(request: NextRequest): NextResponse {
	if (excludedRoutes.includes(request.nextUrl.pathname)) return NextResponse.next();

	const token = request.cookies.get("authorization")?.value;
	if (!token) return NextResponse.redirect(new URL("/signin", request.url));

	return NextResponse.next();
}
