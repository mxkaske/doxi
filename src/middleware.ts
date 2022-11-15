import {
  NextRequest,
  NextFetchEvent,
  NextResponse,
  userAgent,
} from "next/server";
import { increaseUniqueViews, increaseView } from "./lib/redis/view-counter";

const handler = (req: NextRequest) => {
  try {
    // console.log(req.ip); // can be used for unique views
    const { pathname } = req.nextUrl;
    // FIXME: need a bit more work
    const prefetched =
      req.headers.get("Purpose") === "prefetch" || // Next.js 12
      Boolean(req.headers.get("Next-Router-Prefetch")); // Next.js 13 RSC

    if (!prefetched && process.env.VERCEL_ENV !== "development") {
      // DO SOMETHING
      increaseView(pathname);
      if (req.ip) {
        increaseUniqueViews(pathname, req.ip);
      }
    }
  } catch (e) {
    console.error(e);
  } finally {
    return NextResponse.next();
  }
};

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|favicon.ico).*)",
    // TODO: add `assets` to the paths once you have some
  ],
};

export default handler;
