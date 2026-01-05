import Link from 'next/link'

export default function Hero() {
  return (
    <section className="px-10 py-20 bg-[#FAF7F2]">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h1 className="text-5xl mb-6">
            Book Trusted Home Services in Minutes
          </h1>
          <p className="text-lg mb-8">
            Vetted professionals. Guaranteed work. Cashless payment.
          </p>
          <Link
            href="/book"
            className="bg-orange-500 text-white px-6 py-3 rounded-full"
          >
            Find a Pro Now
          </Link>
        </div>
        <div className="bg-white rounded-xl shadow-lg h-[400px]" />
      </div>
    </section>
  )
}
