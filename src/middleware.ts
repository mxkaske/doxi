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
    const purpose = req.headers.get("Purpose");

    if (purpose !== "prefetch" && process.env.VERCEL_ENV !== "development") {
      const pathSlug = pathname.slice(1, pathname.length);
      const slug = pathSlug === "" ? "root" : pathSlug;
      // DO SOMETHING
      increaseView(slug);
      if (req.ip) {
        increaseUniqueViews(slug, req.ip);
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
