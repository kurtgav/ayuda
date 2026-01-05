This is a **Vibe-Code Tech Design** for Ayuda, optimized for rapid, AI-assisted development under severe budget and time constraints.

---

# Vibe-Code Tech Design: Ayuda MVP

## 1. The Vibe-Code Philosophy

Given the constraints:
*   **Platform:** Cross-Platform (Mobile-first required)
*   **Budget:** Free only (Avoid high licensing/infrastructure costs)
*   **Timeline:** ASAP (1-2 weeks)
*   **Coding Approach:** AI writes all code (Requires a highly standardized, well-documented stack)
*   **Priority:** Works perfectly (Requires robust, managed services for core functions like Auth and DB)
*   **Risk Mitigation:** Trust/Vetting (Must be simple to implement initially but clearly defined in the model)

The philosophy is to leverage **Backend-as-a-Service (BaaS)** platforms that offer generous **free tiers** and **excellent AI code generation support** (Copilot, ChatGPT, etc.) for the frontend.

## 2. Recommended Technology Stack

| Component | Technology | Rationale |
| :--- | :--- | :--- |
| **Frontend (Cross-Platform App)** | **React Native (with Expo)** | Meets the "Cross-Platform" requirement. Expo simplifies setup, build process, and testing, which is critical for a 1-2 week solo sprint. |
| **Backend/Database/Auth** | **Supabase** (or Firebase as a close second) | **Free Tier:** Generous enough for MVP scale. **AI Synergy:** Excellent SDKs and clear documentation make AI code generation for CRUD operations highly effective. Provides Auth, Realtime DB (PostgreSQL), and Storage out-of-the-box, minimizing custom server code. |
| **Payment Integration** | **GCash/Maya API** (via Serverless Functions) | Direct integration is necessary. Since custom backend is minimized, we'll use **Supabase Edge Functions** (or Vercel Serverless Functions if using a separate Next.js frontend) to securely handle API keys for the payment gateways. |
| **AI Tooling** | **GitHub Copilot** | Directly addresses the existing tool constraint. |

**Why this stack?** It minimizes setup and maintenance overhead (no custom server to manage/deploy), relies on established SDKs for AI generation, and keeps the entire operational cost at **$0** initially.

## 3. Project Structure (React Native/Expo)

A clean, standard structure for AI readability:

```
/ayuda-app
├── /assets/
├── /components/         # Reusable UI elements (Buttons, Cards, TrustBadge)
├── /screens/            # Top-level screens (Home, BookingFlow, JobDetails, Profile)
├── /navigation/         # React Navigation setup (Stack, Tabs)
├── /services/           # API calls, Supabase client setup
│   ├── authService.js
│   ├── bookingService.js
│   └── storageService.js  # For photo uploads
├── /state/              # State management (e.g., Zustand or React Context)
├── App.js               # Main entry point
└── package.json
```

## 4. Data Model (Supabase PostgreSQL Schema - Plain English)

This model directly addresses the **Trust & Vetting** risk by creating clear data relationships.

| Table Name | Key Fields | Relationships / Notes |
| :--- | :--- | :--- |
| **`profiles`** | `id` (UUID, FK to Auth User), `full_name`, `phone_number`, `is_provider` (Boolean), `user_type` (Customer/Provider) | Stores basic user info. |
| **`providers`** | `profile_id` (FK to profiles), `specialties` (Array of strings: e.g., ["Plumbing", "Electrical"]), `is_vetted` (Boolean - **MVP Trust Signal**), `avg_rating` (Decimal), `job_count` (Integer) | Stores specific provider details. `is_vetted` is manually set by Admin/Owner initially. |
| **`bookings`** | `id`, `customer_id` (FK to profiles), `provider_id` (FK to providers, Nullable initially), `service_type`, `status` (Pending, Confirmed, InProgress, Completed, Cancelled), `start_time`, `price_paid` (Decimal) | The core transaction record. |
| **`reviews`** | `id`, `booking_id` (FK to bookings), `customer_id` (FK), `provider_id` (FK), `rating` (Integer 1-5), `comment` (Text), `photo_url` (Text, for completion proof) | Directly supports **FR-003**. `photo_url` is the completion proof. |
| **`payments`** | `id`, `booking_id` (FK), `amount`, `method` (GCash/Maya), `transaction_ref`, `status` (Success/Failed) | Tracks the cashless process (**FR-004**). |

## 5. Step-by-Step Build Plan (1-2 Week Iterative Sprint)

This plan prioritizes the core user loop (Booking $\rightarrow$ Payment $\rightarrow$ Review) and the critical Trust component.

| Week | Focus Area | Key Tasks (AI-Centric) | Target FRs |
| :--- | :--- | :--- | :--- |
| **Week 1: Foundation & Trust** | Setup, Auth, Data Structure, Provider Profile Display | 1. Initialize Expo/React Native project. 2. Set up Supabase client and Auth (Email/Password). 3. Create `profiles` and `providers` tables. 4. Build **Provider Profile Screen** (`FR-005`) showing the **Vetted Badge**. 5. Create a *mock* provider list for testing until real providers are onboarded. | FR-001, FR-005 |
| **Week 2: Core Loop & Closure** | Booking, Job Management, Payment Placeholder, Reviews | 1. Build **Service Selection** and **Instant Booking Flow** (`FR-002`). 2. Implement **Job Status Tracking** (`FR-006`). 3. Implement a **Payment Mock/Sandbox** integration for GCash/Maya via Edge Function placeholder (`FR-004`). 4. Build the **Rating & Review Screen** (`FR-003`). 5. Finalize navigation and polish UI to meet **Vibe Guidelines**. | FR-002, FR-003, FR-004, FR-006 |

## 6. Suggested AI Prompts for Implementation

These prompts are designed to leverage Copilot/ChatGPT effectively by giving it the necessary context (Stack, Goal, Data Model).

1.  **For Authentication & Data Setup:**
    > "I am building a React Native (Expo) app using Supabase for the backend. Generate the TypeScript code for a Supabase client setup and the initial `login` and `register` functions using email/password that link to the `profiles` table. Ensure the code includes error handling for common Supabase errors."

2.  **For the Core Trust Feature (Provider Profile Card):**
    > "Create a reusable React Native functional component called `ProviderCard.tsx` using Tailwind CSS styling (or standard RN styles). This component must accept a `provider` object. It must prominently display the provider's name, average rating (as stars), and a large, green 'VETTED' badge if `provider.is_vetted` is true. Use a clean, elegant, minimal design."

3.  **For the Booking Flow (State Management):**
    > "I need a state management hook using Zustand for the booking process. The state should track the selected `service_type`, `preferred_time`, and a list of available `providers` fetched from Supabase. Generate the hook structure and one action to `selectProvider(providerId)`."

4.  **For the Payment Integration Placeholder (Security Focus):**
    > "I need a secure Supabase Edge Function (written in TypeScript) that acts as a placeholder for a future GCash payment transaction. For now, it should accept a `bookingId` and `amount`, log this data to the `payments` table with a 'PENDING' status, and return a success message. **Crucially, it must not expose any real API keys in the function body.**"