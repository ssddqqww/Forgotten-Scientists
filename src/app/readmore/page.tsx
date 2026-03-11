export default function readmore() {
  return (
    <section className="p-20 pt-30">

      <a href="/" className="flex items-center gap-2 text-gray-700 mb-6 hover:text-gray-900 transition">
        <span className="text-xl">←</span>
        <span>Back</span>
      </a>

      <div className="flex flex-col md:flex-row items-start gap-8">

        <div className="w-full md:w-1/3 flex-shrink-0">
          <img
            src="planet_bg.png"
            alt="Isaac Newton"
            className="rounded-lg object-cover w-full h-96"
          />
        </div>

        <div className="w-full md:w-2/3">
          <h1 className="text-4xl font-bold mb-4">Isaac Newton</h1>
          <p className="text-gray-700 leading-relaxed text-justify">
Ellen Swallow Richards was born on December 3, 1842, in Dunstable, Massachusetts. From an early age, she showed a keen interest in science and nature, although opportunities for women in scientific education were extremely limited at the time. She earned her bachelor’s degree in chemistry from Vassar College in 1870 and, making history, became the first woman admitted to MIT as a “special student.” She graduated in 1873 with a B.S. in Chemistry, breaking barriers for women in higher education. 
In 1876, Richards’ efforts led to the creation of the first “Women’s Laboratory” at MIT — a dedicated space where women could study chemistry, biology, mineralogy, and industrial chemistry. There she taught, mentored, and inspired many women, helping to open scientific education to women at a time when such opportunities were severely restricted.
By 1884, MIT had established the first laboratory of sanitary chemistry in the United States, with Richards serving as an instructor — a position she held until her death in 1911. Her work focused on analyzing water, air, and food for quality and safety. In 1887, she led a landmark survey of Massachusetts inland waters, testing tens of thousands of samples for pollution.
The findings from her water-quality survey contributed to the establishment of the first state water-quality standards in the United States and prompted construction of one of the first modern municipal sewage-treatment plants. Beyond public health, Richards applied her scientific knowledge to everyday life: she published influential works such as The Chemistry of Cooking and Cleaning and Air, Water and Food from a Sanitary Standpoint, effectively founding the discipline of home economics, promoting food safety, nutrition, sanitation, and efficient household management. 
Through her groundbreaking efforts, Richards made science accessible to women, created professional paths in public health and domestic science, and laid the foundation for modern environmental hygiene, nutrition standards, and the broader field of applied chemistry. Her legacy continues to inspire scientists, educators, and public health advocates.

          </p>
        </div>
      </div>
    </section>

  )
}