import { ImageResponse } from "@vercel/og";
import { allChapters } from "contentlayer/generated";
import { NextRequest } from "next/server";
import colors from "tailwindcss/colors";
// import { Inter } from "@next/font/google";

export const config = {
  runtime: "experimental-edge",
};

// TODO: match fonts!
// const inter = Inter({
//   subsets: ["latin"],
// });

export default async function handler(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const hasSlug = searchParams.has("slug");
    const slug = hasSlug && searchParams.get("slug");
    const chapter = await allChapters.find(
      (c) => c._raw.flattenedPath === slug
    );

    const {
      title,
      excerpt,
      _raw: { sourceFileDir },
    } = chapter || {
      title: "Create your Documentation page",
      excerpt: "Build with Next.js and MDX. Powered by Contentlayer.",
      _raw: {
        sourceFileDir: "",
      },
    };

    return new ImageResponse(
      (
        <div tw="w-full h-full flex flex-col p-8">
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
              <p tw="text-4xl ml-4 font-extrabold">Doxi</p>
            </div>
            <div tw="flex-1 flex flex-col justify-end">
              {/* TODO: dynamic chapter */}
              <p tw="text-green-500 text-xl font-medium mb-0 uppercase">
                {sourceFileDir.replaceAll("-", " ")}
              </p>
              <p tw="text-5xl text-green-900">{title}</p>
              <p tw="text-3xl text-gray-700">{excerpt}</p>
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (error: any) {
    console.log(`${error.message}`);
    return new Response(`Failed to generate the image`, { status: 500 });
  }
}
