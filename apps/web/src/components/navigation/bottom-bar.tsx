import Link from "../ui/link";

export default function BottomBar() {
  return (
    <div className="space-y-4 text-center text-sm font-extralight text-gray-600">
      <p>
        <Link href="/imprint">imprint</Link> &middot;{" "}
        <Link href="/privacy">privacy</Link>
      </p>
      <p>
        created by <Link href="https://twitter.com/mxkaske">@mxkaske</Link>{" "}
        &middot; hosted on <Link href="https://vercel.com">vercel</Link>
      </p>
    </div>
  );
}
