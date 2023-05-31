import { ImageResponse } from "@vercel/og";
import { NextRequest } from "next/server";

export const runtime = "edge"

const fontRegular = fetch(
  new URL("../../../fonts/Inter-Regular.ttf", import.meta.url)
).then((res) => res.arrayBuffer());

const fontExtraBold = fetch(
  new URL("../../../fonts/Inter-ExtraBold.ttf", import.meta.url)
).then((res) => res.arrayBuffer());

export async function GET(req: NextRequest) {
  try {
    const NAME = process.env.NEXT_PUBLIC_DOCUMENTATION_NAME;
    const fontRegularData = await fontRegular;
    const fontExtraBoldData = await fontExtraBold;
    const { searchParams } = new URL(req.url);

    const hasTitle = searchParams.has("title");
    const title = hasTitle
      ? searchParams.get("title")
      : "Create your Documentation";
    const hasExcerpt = searchParams.has("excerpt");
    const excerpt = hasExcerpt
      ? searchParams.get("excerpt")
      : "Build with Next.js and MDX. Powered by Contentlayer.";
    const hasChapter = searchParams.has("chapter");
    const chapter = hasChapter ? searchParams.get("chapter") : "";

    return new ImageResponse(
      (
        <div
          style={{ fontFamily: '"Inter"' }}
          tw="w-full h-full flex flex-col py-8 px-12"
        >
          <div tw="flex-1 flex flex-col w-full border-4 border-green-300 rounded-xl bg-green-50 p-6">
            <div tw="flex">
              <p tw="text-2xl ml-4 font-medium">{NAME}</p>
            </div>
            <div tw="flex-1 flex flex-col justify-end">
              {/* TODO: dynamic doc */}
              <p tw="text-green-500 text-xl font-medium mb-0 uppercase">
                {chapter}
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
        ],
      }
    );
  } catch (error: any) {
    console.log(`${error.message}`);
    return new Response(`Failed to generate the image`, { status: 500 });
  }
}
