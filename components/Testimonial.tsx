export default function Testimonial() {
	return (
		<section className="px-6 md:px-12 py-12 bg-[#F7F7F6]">
			<div className="max-w-6xl mx-auto text-center">
				<h2 className="text-3xl font-semibold">What Our Users Say</h2>
				<p className="mt-2 text-slate-600">Stories from homeowners who love Ayuda.</p>

				<div className="mt-8 grid md:grid-cols-3 gap-6">
					<div className="p-6 bg-white rounded-xl shadow-sm">
						<p className="text-slate-700">“Booked a plumber and they arrived on time — job was fast and clean. Will use again!”</p>
						<p className="mt-4 font-semibold">— Maria, Quezon City</p>
					</div>

					<div className="p-6 bg-white rounded-xl shadow-sm">
						<p className="text-slate-700">“Easy booking and secure payment via GCash. The technician was professional.”</p>
						<p className="mt-4 font-semibold">— Carlo, Makati</p>
					</div>

					<div className="p-6 bg-white rounded-xl shadow-sm">
						<p className="text-slate-700">“Great platform for finding vetted electricians. My go-to now.”</p>
						<p className="mt-4 font-semibold">— Anne, Cebu</p>
					</div>
				</div>
			</div>
		</section>
	)
}
