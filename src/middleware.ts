import {
  NextRequest,
  NextFetchEvent,
  NextResponse,
  userAgent,
} from "next/server";
import { increaseView } from "./lib/redis/view-counter";

const handler = (req: NextRequest) => {
  try {
    console.log(req.ip);
    const { pathname } = req.nextUrl;
    const purpose = req.headers.get("Purpose");

    if (purpose !== "prefetch" && process.env.VERCEL_ENV !== "development") {
      const slug = pathname.slice(1, pathname.length);
      if (pathname === "") {
        increaseView(`root`);
      } else {
        increaseView(slug);
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
