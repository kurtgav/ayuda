export default function HowItWorks() {
	return (
		<section className="px-6 md:px-12 py-12 bg-white">
			<div className="max-w-6xl mx-auto text-center">
				<h2 className="text-3xl font-semibold">How Ayuda Works</h2>
				<p className="mt-2 text-slate-600">Three simple steps to get a trusted professional to your doorstep.</p>

				<div className="mt-8 grid md:grid-cols-3 gap-6">
					<div className="p-6 border rounded-xl">
						<div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto">1</div>
						<h4 className="mt-4 font-semibold">Choose a Service</h4>
						<p className="mt-2 text-sm text-slate-600">Select plumbing, electrical, cleaning, and more.</p>
					</div>

					<div className="p-6 border rounded-xl">
						<div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto">2</div>
						<h4 className="mt-4 font-semibold">Pick Date & Time</h4>
						<p className="mt-2 text-sm text-slate-600">See available pros and lock in a slot.</p>
					</div>

					<div className="p-6 border rounded-xl">
						<div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto">3</div>
						<h4 className="mt-4 font-semibold">Pay & Confirm</h4>
						<p className="mt-2 text-sm text-slate-600">Cashless via Paymongo/GCash or pay after service.</p>
					</div>
				</div>
			</div>
		</section>
	)
}
