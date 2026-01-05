export default function Pricing() {
	return (
		<section className="px-6 md:px-12 py-12 bg-white">
			<div className="max-w-6xl mx-auto text-center">
				<h2 className="text-3xl font-semibold">Pricing</h2>
				<p className="mt-2 text-slate-600">Simple plans for homeowners and professionals.</p>

				<div className="mt-8 grid md:grid-cols-3 gap-6">
					<div className="p-6 border rounded-xl">
						<h4 className="font-semibold">Free</h4>
						<p className="mt-2 text-2xl font-bold">₱0 / mo</p>
						<p className="mt-3 text-sm text-slate-600">Browse and book. Commission per booking applies.</p>
					</div>

					<div className="p-6 border rounded-xl">
						<h4 className="font-semibold">Plus</h4>
						<p className="mt-2 text-2xl font-bold">₱99 / mo</p>
						<p className="mt-3 text-sm text-slate-600">Discounted bookings, priority support.</p>
					</div>

					<div className="p-6 border rounded-xl">
						<h4 className="font-semibold">Premium</h4>
						<p className="mt-2 text-2xl font-bold">₱299 / mo</p>
						<p className="mt-3 text-sm text-slate-600">Unlimited bookings, warranty extension.</p>
					</div>
				</div>
			</div>
		</section>
	)
}
