import type { ReactNode } from "react";
import ArchiveNavigation from "./ArchiveNavigation";

export default function ArchivePageShell({ children }: { children: ReactNode }) {
  return (
    <main className="min-h-screen bg-[#f5f2eb]">
      <ArchiveNavigation />
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-10 lg:px-8">
        <div className="overflow-visible rounded-[1.75rem] border border-black/10 bg-white px-4 py-6 shadow-[0_18px_60px_rgba(15,23,42,0.07)] sm:px-8 sm:py-10 lg:px-12">
          {children}
        </div>
      </div>
    </main>
  );
}
