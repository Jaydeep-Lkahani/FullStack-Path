import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-xl py-20 text-center">
      <h1 className="text-3xl font-bold">Page not found</h1>
      <p className="text-muted mt-2">That lesson or page does not exist.</p>
      <Link href="/" className="text-accent mt-6 inline-block underline">
        Back to the roadmap
      </Link>
    </div>
  );
}
