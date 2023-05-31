import { default as DefaultLink } from "@/components/ui/link";

export default function Link({
  href,
  ...props
}: React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  // REMINDER: Workaround as Url does not accept `undefined`
  return <DefaultLink href={href || "/"} {...props} />;
}
