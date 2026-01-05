This Product Requirements Document (PRD) outlines the vision, requirements, and user experience for **Ayuda**, a premium, trust-focused home services marketplace designed specifically for the modern Filipino user.

---

# Product Requirements Document (PRD): Ayuda MVP

**Product Name:** Ayuda (Tagalog for "Help")
**Version:** 1.0 (Minimum Viable Product - MVP)
**Date:** January 5, 2026
**Owner:** Vibe-Coder (Product Manager)

## 1. Executive Summary: The Vision

Ayuda is more than an app; it is the **Calm in the Chaos** of home maintenance for Filipinos.

Our vision is to grow Ayuda into a sustainable, profitable tech company by being the **most trusted and convenient** way for homeowners and renters to find, book, and pay for vetted home services (Plumbing, Electrical, Cleaning, Aircon Techs, Carpentry). We move Filipinos away from risky social media guesswork to a seamless, premium digital experience. The MVP must launch quickly, free of cost, using a solo developer, while embodying a **Trust-First, Elegant, and Minimal** aesthetic.

---

## 2. User Journey Map: The Cabuyao Incident

This map is based directly on the core user story, focusing on the desired *smooth, reliable experience*.

| Step | User Action (Homeowner) | System Response / Feature Used | Desired Outcome / Emotion |
| :--- | :--- | :--- | :--- |
| **1. Crisis** | Wakes up to a leaking kitchen sink. | N/A (Pain Point) | Stress, Urgency |
| **2. Discovery** | Opens the Ayuda app (instead of Facebook). | **Home Screen/Service Selection:** Clear, minimal categories (e.g., Plumbing). | Relief, Hope |
| **3. Vetting & Booking** | Selects "Plumbing," views vetted professionals with ratings and clear pricing/availability. Books the best fit for "Same Day." | **Instant Booking System:** Real-time availability check; Provider Profiles (Vetting Badge, Ratings). | Confidence, Convenience |
| **4. Service Delivery** | The professional arrives on time, performs the repair. | **Provider App (Invisible to User):** Provider marks job as started/completed. | Trust, Reliability |
| **5. Confirmation** | Professional uploads photos of the completed, fixed sink. | **Job Completion Screen:** User confirms fix is satisfactory. | Satisfaction |
| **6. Payment** | Pays for the service directly in the app via GCash. | **Cashless Payment Integration:** Secure transaction via GCash/Maya. | Security, Ease (No awkward cash handling) |
| **7. Feedback** | Leaves a rating and a brief review. | **Ratings & Reviews System:** Prompts for immediate, simple feedback. | Closure, Contribution |
| **8. Resolution** | The problem is solved quickly, safely, and stress-free. | N/A | Happiness, Loyalty |

---

## 3. Functional Requirements (MVP Must-Haves)

These requirements directly support the core value proposition and launch goal, while adhering to the **ZERO Cost** and **Solo Developer** constraints.

| ID | Requirement Category | Description | Priority | Notes for Solo Dev |
| :--- | :--- | :--- | :--- | :--- |
| **FR-001** | **Service Provider Vetting** | The system must capture and display a "Vetted" status for all active service professionals. | **Must-Have** | Initial vetting process must be manual/simple (e.g., profile verification) to launch quickly. |
| **FR-002** | **Instant Booking** | Customers must be able to select a service, view available providers, and confirm a booking instantly (or within a set SLA, e.g., 1 hour confirmation). | **Must-Have** | Focus on real-time availability indication over complex scheduling algorithms. |
| **FR-003** | **Ratings & Reviews** | Post-job completion, customers must be prompted to leave a 1-5 star rating and an optional text review for the professional. | **Must-Have** | This drives trust and repeat business. |
| **FR-004** | **Payment Integration** | The app must integrate with **GCash** (and ideally **Maya**) for secure, cashless payment processing upon job completion. | **Must-Have** | This is a key differentiator in the PH market. Focus on the most popular provider first. |
| **FR-005** | **Provider Profile** | Each service professional must have a clean profile displaying their name (or business name), verified skills, average rating, and number of completed jobs. | **Must-Have** | The core trust signal. |
| **FR-006** | **Basic Job Management** | Users must be able to view current/past bookings and the professional must be able to mark a job as 'Completed' with a photo upload. | **Must-Have** | Minimal tracking required to close the loop. |

---

## 4. UI/UX Guidelines: The Vibe

Ayuda must feel like a premium, reliable utility, not a noisy game.

| Guideline | Description | Implementation Focus |
| :--- | :--- | :--- |
| **Elegant & Premium** | Use generous white space, clean typography (a modern, legible sans-serif), and a restrained color palette. | **Color Palette:** Primarily white/light gray background with a single, deep, trustworthy accent color (e.g., deep navy, muted teal). |
| **Calm & Trust-First** | Minimize visual clutter. Information should be presented clearly and logically. Avoid excessive animations, badges, or "gamified" elements. | **Trust Signals:** Prominently display the "Vetted" badge, rating stars, and clear cancellation/guarantee policies near the booking button. |
| **Minimal & Refined** | Navigation should be intuitive, focusing only on the core task: *Booking a Service*. | **Navigation:** Simple tab bar (e.g., Book, My Jobs, Profile). The booking flow must be the shortest path possible. |
| **Philippine Market Tailored** | Language should be professional but accessible Filipino English. Ensure payment logos (GCash/Maya) are immediately recognizable. | **Localization:** Clear, direct language that conveys competence and respect. |

---

## 5. Success Definition & Metrics

The launch goal is to grow into a **sustainable, profitable tech company**. The MVP success metric directly addresses the *repeatedly and successfully book services* aspect.

**Primary Success Metric (North Star):**
> We will know Ayuda is working when **real users repeatedly and successfully book services** and **both customers and professionals keep coming back** (measured by **Repeat Booking Rate** and **Provider Retention**).

| Metric | Definition | Target (Post 1 Month Launch) | Rationale |
| :--- | :--- | :--- | :--- |
| **Repeat Booking Rate (Customer)** | Percentage of customers who complete one successful booking and return to book a second service within 30 days. | > 25% | Proves the experience was "smooth" and trustworthy enough to warrant a second use. |
| **Provider Retention Rate** | Percentage of initial service professionals who remain active and accept at least one job per week for four consecutive weeks. | > 70% | Proves Ayuda is providing *steady customers* and value to the supply side. |
| **Successful Transaction Rate** | Percentage of initiated bookings that result in a confirmed, cashless payment. | > 90% | Proves the core mechanic (booking + payment) is friction-free. |

---

## 6. Deferred Features (Phase 2+)

To maintain focus and meet the **ASAP timeline with a solo developer**, the following features are explicitly **OUT of Scope** for the MVP:

1.  **Loyalty points and referral reward system.** (Deferred as it adds complexity to the database and UI without validating the core booking loop.)
2.  **Advanced Scheduling/Subscription Models.**
3.  **In-app chat/messaging between user and provider.** (Initial communication should rely on basic contact info provided upon booking confirmation.)
4.  **Insurance/Guarantee claims process.** (Policy must be defined, but the complex claims system is deferred.)