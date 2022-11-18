import Link from "next/link";
import cn from "classnames";

export default function ListElement({
  isActive,
  title,
  url,
  // DISCUSS: if better set level here
  className,
}: {
  isActive?: boolean;
  title: string;
  url: string;
  className?: string;
}) {
  // fixing bug where #slug will forward to homepage
  const Anchor = url.startsWith("#") ? "a" : Link;
  return (
    // FIXME: strange behavior when switching `a` and `li`
    // FIXME: add group and apply group-hover to marker!
    <Anchor
      href={`${url}`}
      className={cn(
        "-mx-2 rounded-md px-2 py-0.5",
        isActive
          ? "bg-brand-50 text-brand-900"
          : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
        className
      )}
    >
      <li
        className={cn(
          "list-inside list-disc",
          isActive
            ? "marker:text-brand-500"
            : "marker:text-gray-200 hover:marker:text-gray-400"
        )}
      >
        {title}
      </li>
    </Anchor>
  );
}
