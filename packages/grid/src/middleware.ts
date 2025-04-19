import { authMiddleware } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export default authMiddleware({
  afterAuth(_, req) {
    if (req.nextUrl.pathname === "/") {
      return NextResponse.redirect(new URL("/patch/new", req.nextUrl));
    }

    return NextResponse.next();
  },
  publicRoutes: () => true,
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
