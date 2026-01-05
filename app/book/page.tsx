'use client'

import { useState } from 'react'

const SERVICES = [
  'Plumbing',
  'Electrical',
  'Cleaning',
  'Aircon',
  'Carpentry',
  'Painting',
]

export default function BookPage() {
  const [step, setStep] = useState(1)
  const [service, setService] = useState('Plumbing')
  const [address, setAddress] = useState('')
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')

  function next() {
    setStep(prev => Math.min(4, prev + 1))
  }

  function back() {
    setStep(prev => Math.max(1, prev - 1))
  }

  return (
    <div className="px-6 md:px-12 py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-semibold mb-6">Book a Service</h1>

        <div className="mb-6">
          <div className="flex items-center gap-4 text-sm text-slate-600">
            <div className={"w-8 h-8 rounded-full flex items-center justify-center " + (step>=1? 'bg-orange-500 text-white':'bg-gray-200')}>1</div>
            <div className={"w-8 h-8 rounded-full flex items-center justify-center " + (step>=2? 'bg-orange-500 text-white':'bg-gray-200')}>2</div>
            <div className={"w-8 h-8 rounded-full flex items-center justify-center " + (step>=3? 'bg-orange-500 text-white':'bg-gray-200')}>3</div>
          </div>
        </div>

        {step === 1 && (
          <div className="space-y-4">
            <label className="block text-sm font-medium">Service</label>
            <select className="w-full p-3 border rounded" value={service} onChange={e => setService(e.target.value)}>
              {SERVICES.map(s => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>

            <label className="block text-sm font-medium">Preferred Date</label>
            <input type="date" className="w-full p-3 border rounded" value={date} onChange={e => setDate(e.target.value)} />

            <label className="block text-sm font-medium">Preferred Time</label>
            <input type="time" className="w-full p-3 border rounded" value={time} onChange={e => setTime(e.target.value)} />

            <div className="flex justify-end mt-4">
              <button onClick={next} className="bg-orange-500 text-white px-6 py-3 rounded">Next</button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <label className="block text-sm font-medium">Service</label>
            <p className="p-3 border rounded">{service}</p>

            <label className="block text-sm font-medium">Address</label>
            <input className="w-full p-3 border rounded" placeholder="Unit, Building, Street, City" value={address} onChange={e => setAddress(e.target.value)} />

            <div className="flex justify-between mt-4">
              <button onClick={back} className="px-6 py-3 rounded border">Back</button>
              <button onClick={next} className="bg-orange-500 text-white px-6 py-3 rounded">Next</button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Review Your Booking</h3>
            <div className="p-4 border rounded">
              <p><strong>Service:</strong> {service}</p>
              <p className="mt-2"><strong>Date:</strong> {date || 'Not set'}</p>
              <p className="mt-2"><strong>Time:</strong> {time || 'Not set'}</p>
              <p className="mt-2"><strong>Address:</strong> {address || 'Not set'}</p>
            </div>

            <p className="text-sm text-slate-600">Payment: Placeholder — Paymongo / GCash integration will be added in production.</p>

            <div className="flex justify-between mt-4">
              <button onClick={back} className="px-6 py-3 rounded border">Back</button>
              <button onClick={() => alert('Booking submitted (demo). In production this will call the API and open payment flow')} className="bg-orange-500 text-white px-6 py-3 rounded">Confirm &amp; Pay</button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
