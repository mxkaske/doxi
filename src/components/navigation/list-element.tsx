import Link from "next/link";

export default function ListElement({
  isActive,
  title,
  url,
  level = 1,
}: {
  isActive?: boolean;
  title: string;
  url: string;
  level?: number;
}) {
  // fixing bug where #slug will forward to homepage with next/link
  const Anchor = url.startsWith("#") ? "a" : Link;

  return (
    // FIXME: strange behavior when switching `a` and `li`
    // FIXME: add group and apply group-hover to marker!
    <Anchor
      href={`${url}`}
      className={`-mx-2 rounded-md px-2 py-0.5 ${
        isActive
          ? "bg-brand-50 text-brand-900"
          : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
      } ${level === 3 ? "ml-3" : level === 4 ? "ml-6" : "ml-0"}`} // TODO: more levels!
    >
      <li
        className={`ml-4 list-outside list-disc ${
          isActive
            ? "marker:text-brand-500"
            : "marker:text-gray-200 hover:marker:text-gray-400"
        }`}
      >
        {title}
      </li>
    </Anchor>
  );
}
