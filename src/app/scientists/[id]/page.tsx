import Image from "next/image";
import { notFound } from "next/navigation";
import { getScientistById, scientists } from "../../../../data/scientistsData";
import BackLink from "./BackLink";

type ScientistPageProps = {
  params: Promise<{ id: string }>;
  searchParams?: Promise<{ from?: string | string[] }>;
};

const backTargets = {
  featured: "/",
  scientists: "/scientists",
  timeline: "/timeline",
  map: "/map",
};

export function generateStaticParams() {
  return scientists.map((scientist) => ({ id: String(scientist.id) }));
}

export default async function ScientistPage({ params, searchParams }: ScientistPageProps) {
  const { id } = await params;
  const resolvedSearchParams = searchParams ? await searchParams : {};
  const rawFrom = Array.isArray(resolvedSearchParams.from)
    ? resolvedSearchParams.from[0]
    : resolvedSearchParams.from;
  const useHistoryBack = rawFrom === "search";
  const backHref =
    useHistoryBack
      ? "/"
      : rawFrom && rawFrom in backTargets
        ? backTargets[rawFrom as keyof typeof backTargets]
        : "/scientists";
  const scientist = getScientistById(Number(id));

  if (!scientist) {
    notFound();
  }

  return (
    <section className="bg-[#f5f2eb] px-4 pb-16 pt-8 sm:px-6 sm:pb-20 lg:px-8">
      <div className="mx-auto max-w-7xl rounded-[1.75rem] border border-black/10 bg-white p-5 shadow-[0_18px_60px_rgba(15,23,42,0.07)] sm:p-8 lg:p-12">
      <BackLink href={backHref} useHistoryBack={useHistoryBack} />

      <div className="grid items-start gap-10 xl:grid-cols-[minmax(300px,380px)_minmax(0,1fr)]">
        <div className="w-full">
          {scientist.image ? (
            <Image
              src={scientist.image}
              alt={scientist.name}
              width={760}
              height={760}
              className="h-[22rem] w-full rounded-2xl object-cover sm:h-[28rem]"
              style={{
                objectFit: scientist.imageFit ?? "cover",
                objectPosition: scientist.imagePosition ?? "center",
              }}
            />
          ) : (
            <div className="flex h-[22rem] w-full items-center justify-center rounded-2xl border border-dashed border-gray-400 bg-gray-50 text-sm text-gray-500 sm:h-[28rem]">
              Photo placeholder
            </div>
          )}
        </div>

        <div className="w-full max-w-4xl">
          <h1 className="mb-3 text-4xl font-bold leading-tight sm:text-5xl">{scientist.name}</h1>
          <div className="mb-6 flex flex-wrap gap-2 text-xs text-gray-600">
            <span className="border px-2 py-1">{scientist.field}</span>
            <span className="border px-2 py-1">{scientist.country}</span>
            <span className="border px-2 py-1">{scientist.century}</span>
          </div>

          <div className="rounded-lg border border-gray-200 bg-[#faf9f6] p-6">
            <p className="mb-5 text-base font-semibold leading-7 text-gray-900">
              {scientist.whatOpened}
            </p>
            <p className="mb-4 text-justify leading-8 text-gray-700">{scientist.shortBio}</p>
            <p className="text-justify leading-8 text-gray-700">{scientist.longBio}</p>
          </div>

          <div className="mt-8 rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-2xl font-bold">Sources</h2>
            <ul className="space-y-3">
              {scientist.sources.map((source, index) => (
                <li
                  key={source}
                  className="rounded-md border border-gray-200 bg-[#f8f8f8] px-4 py-3 text-sm leading-7 text-gray-700"
                >
                  <span className="mr-2 font-semibold text-gray-900">{index + 1}.</span>
                  {source.replace(/^\d+\.\s*/, "")}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      </div>
    </section>
  );
}
