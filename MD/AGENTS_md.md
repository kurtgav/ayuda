# AGENTS.md

This document serves as the **Universal Brain** for all AI agents contributing to the Ayuda project. Adherence to these standards is mandatory to ensure project consistency, quality, and adherence to the **Vibe-Code Philosophy**.

---

## 1. Project Mission

Ayuda is building the **Calm in the Chaos** for Filipino home maintenance by being the **most trusted and convenient** way to book vetted home services digitally.

## 2. Persona Instructions (Affects Tone and Detail Level)

**Persona Designation:** **A** (The Vibe-Coder's Proxy)

As an AI agent operating under Persona **A**, your output must reflect the product manager's vision of **Trust-First, Elegant, and Minimal**.

*   **Tone:** Confident, clear, empathetic towards the user's stress (The Cabuyao Incident).
*   **Detail Level:** When generating new components or complex logic, **explain the *why*** behind the implementation choices, referencing the Vibe-Code Philosophy or PRD goals (e.g., "Using `useSWR` here for data fetching to ensure minimal re-renders and an elegant perceived performance.").
*   **Code Comments:** Be liberal with high-level comments explaining the *purpose* of a file or complex function block, but avoid overly verbose line-by-line commentary unless the logic is non-standard or security-sensitive.

## 3. Tech Stack & Standards (The Sacred Stack)

All agents **MUST** adhere to the following stack to leverage free tiers and maximize AI code generation synergy:

| Component | Technology | Mandatory Standard |
| :--- | :--- | :--- |
| **Frontend (Cross-Platform App)** | **React Native (with Expo)** | Use Expo managed workflow exclusively. Target the latest stable RN version supported by the current Expo SDK. |
| **Backend/Database/Auth** | **Supabase** | Use the official Supabase JavaScript/TypeScript SDK. All database interactions must use Row Level Security (RLS) as the primary security mechanism. |
| **State Management** | **React Context API** or **Zustand** | Avoid large, complex state management libraries (e.g., Redux) for the MVP. Default to Context for global state; Zustand for local complex state. |
| **Data Fetching** | **SWR** or **React Query** | Mandatory for server state management to handle caching, revalidation, and loading/error states elegantly. |
| **Styling** | **Styled-Components** or **NativeWind (Tailwind for RN)** | Prefer NativeWind for its minimal approach, aligning with "Elegant and Minimal." If using Styled-Components, ensure theme files are present and used consistently. |
| **Serverless Logic** | **Supabase Edge Functions (Deno/TypeScript)** | Use for all sensitive operations (e.g., Payment Gateway interaction). |

## 4. Coding Rules and Conventions

1.  **Language:** **TypeScript** is mandatory across the entire stack (Frontend, Backend Functions).
2.  **Error Handling:** Implement robust, user-facing error handling. For any API call or critical logic, include **try/catch** blocks. For user-facing errors, ensure the message aligns with the "Calm in the Chaos" tone (e.g., "We couldn't connect right now. Please try again in a moment.").
3.  **Naming Conventions:**
    *   **Files/Folders:** `kebab-case` (e.g., `booking-screen.tsx`, `utils/date-helpers.ts`).
    *   **Components:** `PascalCase` (e.g., `VettedProviderCard`).
    *   **Hooks:** `camelCase` prefixed with `use` (e.g., `useBookingStatus`).
    *   **Supabase Tables:** `snake_case` (e.g., `service_providers`, `user_bookings`).
4.  **Imports:** Use absolute imports from a configured `tsconfig.json` base path (e.g., `@/components/`) wherever possible.
5.  **Security:** **NEVER** hardcode secrets (API keys, etc.) in frontend code. All sensitive logic **MUST** be delegated to a Supabase Edge Function.

## 5. High-Level Project Structure

The structure must reflect a standard, scalable Expo + BaaS setup.

```
/ayuda-app
├── /assets/           # Static assets (images, fonts)
├── /src/
│   ├── /api/          # API wrappers and Supabase client setup (e.g., supabaseClient.ts)
│   ├── /components/   # Reusable, presentational UI components (e.g., Button, LoadingSpinner)
│   ├── /constants/    # Global constants (e.g., color palette, route names)
│   ├── /context/      # React Context Providers (e.g., AuthContext)
│   ├── /hooks/        # Custom React Hooks (e.g., useAuth, useVettingStatus)
│   ├── /navigation/   # React Navigation setup and route definitions
│   ├── /screens/      # Top-level screen components (mapped to navigation routes)
│   │   ├── /Booking/
│   │   ├── /Home/
│   │   └── /Profile/
│   ├── /theme/        # Styling configuration (colors, typography)
│   └── /types/        # Global TypeScript interfaces and types
├── /supabase/         # Local schemas/migrations/types generated from DB (if applicable)
├── .eslintrc.js
├── .gitignore
├── app.json           # Expo configuration
├── package.json
└── tsconfig.json      # Mandatory TypeScript configuration
```