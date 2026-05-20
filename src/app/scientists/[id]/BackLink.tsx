"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

type BackLinkProps = {
  href: string;
  useHistoryBack?: boolean;
};

const backClassName =
  "mb-6 flex items-center gap-2 text-gray-700 transition hover:text-gray-900";

export default function BackLink({ href, useHistoryBack = false }: BackLinkProps) {
  const router = useRouter();

  if (!useHistoryBack) {
    return (
      <Link href={href} className={backClassName}>
        <span className="text-xl">←</span>
        <span>Back</span>
      </Link>
    );
  }

  const handleBack = () => {
    if (window.history.length > 1) {
      router.back();
      return;
    }

    router.push(href);
  };

  return (
    <button type="button" onClick={handleBack} className={backClassName}>
      <span className="text-xl">←</span>
      <span>Back</span>
    </button>
  );
}
