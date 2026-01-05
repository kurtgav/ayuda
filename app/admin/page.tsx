export default function AdminPage() {
  return (
    <div className="px-6 md:px-12 py-12">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-semibold">Admin Panel (SLC)</h1>
        <p className="mt-2 text-slate-600">Manage providers, view bookings, and moderate reviews — placeholder UI.</p>

        <div className="mt-6 grid md:grid-cols-3 gap-6">
          <div className="p-4 border rounded">Providers<br /><strong className="text-xl">1,024</strong></div>
          <div className="p-4 border rounded">Active Bookings<br /><strong className="text-xl">120</strong></div>
          <div className="p-4 border rounded">Reported Issues<br /><strong className="text-xl">2</strong></div>
        </div>

        <div className="mt-8">
          <h3 className="font-semibold">Recent Activity</h3>
          <div className="mt-3 space-y-3">
            <div className="p-4 border rounded">New provider joined — Jan 9</div>
            <div className="p-4 border rounded">Booking dispute opened — Jan 7</div>
          </div>
        </div>
      </div>
    </div>
  );
}
