import GitHubIcon from "@/icons/GitHub";
import StackIcon from "@/icons/Stack";
import TwitterIcon from "@/icons/Twitter";
import Link from "../ui/link";

export default function TopBar() {
  const NAME = process.env.NEXT_PUBLIC_DOCUMENTATION_NAME;
  const TWITTER_URL = process.env.NEXT_PUBLIC_TWITTER_URL;
  const GITHUB_URL = process.env.NEXT_PUBLIC_GITHUB_URL;
  return (
    <div className="flex w-full items-center justify-between space-x-4 ">
      <div>
        <Link href="/" className="flex items-center space-x-2">
          <StackIcon className="h-5 w-5" />
          <span>{NAME}</span>
        </Link>
      </div>
      <div className="flex space-x-3">
        <Link href={GITHUB_URL!}>
          <GitHubIcon className="h-6 w-6 hover:text-[#6cc644]" />
        </Link>
        <Link href={TWITTER_URL!}>
          <TwitterIcon className="h-6 w-6 hover:text-[#1DA1F2]" />
        </Link>
      </div>
    </div>
  );
}
