import { ImageResponse } from "@vercel/og";
import { allDocs } from "contentlayer/generated";
import { NextRequest } from "next/server";
import colors from "tailwindcss/colors";

export const config = {
  runtime: "experimental-edge",
};

// DISCUSS: what's the best way to fetch multiple
// TODO: check if @next/font/google is accessible

const fontRegular = fetch(
  new URL("../../fonts/Inter-Regular.ttf", import.meta.url)
).then((res) => res.arrayBuffer());

const fontExtraBold = fetch(
  new URL("../../fonts/Inter-ExtraBold.ttf", import.meta.url)
).then((res) => res.arrayBuffer());

const fontMedium = fetch(
  new URL("../../fonts/Inter-Medium.ttf", import.meta.url)
).then((res) => res.arrayBuffer());

export default async function handler(req: NextRequest) {
  try {
    const NAME = process.env.NEXT_PUBLIC_DOCUMENTATION_NAME;
    const fontRegularData = await fontRegular;
    const fontExtraBoldData = await fontExtraBold;
    const fontMediumData = await fontMedium;
    const { searchParams, hash } = new URL(req.url);
    // TODO: if possible, detect the haxsh and highlight it!
    // The '#' can only be read on the client - **not** server.
    // console.log({ hash, url: req.nextUrl });
    const hasSlug = searchParams.has("slug");
    const slug = hasSlug && searchParams.get("slug");
    const doc = await allDocs.find((c) => c._raw.flattenedPath === slug);

    const { title, excerpt, pathSegments } = doc || {
      title: "Create your Documentation",
      excerpt: "Build with Next.js and MDX. Powered by Contentlayer.",
      pathSegments: [],
    };

    return new ImageResponse(
      (
        <div
          style={{ fontFamily: '"Inter"' }}
          tw="w-full h-full flex flex-col py-8 px-12"
        >
          <div tw="flex-1 flex flex-col w-full border-4 border-green-300 rounded-xl bg-green-50 p-6">
            <div tw="flex items-center">
              <svg
                style={{ width: 48, height: 48 }}
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6.179 15L2 17.25L6.179 19.5L11.75 22.5L14.5355 21L17.321 19.5L21.5 17.25L17.321 15"
                  stroke={colors.green[300]}
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M6.179 10L2 12.25L6.179 14.5L11.75 17.5L14.5355 16L17.321 14.5L21.5 12.25L17.321 10"
                  stroke={colors.green[500]}
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M6.179 9.5L11.75 12.5L17.321 9.5M6.179 9.5L2 7.25L6.875 4.625L11.75 2L21.5 7.25L17.321 9.5"
                  stroke={colors.green[800]}
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <p tw="text-4xl ml-4 font-medium">{NAME}</p>
            </div>
            <div tw="flex-1 flex flex-col justify-end">
              {/* TODO: dynamic doc */}
              <p tw="text-green-500 text-xl font-medium mb-0 uppercase">
                {pathSegments[0]?.pathName.replace("-", " ")}
              </p>
              <p tw="text-5xl font-extrabold text-green-900">{title}</p>
              <p tw="text-3xl text-gray-700">{excerpt}</p>
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
        fonts: [
          {
            name: "Inter",
            data: fontRegularData,
            style: "normal",
            weight: 400,
          },
          {
            name: "Inter",
            data: fontExtraBoldData,
            style: "normal",
            weight: 800,
          },
          {
            name: "Inter",
            data: fontMediumData,
            style: "normal",
            weight: 500,
          },
        ],
      }
    );
  } catch (error: any) {
    console.log(`${error.message}`);
    return new Response(`Failed to generate the image`, { status: 500 });
  }
}
