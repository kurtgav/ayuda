export default function DashboardPage() {
  return (
    <div className="px-6 md:px-12 py-12">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-semibold">Professional Dashboard (SLC)</h1>
        <p className="mt-2 text-slate-600">Overview of upcoming jobs, earnings and reviews (placeholder UI).</p>

        <div className="mt-6 grid md:grid-cols-3 gap-6">
          <div className="p-4 border rounded">Upcoming Jobs<br /><strong className="text-xl">3</strong></div>
          <div className="p-4 border rounded">Earnings (This month)<br /><strong className="text-xl">₱12,450</strong></div>
          <div className="p-4 border rounded">Reviews<br /><strong className="text-xl">4.8 ★</strong></div>
        </div>

        <div className="mt-8">
          <h3 className="font-semibold">Recent Jobs</h3>
          <div className="mt-3 space-y-3">
            <div className="p-4 border rounded">Plumbing — Jan 10 — Pending</div>
            <div className="p-4 border rounded">AC Service — Jan 8 — Completed</div>
          </div>
        </div>

        <div className="mt-10">
          <h2 className="text-4xl mb-6">My Bookings</h2>
          <div className="bg-white p-6 rounded-xl shadow">No bookings yet.</div>
        </div>
      </div>
    </div>
  )
}
