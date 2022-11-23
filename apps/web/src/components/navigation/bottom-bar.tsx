import Link from "../ui/link";

export default function BottomBar() {
  return (
    <p className="text-center text-sm font-extralight text-gray-600">
      created by <Link href="https://twitter.com/mxkaske">@mxkaske</Link>{" "}
      &middot; hosted on <Link href="https://vercel.com">vercel</Link>
    </p>
  );
}
