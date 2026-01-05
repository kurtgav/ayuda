import Link from 'next/link'

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between px-8 py-5">
      <h1 className="text-2xl font-bold">AYUDA</h1>
      <div className="flex gap-6">
        <Link href="/book">Book Service</Link>
        <Link href="/dashboard">Dashboard</Link>
      </div>
    </nav>
  )
}
