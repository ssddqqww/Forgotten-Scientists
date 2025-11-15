export default function about() {
  const team = [
    {
      name: "Kseniia Gubenko",
      role: "Team Lead",
      image: "Knesiia.png",
      about: "I'm the team leader of the project \"Forgotten Scientists.\" I brought the team together and contribute to the development through HTML, CSS, and design.",
    },
    {
      name: "Yeva Kushnir",
      role: "Content writer",
      image: "default.svg",
      about: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis quis fuga hic modi repellendus dicta velit, in ab fugit molestias accusamus? Magnam, enim quaerat? Nam sint laborum provident eius. Enim?"
    },
    {
      name: "Herman Katherine",
      role: "UI/UX Designer",
      image: "Katherine.png",
      about: "I'm Kat, a first-year college student studying to be a designer, living in Ukraine. I've been designing for over 6 years. I spent over 16 hours on the phone with Varya during this project :) -->"
    },
    {
      name: "Yakimenko Varvara",
      role: "UI/UX Designer",
      image: "Varvara.png",
      about: "I am a 9th grade student living in Ukraine. I have been involved in design since 2023. During this project, I spent more than 16 hours on the phone with Kat."
    },
    {
      name: "Maruf Ahmmed",
      role: "Lead Technical Team & Back-End Developer",
      image: "Maruf.png",
      about: "MD. Maruf Ahmmed , a web developer and CSE student from Bangladesh, focused on building interactive and user-friendly web application"
    },
    {
      name: "Tamanna Akter Shathi",
      role: "Back-End & Front-End Developer",
      image: "Tamanna.png",
      about: "I’m a first-year student at Sylhet International University, pursuing a Bachelor’s degree in Computer Science and Engineering (CSE). I’m passionate about learning web development and exploring new technologies to build creative and user-friendly projects."
    },
    {
      name: "Jannatul Lima",
      role: "Back-End & Front-End Developer",
      image: "Lima.png",
      about: "I’m a Full Stack Developer and the Frontend Developer at Neurodevs Agency. I’m passionate about building modern, responsive, and user-friendly web applications."
    },
    {
      name: "Von Bryan Bañal",
      role: "Front-End Developer",
      image: "Bryan.png",
      about: "I'm Bryan, a 2nd-year college student with 1-2 years of experience in web development, working on various side projects along the way. I start my day with a plate of savory syntax and a cup of code."
    },
  ]
  return (
    <div className="px-10 md:px-2 lg:px-20 bg-[url(/planet_bg.png)] bg-cover text-white relative">
      <section className="relative z-10 pt-40 px-6 py-16 max-w-7xl mx-auto z-10 tracking-wide">
        <h1 className="text-3xl md:text-6xl font-bold mb-10">
          Forgotten Scientists
        </h1>

        <p className="mb-12 leading-relaxed text-gray-300 text-4xl font-semibold">
          Our mission is to educate and inspire users by showcasing the lives and
          contributions of overlooked scientists from around the world.
        </p>

        <div className="mb-12">
          <h2 className="text-4xl font-semibold mb-3">The goal of Forgotten Scientists:</h2>
          <ul className="text-3xl text-gray-300 list-disc list-outside ml-6 space-y-2">
            <li>
              Create an engaging digital platform that highlights the lives,
              discoveries, and contributions of overlooked scientists worldwide.
            </li>
            <li>
              Make scientific history more accessible through interactive tools such as
              quizzes, visual timelines, and a global map.
            </li>
          </ul>
        </div>

        <div className="mb-12">
          <h2 className="text-4xl font-semibold mb-3">Impact:</h2>
          <ul className="text-3xl text-gray-300 list-disc list-outside ml-6 space-y-2">
            <li>
              Give visibility to lesser-known scientists, promote diversity in science
              education.
            </li>
            <li>
              Inspire students and teachers with new role models, and broaden public
              understanding of scientific progress.
            </li>
            <li>
              Use interactive design to ensure that users not only consume information
              but also actively engage with it, fostering curiosity and recognition of
              the global impact of science.
            </li>
          </ul>
        </div>

        <h1 className="text-3xl md:text-6xl font-bold mb-6">
          Our team
        </h1>
        <div className="grid sm:grid-cols-1 lg:grid-cols-2 gap-8 z-10">
          {team.map((member, i) => (
            <div key={i}>
              <div className="grid grid-cols-2 gap-6">
                <img src={`/team/${member.image ? member.image : ''}`} alt="" className="rounded-lg w-70 object-cover h-70"/>
                <div>
                  <h2 className="text-3xl font-semibold mb-3">{member.name}</h2>
                  <div className="font-semibold mb-3 text-gray-300">{member.role}</div>
                  <p className="text-gray-300 text-justify text-lg">
                    {member.about}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="absolute z-0 bottom-0 left-0 h-full w-full bg-linear-to-t from-black/40 via-black/60 to-black/40"></div>
    </div>

  )
}