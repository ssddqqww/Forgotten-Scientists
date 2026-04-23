import Image from "next/image";

export default function AboutPage() {
  const team = [
    {
      name: "Kseniia Gubenko",
      role: "Team Lead",
      image: "Knesiia.png",
      about:
        "I'm the team leader of the project \"Forgotten Scientists.\" I brought the team together and contribute to the development through React frontend implementation, dynamic data rendering, and responsive UI design.",
    },
    {
      name: "Yeva Kushnir",
      role: "Content Writer",
      image: "default.svg",
      about:
        "I work on research and storytelling, helping shape the written content of the project so that each scientist's story feels clear, engaging, and meaningful.",
    },
    {
      name: "Herman Katherine",
      role: "UI/UX Designer",
      image: "Katherine.png",
      about:
        "I'm Kat, a first-year college student studying design in Ukraine. I've been designing for over 6 years and focused on making the Forgotten Scientists experience feel thoughtful, elegant, and easy to explore.",
    },
    {
      name: "Yakimenko Varvara",
      role: "UI/UX Designer",
      image: "Varvara.png",
      about:
        "I am a 9th grade student living in Ukraine. I have been involved in design since 2023 and worked on shaping the project's visual style and overall interface direction.",
    },
    {
      name: "Maruf Ahmmed",
      role: "Lead Technical Team & Back-End Developer",
      image: "Maruf.png",
      about:
        "MD. Maruf Ahmmed is a web developer and CSE student from Bangladesh, focused on building interactive and user-friendly web applications.",
    },
    {
      name: "Tamanna Akter Shathi",
      role: "Back-End & Front-End Developer",
      image: "Tamanna.png",
      about:
        "I'm a first-year student at Sylhet International University, pursuing a degree in Computer Science and Engineering. I'm passionate about learning web development and building creative, user-friendly projects.",
    },
    {
      name: "Jannatul Lima",
      role: "Back-End & Front-End Developer",
      image: "Lima.png",
      about:
        "I'm a Full Stack Developer and Frontend Developer at Neurodevs Agency. I enjoy building modern, responsive, and user-friendly web applications.",
    },
    {
      name: "Von Bryan Bañal",
      role: "Front-End Developer",
      image: "Bryan.png",
      about:
        "I'm Bryan, a second-year college student with experience in web development and side projects. I focused on turning ideas into working frontend experiences for the site.",
    },
  ];

  return (
    <div className="bg-white text-black">
      <section className="relative overflow-hidden bg-black text-white">
        <div className="absolute inset-0 bg-[url('/planet_bg.png')] bg-cover bg-center opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/70 to-black" />

        <div className="relative mx-auto max-w-7xl px-10 pb-28 pt-32 md:px-6 lg:px-20">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-gray-300">
            About Us
          </p>
          <h1 className="mt-4 max-w-3xl text-4xl font-bold md:text-6xl">
            Forgotten Scientists
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-gray-200 md:text-2xl md:leading-10">
            We built this project to make overlooked scientists visible, memorable,
            and easier to discover through stories, timelines, maps, and quizzes.
          </p>

          <div className="mt-14 grid gap-5 md:grid-cols-3">
            <div className="border border-white/15 bg-white/5 p-6 backdrop-blur-sm">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-gray-200">
                Research Focus
              </p>
              <p className="mt-5 text-base leading-8 text-gray-100">
                Building a more inclusive view of scientific history through carefully selected profiles and contextual storytelling.
              </p>
            </div>

            <div className="border border-white/15 bg-white/5 p-6 backdrop-blur-sm">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-gray-200">
                Experience
              </p>
              <p className="mt-5 text-base leading-8 text-gray-100">
                Designed to feel approachable, visual, and interactive for students, educators, and curious readers.
              </p>
            </div>

            <div className="border border-white/15 bg-white/5 p-6 backdrop-blur-sm">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-gray-200">
                Purpose
              </p>
              <p className="mt-5 text-base leading-8 text-gray-100">
                Helping hidden contributions feel present again, not as footnotes but as part of the main story of science.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-gray-200 bg-[#faf9f6]">
        <div className="mx-auto grid max-w-7xl gap-5 px-10 py-12 md:grid-cols-3 md:px-6 lg:px-20">
          <div className="border border-gray-200 bg-white p-6 shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-gray-500">
              Mission
            </p>
            <p className="mt-4 text-base leading-7 text-gray-700">
              To educate and inspire users by showcasing the lives and
              contributions of overlooked scientists from around the world.
            </p>
          </div>

          <div className="border border-gray-200 bg-white p-6 shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-gray-500">
              Goal
            </p>
            <p className="mt-4 text-base leading-7 text-gray-700">
              Create an engaging digital platform that highlights discoveries,
              biographies, and the global impact of lesser-known scientists.
            </p>
          </div>

          <div className="border border-gray-200 bg-white p-6 shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-gray-500">
              Impact
            </p>
            <p className="mt-4 text-base leading-7 text-gray-700">
              Broaden public understanding of scientific progress and offer new
              role models for students, teachers, and curious readers.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-10 py-20 md:px-6 lg:px-20">
        <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="flex flex-col justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.14em] text-gray-500">
                Why It Matters
              </p>
              <h2 className="mt-3 text-3xl font-bold md:text-4xl">
                Why This Project Matters
              </h2>
            </div>
            <div className="mt-8 border border-gray-200 bg-black p-8 text-white shadow-[0_20px_50px_rgba(0,0,0,0.12)]">
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#d8c46c]">
                A wider history of science
              </p>
              <p className="mt-5 text-base leading-8 text-gray-200">
                Scientific history is often told through a narrow set of names. Forgotten
                Scientists exists to widen that view and make space for people whose work
                changed science, but whose stories are rarely centered. The project brings
                together biography, context, and interactive browsing so those contributions
                can be discovered in a way that feels vivid and memorable.
              </p>
            </div>
          </div>

          <div className="grid gap-5">
            <div className="border border-gray-200 bg-[#faf9f6] p-7 shadow-sm">
              <p className="text-sm font-semibold uppercase tracking-[0.14em] text-gray-500">
                Learning Through Exploration
              </p>
              <p className="mt-4 text-base leading-8 text-gray-700">
                Timelines, maps, scientist profiles, and quizzes help users move through
                the material naturally. Instead of reading one long page, they can explore
                by theme, place, or period and build understanding step by step.
              </p>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <div className="border border-gray-200 bg-white p-6 shadow-sm">
                <h3 className="text-lg font-semibold">Useful for students</h3>
                <p className="mt-3 text-sm leading-7 text-gray-600">
                  The platform supports classroom discovery, personal research, and
                  independent learning without feeling dry or overloaded.
                </p>
              </div>

              <div className="border border-gray-200 bg-white p-6 shadow-sm">
                <h3 className="text-lg font-semibold">Built to feel accessible</h3>
                <p className="mt-3 text-sm leading-7 text-gray-600">
                  The project is designed to make serious content feel approachable,
                  visual, and easier to return to than a standard reference page.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-gray-200 bg-[#f6f5f1]">
        <div className="mx-auto max-w-7xl px-10 py-16 md:px-6 lg:px-20">
          <div className="mb-12 border-b border-gray-200 pb-8">
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-gray-500">
              Our Team
            </p>
            <h2 className="mt-2 text-3xl font-bold md:text-4xl">
              The people behind the project
            </h2>
            <p className="mt-4 max-w-3xl text-sm leading-7 text-gray-600">
              Forgotten Scientists is a collaborative project shaped by students,
              developers, designers, and writers working across research, content,
              and product design.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {team.map((member) => (
              <article
                key={member.name}
                className="grid gap-5 border border-gray-200 bg-white p-5 shadow-sm sm:grid-cols-[140px_1fr]"
              >
                <div className="relative aspect-square overflow-hidden bg-gray-100">
                  <Image
                    src={`/team/${member.image}`}
                    alt={member.name}
                    fill
                    className="object-cover"
                  />
                </div>

                <div>
                  <h3 className="text-2xl font-semibold">{member.name}</h3>
                  <p className="mt-2 text-sm font-semibold uppercase tracking-[0.12em] text-gray-500">
                    {member.role}
                  </p>
                  <p className="mt-4 text-sm leading-7 text-gray-700">
                    {member.about}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
