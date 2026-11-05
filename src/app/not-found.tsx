import Link from "next/link";
import { ArrowLeftIcon, SearchIcon } from "@/components/course/icons";
import { OpenSearchButton } from "@/components/OpenSearchButton";
import { buttonClass } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-xl py-16 text-center sm:py-24">
      <p className="text-accent font-mono text-6xl font-semibold tracking-tight">404</p>
      <h1 className="mt-4 text-2xl font-bold tracking-tight sm:text-3xl">
        This lesson doesn&apos;t exist (yet).
      </h1>
      <p className="text-muted mt-2">
        The link may be old, or the module may still be on its way.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <OpenSearchButton className={buttonClass("secondary", "md")}>
          <SearchIcon className="size-4" />
          Search lessons
        </OpenSearchButton>
        <Link href="/#roadmap" className={buttonClass("primary", "md", "group")}>
          <ArrowLeftIcon className="size-4 transition-transform duration-150 group-hover:-translate-x-[3px]" />
          Back to roadmap
        </Link>
      </div>
    </div>
  );
}
