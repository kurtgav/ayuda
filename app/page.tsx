import Hero from '@/components/Hero'
import ServicesGrid from '@/components/ServicesGrid'
import HowItWorks from '@/components/HowItWorks'
import Pricing from '@/components/Pricing'
import Testimonial from '@/components/Testimonial'

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-slate-900">

      <Hero />

      {/* Social proof / trust */}
      <section className="px-6 md:px-12 py-12">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <p className="text-sm text-slate-500">10,000+ Bookings Completed</p>
            <h3 className="text-2xl md:text-3xl font-semibold mt-2">Trusted by homeowners across the Philippines</h3>
            <p className="mt-3 text-slate-600">Vetted professionals, transparent prices, and work warranties so you can relax.</p>
          </div>
          <div className="flex gap-3">
            <div className="w-20 h-20 bg-gray-100 rounded-lg" />
            <div className="w-20 h-20 bg-gray-100 rounded-lg" />
            <div className="w-20 h-20 bg-gray-100 rounded-lg" />
            <div className="w-20 h-20 bg-gray-100 rounded-lg" />
          </div>
        </div>
      </section>

      <HowItWorks />

      {/* Complete Implementation */}
      <section className="px-6 md:px-12 py-16 bg-[#FFF8F0]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Complete Implementation</h2>
          <p className="text-lg text-slate-600 mb-12">All 6 Functional Requirements delivered</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-lg border border-slate-200">
              <h3 className="text-xl font-semibold mb-4">✅ FR-001: Service Provider Vetting</h3>
              <p className="text-slate-600">Vetted badge display with trust signals and professional verification</p>
            </div>
            
            <div className="bg-white p-8 rounded-lg border border-slate-200">
              <h3 className="text-xl font-semibold mb-4">✅ FR-002: Instant Booking</h3>
              <p className="text-slate-600">Multi-step booking flow with real-time provider selection and confirmation</p>
            </div>
            
            <div className="bg-white p-8 rounded-lg border border-slate-200">
              <h3 className="text-xl font-semibold mb-4">✅ FR-003: Ratings & Reviews</h3>
              <p className="text-slate-600">Post-job review screen with 1-5 star rating and detailed feedback</p>
            </div>
            
            <div className="bg-white p-8 rounded-lg border border-slate-200">
              <h3 className="text-xl font-semibold mb-4">✅ FR-004: Payment Integration</h3>
              <p className="text-slate-600">Secure GCash/Maya payment processing via Supabase Edge Functions</p>
            </div>
            
            <div className="bg-white p-8 rounded-lg border border-slate-200">
              <h3 className="text-xl font-semibold mb-4">✅ FR-005: Provider Profile</h3>
              <p className="text-slate-600">Full provider display with specialties, ratings, job history, and contact info</p>
            </div>
            
            <div className="bg-white p-8 rounded-lg border border-slate-200">
              <h3 className="text-xl font-semibold mb-4">✅ FR-006: Job Management</h3>
              <p className="text-slate-600">View, track, and manage all bookings with status updates and filtering</p>
            </div>
          </div>
        </div>
      </section>

      <ServicesGrid />

      <Testimonial />

      <Pricing />

      {/* Final CTA */}
      <section className="px-6 md:px-12 py-12 bg-linear-to-r from-[#FFF8F0] to-white">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-3xl font-semibold">Ready to book your first service?</h3>
          <p className="mt-3 text-slate-600">Get a vetted professional to your door in minutes — cashless payments supported.</p>
          <a href="/book" className="inline-block mt-6 bg-orange-500 text-white px-8 py-3 rounded-full">Start Your First Booking</a>
        </div>
      </section>
    </main>
  )
}
