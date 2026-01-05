const services = [
  'Plumbing',
  'Electrical',
  'Cleaning',
  'Aircon',
  'Carpentry',
  'Painting',
]

export default function ServicesGrid() {
  return (
    <section className="px-10 py-20 bg-[#3B0F0F] text-white">
      <h2 className="text-4xl mb-10">Our Services</h2>
      <div className="grid md:grid-cols-3 gap-6">
        {services.map(service => (
          <div
            key={service}
            className="bg-white text-black p-6 rounded-xl"
          >
            {service}
          </div>
        ))}
      </div>
    </section>
  )
}
