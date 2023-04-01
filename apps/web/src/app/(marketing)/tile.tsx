import Link from "next/link";

interface Props {
  url: string;
  title: string;
  excerpt: string;
}

export default function Tile({ url, title, excerpt }: Props) {
  return (
    <Link
      href={url}
      className="group overflow-hidden rounded-md border border-gray-100 hover:border-brand-300"
    >
      <h2 className="border-b border-gray-100 bg-gray-50 px-4 py-3 font-semibold group-hover:border-brand-100 group-hover:bg-brand-50 group-hover:text-brand-950">
        {title}
      </h2>
      <p className="px-4 py-3">{excerpt}</p>
    </Link>
  );
}
