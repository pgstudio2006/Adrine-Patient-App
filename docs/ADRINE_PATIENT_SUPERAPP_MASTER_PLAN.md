# ADRINE PATIENT SUPER APP — MASTER PRODUCT & ARCHITECTURE PLAN

**Version:** 1.0  
**Classification:** Internal — Adrine Engineering & Product  
**Scope:** Complete blueprint for the Adrine Patient Super App platform experience layer

---

## TABLE OF CONTENTS

1. [Product Vision](#1-product-vision)
2. [User Personas](#2-user-personas)
3. [Information Architecture](#3-information-architecture)
4. [Navigation Architecture](#4-navigation-architecture)
5. [Mobile App Architecture](#5-mobile-app-architecture)
6. [Backend Integration Architecture](#6-backend-integration-architecture)
7. [API Integration Plan](#7-api-integration-plan)
8. [AI Integration Plan](#8-ai-integration-plan)
9. [Patient Identity System](#9-patient-identity-system)
10. [Family/Caregiver Architecture](#10-familycaregiver-architecture)
11. [Healthcare Records Architecture](#11-healthcare-records-architecture)
12. [Appointment & Scheduling System](#12-appointment--scheduling-system)
13. [Telemedicine Architecture](#13-telemedicine-architecture)
14. [Reports & Documents System](#14-reports--documents-system)
15. [Notification & Reminder System](#15-notification--reminder-system)
16. [Payment & Billing System](#16-payment--billing-system)
17. [Pharmacy & Medication System](#17-pharmacy--medication-system)
18. [Wearable/Device Integration Strategy](#18-wearabledevice-integration-strategy)
19. [AI Assistant Architecture](#19-ai-assistant-architecture)
20. [Workflow Integration Strategy](#20-workflow-integration-strategy)
21. [Realtime Infrastructure Plan](#21-realtime-infrastructure-plan)
22. [Offline-First Architecture](#22-offline-first-architecture)
23. [Push Notification Architecture](#23-push-notification-architecture)
24. [Security Architecture](#24-security-architecture)
25. [Authentication Architecture](#25-authentication-architecture)
26. [Biometric/Device Trust Architecture](#26-biometricdevice-trust-architecture)
27. [Analytics & Engagement Architecture](#27-analytics--engagement-architecture)
28. [Personalization System](#28-personalization-system)
29. [Modular Feature System](#29-modular-feature-system)
30. [Multi-Tenant Support Strategy](#30-multi-tenant-support-strategy)
31. [Scalability Strategy](#31-scalability-strategy)
32. [Design System Strategy](#32-design-system-strategy)
33. [Accessibility Strategy](#33-accessibility-strategy)
34. [Localization/Multilingual Strategy](#34-localizationmultilingual-strategy)
35. [Voice Interaction Strategy](#35-voice-interaction-strategy)
36. [AI Copilot Experience Design](#36-ai-copilot-experience-design)
37. [Patient Timeline & Health Graph Architecture](#37-patient-timeline--health-graph-architecture)
38. [Health Dashboard System](#38-health-dashboard-system)
39. [Emergency/SOS Workflows](#39-emergencysos-workflows)
40. [Healthcare Journey Orchestration](#40-healthcare-journey-orchestration)
41. [Future Ecosystem Expansion Plan](#41-future-ecosystem-expansion-plan)
42. [Mobile Engineering Architecture](#42-mobile-engineering-architecture)
43. [State Management Architecture](#43-state-management-architecture)
44. [Sync/Cache/Storage Architecture](#44-synccachestorage-architecture)
45. [Deployment/Release Strategy](#45-deploymentrelease-strategy)
46. [Phased Execution Roadmap](#46-phased-execution-roadmap)

---

## 1. PRODUCT VISION

### 1.1 Core Thesis

Adrine Patient Super App is not a healthcare mobile app — it is the **consumer interaction surface** of the Adrine Healthcare Infrastructure Cloud Platform. It is a patient-facing operating system for healthcare that transforms fragmented, episodic healthcare interactions into a unified, longitudinal, AI-native health experience.

### 1.2 Strategic Position

```
┌─────────────────────────────────────────────────────────────────┐
│                    ADRINE PLATFORM CLOUD                         │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐          │
│  │ Workflow  │ │    AI    │ │  Event   │ │  Domain  │          │
│  │  Engine   │ │ Gateway  │ │  Infra   │ │ Engines  │          │
│  └────┬─────┘ └────┬─────┘ └────┬─────┘ └────┬─────┘          │
│       │             │             │             │                │
│  ┌────┴─────────────┴─────────────┴─────────────┴────┐         │
│  │              ADRINE API PLATFORM                    │         │
│  └────────────────────────┬───────────────────────────┘         │
└───────────────────────────┼─────────────────────────────────────┘
                            │
                ┌───────────┴───────────┐
                │  PATIENT SUPER APP    │  ← This Document
                │  (Experience Layer)   │
                └───────────────────────┘
```

### 1.3 Product Principles

| Principle | Meaning |
|-----------|---------|
| **AI-Native** | AI is not a feature — it is the operating model. Every interaction can be AI-augmented. |
| **Longitudinal** | The app builds a continuous health story, not episodic encounters. |
| **Platform-First** | Every feature is backed by platform primitives, never standalone logic. |
| **Family-Centric** | Healthcare is a family activity. Multi-person management is first-class. |
| **Realtime** | All data flows in realtime. No stale states. No manual refresh. |
| **Trust-First** | Security, privacy, and consent are architectural foundations, not afterthoughts. |
| **Modular** | Features are pluggable modules controlled by tenant configuration. |
| **Consumer-Grade** | The UX must match the quality of Uber, Linear, Stripe, and Apple Health. |
| **Offline-Resilient** | Core functionality works without network. Sync happens transparently. |
| **Ecosystem-Ready** | Designed for future marketplace, third-party apps, and ecosystem integration. |

### 1.4 Experience North Stars

- **Zero-friction healthcare access** — booking, records, payments in under 3 taps
- **Ambient intelligence** — the app knows what you need before you ask
- **Emotional safety** — healthcare is stressful; the app must reduce anxiety
- **Unified identity** — one patient identity across all providers, labs, pharmacies
- **Family orchestration** — manage the health of your entire family from one place
- **Proactive health** — shift from reactive care to predictive, preventive guidance

### 1.5 What This App Replaces

| Current State | Adrine Replaces With |
|--------------|---------------------|
| Calling hospitals to book appointments | Intelligent scheduling with AI-suggested times |
| Carrying paper records to each visit | Unified digital health record accessible everywhere |
| Manually tracking medications | AI-managed medication reminders with refill automation |
| Visiting labs without context | Lab orders pre-filled, results delivered with AI interpretation |
| Separate apps per hospital/provider | One app, all providers, all interactions |
| No family health coordination | Family health dashboard with caregiver delegation |
| Insurance paperwork | Automated claims, pre-authorization, coverage checks |
| Emergency information scattered | One-tap SOS with complete medical context |

---

## 2. USER PERSONAS

### 2.1 Primary Personas

#### Persona 1: Priya — The Self-Managing Patient (25-40)

```yaml
Demographics:
  Age: 28
  Role: Software Engineer
  Health: Generally healthy, annual checkups, occasional specialist visits
  Tech: Power user, expects app quality comparable to fintech/consumer apps
  
Needs:
  - Quick appointment booking with minimal friction
  - Digital health records always accessible
  - Lab results with AI explanations
  - Medication reminders for occasional prescriptions
  - Health insights from wearable data
  
Pain Points:
  - Hates calling hospitals
  - Frustrated by lost reports
  - Wants one place for all health data
  - Expects modern UX, not legacy healthcare UI
  
App Usage Pattern:
  - Weekly: Check health metrics, AI insights
  - Monthly: Book appointment, view reports
  - Quarterly: Full health checkup workflow
  - Event-driven: Illness, medication reminders
```

#### Persona 2: Rajesh — The Family Health Manager (35-55)

```yaml
Demographics:
  Age: 45
  Role: Business Owner
  Health: Managing parents' chronic conditions + children's pediatric care
  Tech: Moderate user, values simplicity and reliability
  
Needs:
  - Manage health for 4-6 family members
  - Track parents' chronic medications and appointments
  - Children's vaccination schedules
  - Quick access to any family member's records during emergencies
  - Coordinate with multiple caregivers
  
Pain Points:
  - Overwhelmed managing multiple people's health
  - Forgets medication refills for parents
  - Needs to share records with different family members/caregivers
  - Emergency situations where complete medical history is critical
  
App Usage Pattern:
  - Daily: Medication tracking for parents
  - Weekly: Appointment coordination
  - Monthly: Review health metrics, refill medications
  - Emergency: Quick SOS access with medical context
```

#### Persona 3: Anita — The Chronic Condition Patient (40-70)

```yaml
Demographics:
  Age: 55
  Role: Retired Teacher
  Health: Diabetes Type 2, Hypertension, regular monitoring needed
  Tech: Basic smartphone user, needs simple interfaces
  
Needs:
  - Daily vitals logging (blood sugar, BP)
  - Medication adherence tracking
  - Regular doctor follow-ups
  - Lab result trends over time
  - AI-driven health alerts
  - Telemedicine for routine follow-ups
  
Pain Points:
  - Complex medication schedules
  - Anxiety about health changes
  - Difficulty understanding lab results
  - Needs reassurance and proactive guidance
  - May not understand English well — needs local language
  
App Usage Pattern:
  - Daily: Log vitals, medication reminders
  - Weekly: Review trends, AI insights
  - Bi-weekly: Telemedicine follow-up
  - Monthly: Lab tests, medication refills
```

#### Persona 4: Dr. Meera's Patient — The Referred Patient (Any Age)

```yaml
Demographics:
  Role: First-time app user referred by their provider
  Context: Hospital/clinic where Dr. Meera works uses Adrine platform
  
Needs:
  - Frictionless onboarding from provider referral
  - Immediate access to their records at that facility
  - Book follow-ups with their provider
  - Receive prescriptions and lab orders digitally
  - Pay bills without visiting the counter
  
Pain Points:
  - Doesn't want to learn a complex new app
  - Just wants to interact with their specific provider
  - May expand usage over time
  
App Usage Pattern:
  - Episodic: Around provider interactions
  - Progressive: Expands features over time as trust builds
```

### 2.2 Secondary Personas

#### Caregiver (Professional or Family)

```yaml
Role: Manages health for an elderly/disabled person
Access: Delegated access with specific permissions
Needs: 
  - View/manage appointments on behalf of patient
  - Medication management
  - Receive alerts for the patient
  - Coordinate with providers
  - Document care activities
```

#### Guardian (Legal)

```yaml
Role: Legal guardian of minors or incapacitated persons
Access: Full access to dependent's health profile
Needs:
  - Complete health management for dependents
  - Consent management for procedures
  - School/institutional health form generation
  - Vaccination and growth tracking
```

#### Emergency Contact

```yaml
Role: Designated emergency contact
Access: Emergency-only access to critical health information
Needs:
  - Receive emergency notifications
  - Access emergency medical information
  - Coordinate during emergencies
  - View critical allergies, medications, conditions
```

### 2.3 Persona-to-Feature Priority Matrix

| Feature | Priya | Rajesh | Anita | Referred Patient |
|---------|-------|--------|-------|------------------|
| Quick Booking | HIGH | HIGH | MED | HIGH |
| Records Access | HIGH | HIGH | MED | HIGH |
| Family Management | LOW | CRITICAL | LOW | LOW |
| Medication Tracking | LOW | HIGH | CRITICAL | MED |
| AI Insights | HIGH | MED | HIGH | LOW |
| Telemedicine | MED | MED | HIGH | MED |
| Wearables | HIGH | LOW | HIGH | LOW |
| Payments | HIGH | HIGH | MED | HIGH |
| Emergency/SOS | LOW | HIGH | HIGH | LOW |
| Voice Interaction | LOW | LOW | HIGH | LOW |

---

## 3. INFORMATION ARCHITECTURE

### 3.1 Top-Level Domain Model

```
┌─────────────────────────────────────────────────────────────┐
│                    ADRINE SUPER APP IA                        │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌─────────┐       │
│  │  HOME   │  │  CARE   │  │ RECORDS │  │ FAMILY  │       │
│  │Dashboard│  │ Actions │  │  Vault  │  │  Hub    │       │
│  └────┬────┘  └────┬────┘  └────┬────┘  └────┬────┘       │
│       │             │             │             │            │
│  ┌────┴────┐  ┌────┴────┐  ┌────┴────┐  ┌────┴────┐       │
│  │  AI     │  │Appoint- │  │ Reports │  │ Members │       │
│  │ Copilot │  │  ments  │  │         │  │         │       │
│  └─────────┘  ├─────────┤  ├─────────┤  ├─────────┤       │
│               │ Tele-   │  │ Prescrip│  │ Permis- │       │
│               │ medicine│  │ -tions  │  │ sions   │       │
│               ├─────────┤  ├─────────┤  ├─────────┤       │
│               │ Labs    │  │Timeline │  │Caregivers│       │
│               ├─────────┤  ├─────────┤  └─────────┘       │
│               │Pharmacy │  │Documents│                      │
│               ├─────────┤  └─────────┘                      │
│               │Emergency│                                    │
│               └─────────┘                                    │
│                                                              │
│  ┌───────────────────────────────────────────────────┐      │
│  │              CROSS-CUTTING SYSTEMS                  │      │
│  │  Payments | Notifications | Settings | Identity   │      │
│  └───────────────────────────────────────────────────┘      │
└─────────────────────────────────────────────────────────────┘
```

### 3.2 Information Hierarchy

```
Level 0: App Shell
├── Level 1: Primary Navigation Domains (5 max)
│   ├── Level 2: Domain Sections
│   │   ├── Level 3: Feature Views
│   │   │   └── Level 4: Detail/Action Screens
│   │   └── Level 3: Feature Views
│   └── Level 2: Domain Sections
├── Level 1: AI Copilot (Overlay/Sheet)
├── Level 1: Notifications (Overlay)
└── Level 1: Settings & Profile (Stack)
```

### 3.3 Content Types & Taxonomy

| Content Type | Source | Freshness | Sensitivity | Offline Priority |
|-------------|--------|-----------|-------------|-----------------|
| Health Metrics | Device/Manual | Realtime | High | Critical |
| Appointments | Platform | Realtime | Medium | High |
| Lab Results | LIMS Integration | Event-driven | High | High |
| Prescriptions | Provider/Platform | Event-driven | High | Critical |
| Medical Records | Platform/FHIR | On-demand | High | Medium |
| Bills/Payments | Billing Engine | Event-driven | Medium | Low |
| AI Insights | AI Gateway | Periodic/Event | Medium | Medium |
| Notifications | Event Infra | Realtime | Varies | High |
| Chat/Messages | Platform | Realtime | High | Medium |
| Documents | Document Service | On-demand | High | Low |

### 3.4 Data Ownership Model

```yaml
Patient-Owned Data:
  - Personal health metrics (self-reported vitals, symptoms)
  - Medication adherence logs
  - Health goals and preferences
  - Emergency contacts and preferences
  - Consent decisions
  - Personal notes

Platform-Mediated Data:
  - Medical records (owned by patient, sourced from providers)
  - Lab results (produced by labs, belongs to patient)
  - Prescriptions (issued by providers, managed by patient)
  - Appointment history
  - Payment records
  - Insurance information

Provider-Generated Data:
  - Clinical notes (visible per consent)
  - Diagnosis codes
  - Treatment plans
  - Referrals
  - Orders (lab, imaging, pharmacy)

AI-Generated Data:
  - Health insights and recommendations
  - Risk assessments
  - Trend analysis
  - Medication interaction alerts
  - Personalized health content
```

---

## 4. NAVIGATION ARCHITECTURE

### 4.1 Primary Navigation Model

**Pattern:** Bottom Tab Navigation with Floating AI Trigger

```
┌─────────────────────────────────────────┐
│                                         │
│           SCREEN CONTENT                │
│                                         │
│                                         │
│                                         │
│                                         │
│                                         │
│                    ┌──────┐             │
│                    │  AI  │             │ ← Floating AI trigger
│                    │Copilot│             │
│                    └──────┘             │
├─────────────────────────────────────────┤
│  🏠      📅      🏥      📋      👤    │ ← Bottom tabs
│  Home   Care   Records  Family  Profile │
└─────────────────────────────────────────┘
```

### 4.2 Tab Structure

| Tab | Label | Primary Purpose | Key Screens |
|-----|-------|----------------|-------------|
| 1 | Home | Dashboard, AI insights, quick actions | Health summary, AI feed, actions |
| 2 | Care | All care interactions | Appointments, Telemedicine, Labs, Pharmacy |
| 3 | Records | Health vault | Reports, Prescriptions, Timeline, Documents |
| 4 | Family | Multi-person management | Members, Permissions, Shared health |
| 5 | Profile | Identity & settings | Profile, Settings, Payments, Insurance |

### 4.3 Navigation Patterns

```yaml
Stack Navigation:
  - Each tab maintains its own stack
  - Deep links resolve to correct tab + stack position
  - Modal presentations for cross-cutting flows

Sheet/Modal Patterns:
  - Bottom sheets for quick actions (book, pay, confirm)
  - Full-screen modals for immersive flows (telemedicine, onboarding)
  - Half-sheet for AI copilot interactions

Gesture Navigation:
  - Swipe-back on all stack screens
  - Pull-to-refresh on list/dashboard screens
  - Long-press for contextual actions
  - Swipe actions on list items (reschedule, cancel, etc.)

Deep Link Routing:
  Pattern: adrine://[domain]/[resource]/[id]/[action]
  Examples:
    - adrine://care/appointment/abc123/join
    - adrine://records/report/xyz789/view
    - adrine://family/member/def456/health
    - adrine://ai/copilot?context=medication
```

### 4.4 Navigation State Machine

```
┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│  Unauthenti- │────→│  Onboarding  │────→│ Authenticated│
│    cated     │     │    Flow      │     │   App Shell  │
└──────────────┘     └──────────────┘     └──────┬───────┘
                                                  │
                     ┌────────────────────────────┼────────────┐
                     │                            │            │
              ┌──────┴──────┐  ┌──────────┐  ┌──┴─────┐  ┌──┴────┐
              │ Tab: Home   │  │ Tab: Care │  │Tab:Rec │  │Tab:Fam│
              │   Stack     │  │   Stack   │  │ Stack  │  │ Stack │
              └─────────────┘  └───────────┘  └────────┘  └───────┘
                     │
              ┌──────┴──────────────────────────────┐
              │        OVERLAY LAYER                  │
              │  ┌─────────┐  ┌──────────────────┐  │
              │  │AI Copilot│  │  Notifications   │  │
              │  │  Sheet   │  │     Panel        │  │
              │  └──────────┘  └──────────────────┘  │
              └──────────────────────────────────────┘
```

### 4.5 Quick Action Architecture

Quick Actions are context-aware shortcuts surfaced on the Home tab and via AI:

```yaml
Always Available:
  - Book Appointment
  - AI Health Chat
  - Emergency SOS
  - View Records

Context-Aware (AI-driven):
  - "Take your Metformin" (medication due)
  - "Your lab results are ready" (new result)
  - "Follow-up with Dr. Shah tomorrow" (upcoming appointment)
  - "Time for BP check" (monitoring schedule)

Smart Suggestions:
  - Based on time of day
  - Based on health patterns
  - Based on upcoming events
  - Based on medication schedules
```

---

## 5. MOBILE APP ARCHITECTURE

### 5.1 Architecture Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                    PRESENTATION LAYER                             │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐          │
│  │  Screens │ │Components│ │Navigation│ │  Design  │          │
│  │          │ │          │ │          │ │  System  │          │
│  └────┬─────┘ └────┬─────┘ └────┬─────┘ └────┬─────┘          │
├───────┼─────────────┼─────────────┼─────────────┼───────────────┤
│                    APPLICATION LAYER                              │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐          │
│  │  State   │ │ Feature  │ │  Hooks   │ │  Event   │          │
│  │ Machines │ │ Modules  │ │ & Logic  │ │ Handlers │          │
│  └────┬─────┘ └────┬─────┘ └────┬─────┘ └────┬─────┘          │
├───────┼─────────────┼─────────────┼─────────────┼───────────────┤
│                    DOMAIN LAYER                                   │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐          │
│  │  Models  │ │  Use     │ │Repository│ │ Domain   │          │
│  │ & Types  │ │  Cases   │ │Interfaces│ │ Events   │          │
│  └────┬─────┘ └────┬─────┘ └────┬─────┘ └────┬─────┘          │
├───────┼─────────────┼─────────────┼─────────────┼───────────────┤
│                    INFRASTRUCTURE LAYER                           │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐          │
│  │   API    │ │  Local   │ │  Sync    │ │ Platform │          │
│  │  Client  │ │ Storage  │ │  Engine  │ │ Services │          │
│  └──────────┘ └──────────┘ └──────────┘ └──────────┘          │
└─────────────────────────────────────────────────────────────────┘
```

### 5.2 Technology Stack

```yaml
Core Framework:
  Runtime: React Native 0.76+ (New Architecture)
  Framework: Expo SDK 52+
  Language: TypeScript 5.x (strict mode)
  
Navigation:
  Library: Expo Router (file-based routing)
  Pattern: Tab + Stack + Modal
  Deep Linking: Universal Links + App Links

State Management:
  Global State: Zustand (lightweight, TypeScript-native)
  Server State: TanStack Query v5 (caching, sync, optimistic updates)
  Form State: React Hook Form + Zod validation
  State Machines: XState v5 (complex flows)

UI & Design:
  Component Library: Custom design system (Adrine DS)
  Styling: Nativewind (Tailwind for RN) + Reanimated
  Animations: React Native Reanimated 3
  Gestures: React Native Gesture Handler
  Icons: Custom icon set + Phosphor Icons

Networking:
  HTTP Client: Axios with interceptors
  Realtime: WebSocket (native) + SSE for AI streaming
  GraphQL: Optional — REST-first with GraphQL for complex queries
  
Storage:
  Encrypted Store: expo-secure-store (credentials, tokens)
  Local DB: WatermelonDB (offline-first, syncing)
  Key-Value: MMKV (fast, synchronous)
  File Cache: expo-file-system

Native Modules:
  Camera: expo-camera
  Biometrics: expo-local-authentication
  Notifications: expo-notifications + FCM/APNs
  Health Data: react-native-health (iOS) / Health Connect (Android)
  Bluetooth: react-native-ble-plx (wearables)
  
Testing:
  Unit: Jest + Testing Library
  E2E: Detox or Maestro
  Visual: Storybook for React Native

Build & Deploy:
  CI/CD: EAS Build + EAS Submit
  OTA Updates: EAS Update (expo-updates)
  Code Push: For critical patches
```

### 5.3 Project Structure

```
adrine-patient-app/
├── app/                          # Expo Router file-based routes
│   ├── (auth)/                   # Auth group (login, signup, verify)
│   ├── (onboarding)/             # Onboarding flow
│   ├── (tabs)/                   # Main tab navigation
│   │   ├── home/                 # Home tab screens
│   │   ├── care/                 # Care tab screens
│   │   ├── records/              # Records tab screens
│   │   ├── family/               # Family tab screens
│   │   └── profile/              # Profile tab screens
│   ├── (modals)/                 # Modal routes
│   │   ├── ai-copilot.tsx
│   │   ├── appointment-book.tsx
│   │   ├── telemedicine.tsx
│   │   └── emergency.tsx
│   ├── _layout.tsx               # Root layout
│   └── +not-found.tsx
│
├── src/
│   ├── core/                     # Core infrastructure
│   │   ├── api/                  # API client, interceptors, types
│   │   ├── auth/                 # Auth state, token management
│   │   ├── config/               # App configuration
│   │   ├── events/               # Event bus, handlers
│   │   ├── navigation/           # Navigation utilities
│   │   ├── realtime/             # WebSocket, SSE clients
│   │   ├── storage/              # Storage abstraction layer
│   │   └── sync/                 # Sync engine
│   │
│   ├── modules/                  # Feature modules (pluggable)
│   │   ├── appointments/
│   │   │   ├── components/
│   │   │   ├── hooks/
│   │   │   ├── screens/
│   │   │   ├── services/
│   │   │   ├── stores/
│   │   │   ├── types/
│   │   │   └── index.ts
│   │   ├── records/
│   │   ├── medications/
│   │   ├── telemedicine/
│   │   ├── labs/
│   │   ├── pharmacy/
│   │   ├── payments/
│   │   ├── family/
│   │   ├── ai-copilot/
│   │   ├── notifications/
│   │   ├── emergency/
│   │   ├── health-metrics/
│   │   ├── insurance/
│   │   └── wearables/
│   │
│   ├── shared/                   # Shared utilities
│   │   ├── components/           # Shared UI components
│   │   ├── hooks/                # Shared hooks
│   │   ├── utils/                # Utility functions
│   │   ├── constants/            # App constants
│   │   └── types/                # Shared TypeScript types
│   │
│   ├── design-system/            # Adrine Design System
│   │   ├── tokens/               # Design tokens (colors, spacing, etc.)
│   │   ├── primitives/           # Base primitives (Box, Text, etc.)
│   │   ├── components/           # DS components
│   │   ├── patterns/             # Common UI patterns
│   │   ├── animations/           # Shared animations
│   │   └── theme/                # Theme provider & configuration
│   │
│   └── platform/                 # Platform-specific code
│       ├── ios/
│       ├── android/
│       └── shared/
│
├── assets/                       # Static assets
├── scripts/                      # Build & utility scripts
├── e2e/                          # E2E tests
└── .storybook/                   # Storybook config
```

### 5.4 Module Architecture Pattern

Each feature module follows this structure:

```typescript
// modules/appointments/index.ts
export { AppointmentModule } from './module';
export { useAppointments } from './hooks/useAppointments';
export type { Appointment, AppointmentSlot } from './types';

// modules/appointments/module.ts
import { ModuleDefinition } from '@core/modules';

export const AppointmentModule: ModuleDefinition = {
  id: 'appointments',
  version: '1.0.0',
  dependencies: ['auth', 'notifications'],
  featureFlags: ['appointments.enabled', 'appointments.telemedicine'],
  routes: [...],
  services: [...],
  stores: [...],
  initialize: async (context) => { ... },
  teardown: async () => { ... },
};
```

---

## 6. BACKEND INTEGRATION ARCHITECTURE

### 6.1 Integration Model

The Patient Super App communicates exclusively through the Adrine API Platform. It never directly connects to databases, internal services, or third-party systems.

```
┌─────────────────────┐
│   Patient App       │
└────────┬────────────┘
         │ HTTPS/WSS
         │
┌────────┴────────────────────────────────────────────┐
│              ADRINE API GATEWAY                       │
│  ┌─────────┐ ┌──────────┐ ┌──────────┐ ┌────────┐ │
│  │  Auth   │ │  Rate    │ │  Tenant  │ │ Route  │ │
│  │ Verify  │ │ Limiting │ │ Resolve  │ │ Match  │ │
│  └─────────┘ └──────────┘ └──────────┘ └────────┘ │
└────────┬────────────────────────────────────────────┘
         │
┌────────┴────────────────────────────────────────────┐
│              ADRINE SERVICE MESH                      │
│                                                      │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐            │
│  │ Patient  │ │Scheduling│ │  Records │            │
│  │ Service  │ │ Service  │ │  Service │            │
│  └──────────┘ └──────────┘ └──────────┘            │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐            │
│  │   Lab    │ │ Pharmacy │ │ Billing  │            │
│  │ Service  │ │ Service  │ │ Service  │            │
│  └──────────┘ └──────────┘ └──────────┘            │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐            │
│  │Notifica- │ │    AI    │ │ Workflow │            │
│  │  tion    │ │ Gateway  │ │  Engine  │            │
│  └──────────┘ └──────────┘ └──────────┘            │
└─────────────────────────────────────────────────────┘
```

### 6.2 Communication Patterns

| Pattern | Use Case | Implementation |
|---------|----------|----------------|
| REST | CRUD operations, queries | Axios + TanStack Query |
| WebSocket | Realtime updates, chat, status changes | Native WebSocket + reconnection |
| SSE | AI streaming responses | EventSource with token auth |
| Webhooks (received as push) | External event notifications | Push notifications triggered server-side |
| Polling (fallback) | When WS unavailable | TanStack Query refetch intervals |

### 6.3 API Client Architecture

```typescript
// core/api/client.ts
interface AdrineAPIClient {
  // Core configuration
  baseURL: string;
  tenantId: string;
  
  // Auth
  accessToken: string | null;
  refreshToken: string | null;
  
  // Interceptors
  requestInterceptors: RequestInterceptor[];
  responseInterceptors: ResponseInterceptor[];
  
  // Methods
  get<T>(path: string, options?: RequestOptions): Promise<T>;
  post<T>(path: string, body: unknown, options?: RequestOptions): Promise<T>;
  put<T>(path: string, body: unknown, options?: RequestOptions): Promise<T>;
  patch<T>(path: string, body: unknown, options?: RequestOptions): Promise<T>;
  delete<T>(path: string, options?: RequestOptions): Promise<T>;
  
  // Streaming
  stream(path: string, options?: StreamOptions): AsyncIterator<StreamChunk>;
  
  // Upload
  upload(path: string, file: FilePayload, options?: UploadOptions): Promise<UploadResult>;
}

// Request interceptor chain:
// 1. Attach access token
// 2. Attach tenant ID header
// 3. Attach device ID
// 4. Attach request tracing ID
// 5. Attach platform headers (OS, version, build)

// Response interceptor chain:
// 1. Token refresh on 401
// 2. Rate limit handling (429)
// 3. Error normalization
// 4. Response caching hints
// 5. Analytics event emission
```

### 6.4 Error Handling Strategy

```typescript
// Standardized error model from API
interface AdrineAPIError {
  code: string;              // Machine-readable: "APPOINTMENT_CONFLICT"
  message: string;           // Human-readable (localized)
  details?: Record<string, unknown>;
  retryable: boolean;
  retryAfter?: number;       // seconds
  userAction?: UserAction;   // Suggested UI action
}

// Error handling layers:
// Layer 1: API Client — retry, token refresh, network errors
// Layer 2: Service Layer — domain-specific error handling
// Layer 3: UI Layer — user-facing error messages and recovery actions
```

### 6.5 Multi-Tenant Request Flow

```
Every API request includes:
┌─────────────────────────────────────────┐
│ Headers:                                 │
│   Authorization: Bearer <access_token>   │
│   X-Adrine-Tenant: <tenant_id>          │
│   X-Adrine-Device: <device_id>          │
│   X-Adrine-Platform: ios|android         │
│   X-Adrine-App-Version: 1.2.3           │
│   X-Adrine-Request-Id: <uuid>           │
│   X-Adrine-Patient-Context: <patient_id>│ ← for family management
│   Accept-Language: en-IN                 │
└─────────────────────────────────────────┘
```

---

## 7. API INTEGRATION PLAN

### 7.1 API Domain Catalog

```yaml
Patient APIs:
  Base: /v1/patients
  Operations:
    - GET /v1/patients/me — Current patient profile
    - PUT /v1/patients/me — Update profile
    - GET /v1/patients/me/health-summary — Health overview
    - GET /v1/patients/me/timeline — Health timeline
    - POST /v1/patients/me/vitals — Log vitals
    - GET /v1/patients/me/emergency-card — Emergency info

Identity APIs:
  Base: /v1/identity
  Operations:
    - POST /v1/identity/verify-phone — Phone verification
    - POST /v1/identity/verify-aadhaar — Aadhaar verification
    - POST /v1/identity/abha/link — ABHA linking
    - GET /v1/identity/me — Identity profile

Family APIs:
  Base: /v1/family
  Operations:
    - GET /v1/family/members — List family members
    - POST /v1/family/members — Add member
    - PUT /v1/family/members/:id/permissions — Update permissions
    - POST /v1/family/members/:id/switch — Switch context
    - GET /v1/family/members/:id/health — Member health summary

Appointment APIs:
  Base: /v1/appointments
  Operations:
    - GET /v1/appointments — List appointments
    - POST /v1/appointments — Book appointment
    - GET /v1/appointments/:id — Get appointment detail
    - PUT /v1/appointments/:id/reschedule — Reschedule
    - POST /v1/appointments/:id/cancel — Cancel
    - GET /v1/appointments/slots — Available slots
    - POST /v1/appointments/:id/check-in — Digital check-in

Telemedicine APIs:
  Base: /v1/telemedicine
  Operations:
    - POST /v1/telemedicine/sessions — Create session
    - GET /v1/telemedicine/sessions/:id — Session details
    - POST /v1/telemedicine/sessions/:id/join — Join session
    - GET /v1/telemedicine/sessions/:id/token — Get video token
    - POST /v1/telemedicine/sessions/:id/end — End session

Records APIs:
  Base: /v1/records
  Operations:
    - GET /v1/records — List all records
    - GET /v1/records/:id — Get record
    - GET /v1/records/reports — Lab/diagnostic reports
    - GET /v1/records/prescriptions — Prescriptions
    - GET /v1/records/documents — Uploaded documents
    - POST /v1/records/documents — Upload document
    - GET /v1/records/summary — AI-generated summary

Lab APIs:
  Base: /v1/labs
  Operations:
    - GET /v1/labs/orders — Lab orders
    - GET /v1/labs/orders/:id — Order details
    - GET /v1/labs/orders/:id/results — Results
    - GET /v1/labs/centers — Nearby lab centers
    - POST /v1/labs/orders/:id/book-collection — Book sample collection

Pharmacy APIs:
  Base: /v1/pharmacy
  Operations:
    - GET /v1/pharmacy/prescriptions — Active prescriptions
    - POST /v1/pharmacy/orders — Place order
    - GET /v1/pharmacy/orders/:id — Order tracking
    - GET /v1/pharmacy/medications — Medication list
    - POST /v1/pharmacy/medications/:id/refill — Request refill
    - GET /v1/pharmacy/stores — Nearby pharmacies

Medication APIs:
  Base: /v1/medications
  Operations:
    - GET /v1/medications/active — Active medications
    - POST /v1/medications/adherence — Log adherence
    - GET /v1/medications/schedule — Daily schedule
    - GET /v1/medications/interactions — Check interactions
    - PUT /v1/medications/:id/reminder — Update reminder

Payment APIs:
  Base: /v1/payments
  Operations:
    - GET /v1/payments/bills — Outstanding bills
    - POST /v1/payments/initiate — Initiate payment
    - GET /v1/payments/:id/status — Payment status
    - GET /v1/payments/history — Payment history
    - GET /v1/payments/methods — Saved payment methods
    - POST /v1/payments/methods — Add payment method

Insurance APIs:
  Base: /v1/insurance
  Operations:
    - GET /v1/insurance/policies — Active policies
    - GET /v1/insurance/coverage/:procedureCode — Check coverage
    - POST /v1/insurance/claims — Submit claim
    - GET /v1/insurance/claims/:id — Claim status
    - POST /v1/insurance/pre-auth — Pre-authorization request

Notification APIs:
  Base: /v1/notifications
  Operations:
    - GET /v1/notifications — List notifications
    - PUT /v1/notifications/:id/read — Mark as read
    - PUT /v1/notifications/preferences — Update preferences
    - POST /v1/notifications/device — Register device token

AI APIs:
  Base: /v1/ai
  Operations:
    - POST /v1/ai/chat — Chat with AI copilot (streaming)
    - POST /v1/ai/interpret — Interpret lab results
    - GET /v1/ai/insights — Health insights
    - POST /v1/ai/summarize — Summarize records
    - GET /v1/ai/recommendations — Personalized recommendations
    - POST /v1/ai/triage — Symptom assessment

Workflow APIs:
  Base: /v1/workflows
  Operations:
    - GET /v1/workflows/active — Active workflows for patient
    - GET /v1/workflows/:id — Workflow state
    - POST /v1/workflows/:id/actions/:actionId — Execute action
    - GET /v1/workflows/:id/next-steps — What's next

Provider APIs:
  Base: /v1/providers
  Operations:
    - GET /v1/providers/search — Search providers
    - GET /v1/providers/:id — Provider profile
    - GET /v1/providers/:id/availability — Provider availability
    - GET /v1/providers/:id/reviews — Reviews

Health Metrics APIs:
  Base: /v1/health-metrics
  Operations:
    - POST /v1/health-metrics — Submit metrics batch
    - GET /v1/health-metrics/latest — Latest readings
    - GET /v1/health-metrics/trends — Trends over time
    - GET /v1/health-metrics/goals — Health goals
    - PUT /v1/health-metrics/goals — Update goals

Emergency APIs:
  Base: /v1/emergency
  Operations:
    - POST /v1/emergency/sos — Trigger SOS
    - GET /v1/emergency/card — Emergency medical card
    - PUT /v1/emergency/contacts — Update emergency contacts
    - GET /v1/emergency/nearby — Nearby emergency facilities
```

### 7.2 API Versioning Strategy

```yaml
Strategy: URL-based versioning (/v1/, /v2/)
Deprecation Policy:
  - Minimum 6 months deprecation notice
  - Sunset header in responses
  - App forced-update for breaking changes
  - Feature flags for gradual migration
```

### 7.3 Pagination & Filtering Convention

```typescript
// Standard pagination request
interface PaginatedRequest {
  cursor?: string;        // Cursor-based pagination (preferred)
  limit?: number;         // Default: 20, Max: 100
  sort?: string;          // Field to sort by
  order?: 'asc' | 'desc';
  filters?: Record<string, string | string[]>;
}

// Standard pagination response
interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    cursor: string | null;  // null = no more pages
    hasMore: boolean;
    total?: number;         // Optional total count
  };
}
```

---

## 8. AI INTEGRATION PLAN

### 8.1 AI Architecture Overview

```
┌─────────────────────────────────────────────────────────┐
│                   PATIENT APP                             │
│  ┌───────────────────────────────────────────────────┐  │
│  │              AI EXPERIENCE LAYER                    │  │
│  │  ┌─────────┐ ┌─────────┐ ┌─────────┐            │  │
│  │  │ Copilot │ │ Inline  │ │ Ambient │            │  │
│  │  │   Chat  │ │ Insights│ │  Nudges │            │  │
│  │  └─────────┘ └─────────┘ └─────────┘            │  │
│  └───────────────────────┬───────────────────────────┘  │
└──────────────────────────┼──────────────────────────────┘
                           │
┌──────────────────────────┼──────────────────────────────┐
│            ADRINE AI GATEWAY                             │
│  ┌───────────┐ ┌────────┴──┐ ┌───────────┐            │
│  │  Context  │ │   Router   │ │  Safety   │            │
│  │ Assembly  │ │ (Model Sel)│ │  Filters  │            │
│  └───────────┘ └────────────┘ └───────────┘            │
│  ┌───────────┐ ┌────────────┐ ┌───────────┐            │
│  │  RAG      │ │  Agent     │ │  Memory   │            │
│  │  Engine   │ │  Orchestr. │ │  Store    │            │
│  └───────────┘ └────────────┘ └───────────┘            │
└─────────────────────────────────────────────────────────┘
```

### 8.2 AI Interaction Modes

| Mode | Trigger | UI Pattern | Latency Target |
|------|---------|------------|----------------|
| **Copilot Chat** | User-initiated | Full-screen or sheet chat | Streaming < 200ms TTFT |
| **Inline Insights** | Content-triggered | Cards, badges, tooltips | < 500ms |
| **Ambient Nudges** | AI-initiated | Notifications, home feed | Async (not latency-critical) |
| **Contextual Actions** | User action | Suggestions inline | < 300ms |
| **Voice Interaction** | Voice trigger | Full-screen voice UI | < 500ms first response |

### 8.3 AI Use Cases by Domain

```yaml
Appointments:
  - "Find me the earliest available cardiologist"
  - Smart scheduling based on preferences and history
  - Pre-visit preparation summaries
  - Post-visit follow-up reminders

Records & Reports:
  - Lab result interpretation in plain language
  - Trend analysis across multiple reports
  - "What does my HbA1c of 7.2 mean?"
  - Document summarization
  - Record search by natural language

Medications:
  - Drug interaction warnings
  - Side effect explanations
  - "Why was this medication prescribed?"
  - Adherence pattern analysis
  - Refill predictions

Health Metrics:
  - Anomaly detection in vitals
  - Trend insights ("Your BP has improved 10% this month")
  - Goal recommendations
  - Correlation analysis (sleep vs. glucose)

Symptom Assessment:
  - Guided symptom checker
  - Urgency triage (self-care / telemedicine / ER)
  - Suggested specialties
  - Pre-consultation summaries for providers

General Health:
  - Personalized health education
  - Preventive care reminders
  - Lifestyle recommendations
  - Mental health check-ins
```

### 8.4 AI Streaming Architecture

```typescript
// AI chat streaming implementation
interface AIStreamConfig {
  endpoint: '/v1/ai/chat';
  method: 'POST';
  transport: 'SSE';  // Server-Sent Events for streaming
  
  request: {
    message: string;
    context: AIContext;
    conversationId?: string;
    mode: 'copilot' | 'interpret' | 'triage';
  };
  
  streamEvents: {
    'token': { content: string };           // Individual tokens
    'tool_call': { name: string; args: Record<string, unknown> };  // Function calling
    'tool_result': { name: string; result: unknown };
    'metadata': { sources: Source[]; confidence: number };
    'done': { fullResponse: string; usage: TokenUsage };
    'error': { code: string; message: string };
  };
}

// Context assembly for AI requests
interface AIContext {
  patientId: string;
  currentScreen: string;
  recentActions: Action[];
  relevantRecords?: string[];  // Record IDs for RAG
  healthSummary?: HealthSummary;
  conversationHistory?: Message[];
  locale: string;
  preferences: AIPreferences;
}
```

### 8.5 AI Safety & Guardrails

```yaml
Input Guardrails:
  - Content filtering for harmful content
  - PHI handling compliance
  - Scope limitation (healthcare domain only)
  - Prompt injection detection

Output Guardrails:
  - Medical disclaimer injection
  - Confidence scoring on all medical interpretations
  - Escalation triggers for concerning symptoms
  - No diagnosis statements (always "suggest consulting provider")
  - Citation of sources when interpreting results
  - Clear indication when AI vs. provider-generated content

Safety Boundaries:
  - Never prescribe medications
  - Never provide definitive diagnoses
  - Always recommend professional consultation for concerning findings
  - Emergency detection → immediate SOS flow suggestion
  - Suicide/self-harm detection → crisis resources + emergency contacts
```

---

## 9. PATIENT IDENTITY SYSTEM

### 9.1 Identity Model

```
┌─────────────────────────────────────────────────┐
│              ADRINE PATIENT IDENTITY              │
├─────────────────────────────────────────────────┤
│                                                  │
│  ┌────────────────────────────────────────────┐ │
│  │         CORE IDENTITY                       │ │
│  │  • Adrine Patient ID (UUID)                 │ │
│  │  • Phone Number (primary identifier)        │ │
│  │  • Email (optional secondary)               │ │
│  │  • Full Name, DOB, Gender                   │ │
│  │  • Profile Photo                            │ │
│  └────────────────────────────────────────────┘ │
│                                                  │
│  ┌────────────────────────────────────────────┐ │
│  │         VERIFIED IDENTIFIERS                │ │
│  │  • ABHA ID (Ayushman Bharat Health Account)│ │
│  │  • Aadhaar (KYC verified)                   │ │
│  │  • PAN (for insurance/billing)              │ │
│  │  • Passport (for international)             │ │
│  │  • Driving License                          │ │
│  └────────────────────────────────────────────┘ │
│                                                  │
│  ┌────────────────────────────────────────────┐ │
│  │         PROVIDER IDENTITIES                 │ │
│  │  • Hospital A MRN: MRN-12345               │ │
│  │  • Hospital B MRN: PAT-67890               │ │
│  │  • Lab C Patient ID: LC-11111              │ │
│  │  • Pharmacy D ID: PH-22222                 │ │
│  └────────────────────────────────────────────┘ │
│                                                  │
│  ┌────────────────────────────────────────────┐ │
│  │         DEVICE IDENTITIES                   │ │
│  │  • Device 1: iPhone (trusted, biometric)    │ │
│  │  • Device 2: Android (trusted)              │ │
│  │  • Device 3: iPad (family, limited)         │ │
│  └────────────────────────────────────────────┘ │
│                                                  │
└─────────────────────────────────────────────────┘
```

### 9.2 Identity Lifecycle

```
┌──────────┐    ┌──────────┐    ┌──────────┐    ┌──────────┐
│  Phone   │───→│  Basic   │───→│ Verified │───→│   Full   │
│  Verify  │    │ Profile  │    │ Identity │    │ Identity │
└──────────┘    └──────────┘    └──────────┘    └──────────┘
     │               │               │               │
   OTP +          Name +         Aadhaar/        ABHA +
  Device          DOB +          ABHA +          Provider
  Trust          Gender        Insurance         MRN Links
```

### 9.3 Identity Resolution

```yaml
Resolution Strategy:
  When a patient visits a new provider on the Adrine platform:
    1. Phone number match → suggest identity linking
    2. ABHA ID match → automatic record association
    3. Demographic match → fuzzy matching with confirmation
    4. Manual link → patient confirms identity at provider

Cross-Tenant Identity:
  - Single Adrine Patient ID across all tenants
  - Tenant-specific MRNs mapped to central ID
  - Patient controls which records are visible to which tenant
  - Consent-based record sharing across organizations
```

### 9.4 Identity Data Security

```yaml
Storage:
  - Core identity: Encrypted at rest in Adrine Identity Service
  - Aadhaar: Tokenized, never stored in plain text
  - Biometric templates: On-device only, never transmitted
  - Device credentials: Secure Enclave / Keystore

Access:
  - Identity data accessible only with valid session + consent
  - Provider access requires active care relationship
  - Family access requires explicit delegation
  - Emergency access with break-glass audit trail
```

---

## 10. FAMILY/CAREGIVER ARCHITECTURE

### 10.1 Family Graph Model

```
              ┌──────────────┐
              │   PRIMARY     │
              │   ACCOUNT     │
              │   (Rajesh)    │
              └──────┬───────┘
                     │
         ┌───────────┼───────────┐
         │           │           │
    ┌────┴────┐ ┌───┴────┐ ┌───┴────┐
    │ Parent  │ │  Child │ │  Child │
    │(Father) │ │ (Son)  │ │(Daugh) │
    │  75 yrs │ │  8 yrs │ │ 12 yrs │
    └────┬────┘ └────────┘ └────────┘
         │
    ┌────┴────┐
    │Caregiver│ ← Nurse assigned to Father
    │ (Nurse) │
    └─────────┘
```

### 10.2 Role & Permission Model

```typescript
interface FamilyMember {
  id: string;
  patientId: string;       // Their Adrine Patient ID
  relationship: Relationship;
  role: FamilyRole;
  permissions: Permission[];
  status: 'active' | 'pending' | 'revoked';
  addedAt: DateTime;
  consentType: ConsentType;
}

enum FamilyRole {
  PRIMARY_OWNER = 'primary_owner',    // Full control
  GUARDIAN = 'guardian',               // Full access (legal)
  CAREGIVER = 'caregiver',           // Delegated access
  FAMILY_MEMBER = 'family_member',    // View + limited actions
  EMERGENCY_CONTACT = 'emergency_contact', // Emergency-only
}

enum Permission {
  VIEW_RECORDS = 'view_records',
  VIEW_APPOINTMENTS = 'view_appointments',
  BOOK_APPOINTMENTS = 'book_appointments',
  MANAGE_MEDICATIONS = 'manage_medications',
  VIEW_BILLS = 'view_bills',
  MAKE_PAYMENTS = 'make_payments',
  RECEIVE_NOTIFICATIONS = 'receive_notifications',
  MANAGE_EMERGENCY_INFO = 'manage_emergency_info',
  UPLOAD_DOCUMENTS = 'upload_documents',
  COMMUNICATE_PROVIDERS = 'communicate_providers',
  MANAGE_INSURANCE = 'manage_insurance',
  VIEW_AI_INSIGHTS = 'view_ai_insights',
  FULL_ACCESS = 'full_access',
}

type Relationship = 
  | 'self' | 'spouse' | 'parent' | 'child' 
  | 'sibling' | 'grandparent' | 'grandchild'
  | 'in-law' | 'professional_caregiver' | 'other';
```

### 10.3 Context Switching

```yaml
Context Switch UX:
  - Profile avatar tap in top-left shows family member list
  - Quick switch without re-authentication
  - Visual indicator always showing "managing for: [Name]"
  - Color/theme subtle shift per managed member (optional)
  - All actions scoped to current context

Context Switch Security:
  - Biometric re-verification for sensitive actions on others' profiles
  - Audit trail for all actions performed on behalf of others
  - Permission check on every API call with patient context header
  - Automatic context reset after inactivity timeout
```

### 10.4 Minor/Dependent Management

```yaml
Minors (< 18):
  - Guardian has full access by default
  - No independent app access for minors
  - Health records managed entirely by guardian
  - Vaccination & growth tracking specialized UI
  - School health form generation
  - Pediatric care workflow integration

Elderly/Incapacitated:
  - Legal guardian documentation required
  - Power of Attorney upload for verification
  - Multiple caregiver coordination
  - Simplified health monitoring view
  - Alert routing to all designated caregivers
  - Professional caregiver time-bounded access
```

---

## 11. HEALTHCARE RECORDS ARCHITECTURE

### 11.1 Records Data Model

```
┌─────────────────────────────────────────────────────────┐
│              PATIENT HEALTH RECORD VAULT                  │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  ┌─────────────────────────────────────────────────┐    │
│  │ CLINICAL RECORDS                                 │    │
│  │  • Consultation Notes                            │    │
│  │  • Discharge Summaries                           │    │
│  │  • Operative Notes                               │    │
│  │  • Clinical Letters                              │    │
│  └─────────────────────────────────────────────────┘    │
│                                                          │
│  ┌─────────────────────────────────────────────────┐    │
│  │ DIAGNOSTIC RECORDS                               │    │
│  │  • Lab Reports (Blood, Urine, etc.)             │    │
│  │  • Imaging Reports (X-ray, MRI, CT, USG)        │    │
│  │  • Pathology Reports                             │    │
│  │  • ECG/EEG/EMG Reports                          │    │
│  └─────────────────────────────────────────────────┘    │
│                                                          │
│  ┌─────────────────────────────────────────────────┐    │
│  │ PRESCRIPTIONS & ORDERS                           │    │
│  │  • Medication Prescriptions                      │    │
│  │  • Lab Orders                                    │    │
│  │  • Imaging Orders                                │    │
│  │  • Referral Letters                              │    │
│  └─────────────────────────────────────────────────┘    │
│                                                          │
│  ┌─────────────────────────────────────────────────┐    │
│  │ PATIENT-UPLOADED DOCUMENTS                       │    │
│  │  • Scanned old records                           │    │
│  │  • External reports (from non-Adrine providers)  │    │
│  │  • Insurance documents                           │    │
│  │  • Identity documents                            │    │
│  └─────────────────────────────────────────────────┘    │
│                                                          │
│  ┌─────────────────────────────────────────────────┐    │
│  │ HEALTH METRICS & OBSERVATIONS                    │    │
│  │  • Vitals (BP, Sugar, Temperature, Weight, etc.) │    │
│  │  • Wearable data (Steps, HR, SpO2, Sleep)        │    │
│  │  • Self-reported symptoms                         │    │
│  │  • Mental health scores                           │    │
│  └─────────────────────────────────────────────────┘    │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

### 11.2 Records Source & Flow

```yaml
Sources:
  Platform-Generated:
    - Created by providers using Adrine platform
    - Automatically linked to patient record
    - Structured data (FHIR-compatible)
    - Real-time availability

  Lab/LIMS Integration:
    - Results pushed from connected labs
    - Parsed into structured format + original PDF
    - AI interpretation generated on arrival
    - Patient notified immediately

  External Upload:
    - Patient uploads photos/PDFs of external records
    - AI-assisted OCR and categorization
    - Manual tagging and organization
    - Optional: AI extraction of structured data

  Wearable/Device:
    - Continuous data from connected devices
    - Aggregated into meaningful metrics
    - Anomaly detection
    - Trend computation
```

### 11.3 FHIR Compatibility Layer

```yaml
FHIR Resources Mapped:
  - Patient → Adrine Patient Profile
  - Encounter → Appointments/Visits
  - Observation → Health Metrics
  - DiagnosticReport → Lab/Imaging Reports
  - MedicationRequest → Prescriptions
  - Condition → Diagnosed Conditions
  - AllergyIntolerance → Allergies
  - Immunization → Vaccination Records
  - DocumentReference → Uploaded Documents

ABDM/ABHA Integration:
  - Health Information Exchange (HIE)
  - Consent-based record pull from other providers
  - Record push to ABHA health locker
  - PHR address linking
```

### 11.4 Records Access Control

```yaml
Access Levels:
  FULL: Patient themselves, legal guardian
  CLINICAL: Treating providers (active care relationship)
  LIMITED: Family members (per permission grants)
  EMERGENCY: Emergency responders (break-glass)
  RESEARCH: De-identified, consent-based

Consent Management:
  - Granular consent per provider per record type
  - Time-bounded access grants
  - Revocable at any time
  - Audit trail for all access
  - ABDM consent artifact integration
```

---

## 12. APPOINTMENT & SCHEDULING SYSTEM

### 12.1 Appointment Lifecycle

```
┌──────────┐    ┌──────────┐    ┌──────────┐    ┌──────────┐
│  Search  │───→│   Book   │───→│  Confirm │───→│ Pre-Visit│
│ Provider │    │   Slot   │    │ & Pay    │    │  Prep    │
└──────────┘    └──────────┘    └──────────┘    └──────────┘
                                                      │
┌──────────┐    ┌──────────┐    ┌──────────┐    ┌────┴─────┐
│  Post-   │←──│  Visit   │←──│  Check   │←──│  Arrive  │
│  Visit   │    │(In-Person│    │   In     │    │  & Wait  │
│  Follow  │    │ or Tele) │    │(Digital) │    │          │
└──────────┘    └──────────┘    └──────────┘    └──────────┘
```

### 12.2 Booking Engine Architecture

```yaml
Slot Discovery:
  - Provider availability from Adrine Scheduling Engine
  - Real-time slot status (available, held, booked)
  - Smart filtering: specialty, location, insurance, time preference
  - AI-recommended providers based on history
  - Wait time estimates

Booking Flow:
  1. Select provider / specialty / facility
  2. View available slots (date → time picker)
  3. Select appointment type (new/follow-up, in-person/tele)
  4. Confirm patient details (self or family member)
  5. Pre-authorization check (if insured)
  6. Payment (if applicable — advance/consultation fee)
  7. Confirmation + calendar event

Smart Scheduling:
  - AI suggests optimal appointment times
  - Considers: patient preferences, provider availability, urgency
  - Combines related appointments (lab before consultation)
  - Buffer time recommendations for travel
  - Recurring appointment patterns for chronic care
```

### 12.3 Appointment Types

| Type | Flow | Requirements |
|------|------|--------------|
| In-Person New | Full booking flow | Provider + Time + Payment |
| In-Person Follow-up | Simplified (same provider) | Time only |
| Telemedicine | Digital-only setup | Device check + Time |
| Home Visit | Extended with address | Address + Time + Provider |
| Lab Visit | Walk-in or scheduled | Lab center + Optional time |
| Emergency | Immediate | Skip all — direct routing |
| Procedure | Multi-step with prep | Consent + Pre-auth + Prep instructions |

### 12.4 Pre-Visit & Check-In

```yaml
Pre-Visit (24-48 hours before):
  - Reminder notification
  - Pre-visit questionnaire (AI-generated based on visit type)
  - Insurance verification check
  - Directions to facility
  - What to bring / how to prepare
  - Previous visit summary for context

Digital Check-In (At facility):
  - QR code scan or geofence trigger
  - Queue position notification
  - Estimated wait time
  - Vital signs self-logging (if kiosk integration)
  - Real-time queue updates
```

### 12.5 Post-Visit Flow

```yaml
Post-Visit (Automated):
  - Visit summary pushed from provider
  - Prescription(s) available digitally
  - Lab orders ready for scheduling
  - Follow-up appointment suggestion
  - Feedback/rating request
  - Payment settlement (if balance)
  - AI-generated visit explanation
```

---

## 13. TELEMEDICINE ARCHITECTURE

### 13.1 Telemedicine System Design

```
┌─────────────────────────────────────────────────────────┐
│                TELEMEDICINE MODULE                        │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  ┌─────────────────────────────────────────────────┐    │
│  │  PRE-SESSION                                     │    │
│  │  • Device/network check                          │    │
│  │  • Camera/mic permission                         │    │
│  │  • Pre-visit questionnaire                       │    │
│  │  • Waiting room UI                               │    │
│  └─────────────────────────────────────────────────┘    │
│                                                          │
│  ┌─────────────────────────────────────────────────┐    │
│  │  IN-SESSION                                      │    │
│  │  • Video/Audio call (WebRTC via platform)        │    │
│  │  • Screen sharing (provider → patient)           │    │
│  │  • Document sharing during call                  │    │
│  │  • Chat alongside video                          │    │
│  │  • Vital signs input during consultation         │    │
│  │  • AI real-time transcription (optional)         │    │
│  └─────────────────────────────────────────────────┘    │
│                                                          │
│  ┌─────────────────────────────────────────────────┐    │
│  │  POST-SESSION                                    │    │
│  │  • Visit summary (AI + provider generated)       │    │
│  │  • Prescription delivery                         │    │
│  │  • Lab orders                                    │    │
│  │  • Follow-up scheduling                          │    │
│  │  • Payment processing                            │    │
│  │  • Feedback collection                           │    │
│  └─────────────────────────────────────────────────┘    │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

### 13.2 Technical Implementation

```yaml
Video Infrastructure:
  Provider: Adrine Telemedicine Service (wraps WebRTC)
  Signaling: WebSocket-based signaling server
  TURN/STUN: Platform-managed relay servers
  Quality: Adaptive bitrate based on network conditions
  Fallback: Audio-only mode for poor connectivity
  Recording: Optional with consent (provider-initiated)

Client Implementation:
  Library: react-native-webrtc or Twilio/Agora SDK
  UI: Custom overlay with controls
  Picture-in-Picture: Supported for multitasking
  Background: Audio continues when app backgrounded
  Reconnection: Automatic retry on network drops

Network Requirements:
  Minimum: 500kbps up/down for video
  Recommended: 1.5Mbps up/down
  Pre-check: Network quality test before session
  Adaptation: Resolution/framerate auto-adjustment
```

### 13.3 Telemedicine Modes

| Mode | Use Case | Requirements |
|------|----------|-------------|
| Video Consultation | Standard telemedicine visit | Camera + Mic + 1Mbps |
| Audio-Only | Poor connectivity / preference | Mic + 256kbps |
| Chat Consultation | Async text-based | Text only |
| Second Opinion | Async with documents | Documents + Text |
| Follow-up Call | Quick check-in | Audio preferred |

---

## 14. REPORTS & DOCUMENTS SYSTEM

### 14.1 Document Architecture

```yaml
Document Types:
  Lab Reports:
    Format: Structured data + PDF
    Source: LIMS integration or upload
    Features: 
      - Parameter-level parsing
      - Normal/abnormal flagging
      - Trend tracking across reports
      - AI interpretation
      
  Imaging Reports:
    Format: Report text + DICOM viewer link
    Source: RIS/PACS integration or upload
    Features:
      - Report + Images together
      - AI-highlighted findings
      
  Prescriptions:
    Format: Structured medication list + PDF
    Source: Provider via platform
    Features:
      - Active medication extraction
      - Pharmacy ordering integration
      - Dosage reminders setup
      
  Discharge Summaries:
    Format: Structured sections + PDF
    Source: Hospital via platform
    Features:
      - Follow-up action extraction
      - Medication reconciliation
      - Recovery milestone tracking

  Patient Uploads:
    Format: Image/PDF (any medical document)
    Processing:
      - OCR text extraction
      - AI categorization (type, date, provider)
      - Metadata tagging
      - Optional manual correction
```

### 14.2 Document Processing Pipeline

```
┌──────────┐    ┌──────────┐    ┌──────────┐    ┌──────────┐
│  Receive │───→│  Parse   │───→│ Enrich   │───→│  Store   │
│ (Upload/ │    │ (OCR/    │    │(AI meta, │    │(Encrypted│
│  Push)   │    │ Struct)  │    │ classify)│    │ + Index) │
└──────────┘    └──────────┘    └──────────┘    └──────────┘
                                                      │
                                                ┌─────┴─────┐
                                                │  Deliver  │
                                                │(Notify +  │
                                                │ Display)  │
                                                └───────────┘
```

### 14.3 Report Viewing Experience

```yaml
Lab Report View:
  Layout:
    - Header: Lab name, date, ordering doctor
    - Summary: AI one-line interpretation
    - Parameters: 
      - Name | Value | Unit | Reference Range | Status (Normal/High/Low)
      - Trend sparkline if historical data exists
    - AI Insights: Detailed plain-language explanation
    - Actions: Share, Download PDF, Ask AI, Reorder Test
    
  Interactions:
    - Tap parameter → trend chart over time
    - Tap AI insight → detailed explanation
    - Long-press → copy value
    - Swipe between reports chronologically
```

---

## 15. NOTIFICATION & REMINDER SYSTEM

### 15.1 Notification Architecture

```
┌─────────────────────────────────────────────────────────┐
│              ADRINE NOTIFICATION INFRASTRUCTURE           │
│                                                          │
│  ┌─────────────────────────────────────────────────┐    │
│  │  EVENT BUS → NOTIFICATION ENGINE → DELIVERY     │    │
│  └─────────────────────────────────────────────────┘    │
│           │                              │               │
│    ┌──────┴──────┐              ┌───────┴────────┐      │
│    │   Events    │              │   Channels     │      │
│    │             │              │                │      │
│    │• Appt booked│              │• Push (FCM/APNs)│     │
│    │• Lab ready  │              │• In-App        │      │
│    │• Med due    │              │• SMS           │      │
│    │• Bill gen   │              │• Email         │      │
│    │• AI insight │              │• WhatsApp      │      │
│    │• Workflow   │              │                │      │
│    └─────────────┘              └────────────────┘      │
└─────────────────────────────────────────────────────────┘
```

### 15.2 Notification Categories

| Category | Priority | Channels | Examples |
|----------|----------|----------|----------|
| **Critical** | Immediate | Push + In-App + SMS | Emergency alerts, critical lab results |
| **Actionable** | High | Push + In-App | Appointment reminders, medication due |
| **Informational** | Medium | In-App + Optional Push | Lab results ready, bill generated |
| **Engagement** | Low | In-App only | Health tips, AI insights, streaks |
| **Administrative** | Low | In-App + Email | Policy updates, consent requests |

### 15.3 Smart Reminder System

```yaml
Medication Reminders:
  - Time-based (scheduled per prescription)
  - Adaptive: learns actual take time, adjusts
  - Escalation: missed → remind 15min later → alert caregiver
  - Smart: suppresses if already marked as taken
  - Contextual: considers timezone changes, sleep patterns

Appointment Reminders:
  - T-24h: Preparation reminder
  - T-2h: Travel/readiness reminder
  - T-15m: Final reminder with join/directions
  - Smart: adjusts based on appointment type

Health Monitoring:
  - Scheduled vitals logging prompts
  - Adaptive frequency based on condition severity
  - Streak maintenance nudges
  - Anomaly-triggered increase in monitoring

Preventive Care:
  - Annual checkup due
  - Vaccination schedules
  - Screening recommendations (age/gender-based)
  - Follow-up appointment due
```

### 15.4 Notification Preferences Architecture

```typescript
interface NotificationPreferences {
  globalEnabled: boolean;
  quietHours: { start: string; end: string }; // "22:00" - "07:00"
  channels: {
    push: boolean;
    sms: boolean;
    email: boolean;
    whatsapp: boolean;
  };
  categories: {
    [category: string]: {
      enabled: boolean;
      channels: string[];
      frequency?: 'immediate' | 'digest' | 'daily';
    };
  };
  perMember: {
    [memberId: string]: {
      receiveAlerts: boolean;
      categories: string[];
    };
  };
}
```

---

## 16. PAYMENT & BILLING SYSTEM

### 16.1 Payment Architecture

```
┌─────────────────────────────────────────────────────────┐
│              PAYMENT MODULE ARCHITECTURE                  │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  ┌───────────────┐  ┌──────────────┐  ┌─────────────┐ │
│  │  Bill/Invoice │  │   Payment    │  │   Payment   │ │
│  │   Discovery   │  │    Flow      │  │   History   │ │
│  └───────┬───────┘  └──────┬───────┘  └─────────────┘ │
│          │                  │                            │
│  ┌───────┴──────────────────┴─────────────────────────┐ │
│  │              PAYMENT GATEWAY                        │ │
│  │  • UPI (GPay, PhonePe, Paytm)                     │ │
│  │  • Cards (Credit/Debit)                            │ │
│  │  • Net Banking                                     │ │
│  │  • Wallets                                         │ │
│  │  • Insurance Direct Settlement                     │ │
│  │  • EMI / Pay Later                                 │ │
│  └────────────────────────────────────────────────────┘ │
│                                                          │
│  ┌────────────────────────────────────────────────────┐ │
│  │  BILLING INTEGRATION                               │ │
│  │  • Hospital billing system                         │ │
│  │  • Lab billing                                     │ │
│  │  • Pharmacy billing                                │ │
│  │  • Consultation fees                               │ │
│  │  • Insurance co-pay calculation                    │ │
│  │  • Split billing (insurance + patient)             │ │
│  └────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────┘
```

### 16.2 Payment Flows

```yaml
Appointment Payment:
  1. Consultation fee presented at booking
  2. Insurance coverage check (if insured)
  3. Co-pay calculated automatically
  4. Payment collected (full or co-pay)
  5. Receipt generated instantly
  6. Linked to appointment record

Bill Payment:
  1. Bill pushed from provider billing system
  2. Patient notified of outstanding bill
  3. Bill breakdown view (itemized)
  4. Insurance settlement shown (if applicable)
  5. Patient portion highlighted
  6. One-tap payment
  7. Auto-receipt + transaction record

Pharmacy Payment:
  1. Order total calculated
  2. Insurance/discount applied
  3. Payment at ordering or delivery
  4. Split: medication cost + delivery fee
  
Subscription/Package:
  1. Health packages (annual checkup, chronic care plans)
  2. Recurring payment support
  3. EMI options for expensive treatments
```

### 16.3 Insurance Integration

```yaml
Coverage Check Flow:
  1. Patient selects insurance policy (stored in profile)
  2. At booking/billing, system checks coverage
  3. Real-time pre-authorization where required
  4. Coverage percentage / co-pay displayed
  5. Direct settlement between provider and insurer
  6. Patient pays only their portion

Claims Flow:
  1. Cashless: Direct settlement (pre-authorized)
  2. Reimbursement: 
     - Auto-generate claim form from visit data
     - Attach required documents automatically
     - Submit digitally through platform
     - Track claim status in app
     - Receive settlement notification

Policy Management:
  - Store multiple policies (self + family)
  - Policy expiry reminders
  - Coverage utilization tracking
  - Network provider filtering
```

---

## 17. PHARMACY & MEDICATION SYSTEM

### 17.1 Pharmacy Module Architecture

```yaml
Prescription to Delivery Flow:
  1. Provider issues prescription digitally
  2. Patient receives notification
  3. View prescription details
  4. Choose: Home delivery or Store pickup
  5. If delivery: 
     - Select pharmacy (or auto-assigned)
     - Confirm address
     - View price + availability
     - Pay
     - Track delivery
  6. If pickup:
     - Find nearest pharmacy with stock
     - Reserve medications
     - Navigate to store
     - Show pickup code
     - Confirm collection

Medication Management:
  Active Medications:
    - Name, dosage, frequency, duration
    - Prescribing doctor
    - Start/end dates
    - Remaining doses
    - Refill status
    - Interaction warnings
    
  Adherence Tracking:
    - Daily medication schedule view
    - One-tap "taken" confirmation
    - Missed dose tracking
    - Adherence percentage over time
    - Provider visibility (with consent)
    
  Refill Management:
    - Predictive refill alerts (running low)
    - One-tap reorder from same prescription
    - Prescription validity check
    - Auto-refill option for recurring medications
```

### 17.2 Medication Safety

```yaml
Safety Features:
  - Drug-drug interaction checking (AI-powered)
  - Allergy cross-reference
  - Duplicate therapy detection
  - Dosage validation
  - Contraindication alerts
  - Food/timing interactions
  - Pregnancy/lactation warnings
  
Implementation:
  - AI Gateway queries drug interaction database
  - Alerts surfaced at prescription receipt and pharmacy ordering
  - Critical interactions block ordering with provider consultation required
  - Non-critical shown as informational warnings
```

---

## 18. WEARABLE/DEVICE INTEGRATION STRATEGY

### 18.1 Integration Architecture

```
┌─────────────────────────────────────────────────────────┐
│              DEVICE INTEGRATION LAYER                     │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  ┌─────────────────────┐  ┌──────────────────────────┐ │
│  │  PLATFORM HEALTH    │  │  DIRECT BLE DEVICES     │ │
│  │  AGGREGATORS        │  │                          │ │
│  │                     │  │  • BP Monitors           │ │
│  │  • Apple HealthKit  │  │  • Glucometers           │ │
│  │  • Google Health    │  │  • Pulse Oximeters       │ │
│  │    Connect          │  │  • Smart Scales          │ │
│  │  • Samsung Health   │  │  • Thermometers          │ │
│  │                     │  │  • CGMs                  │ │
│  └─────────┬───────────┘  └──────────┬───────────────┘ │
│            │                          │                  │
│  ┌─────────┴──────────────────────────┴───────────────┐ │
│  │         DEVICE DATA NORMALIZATION LAYER             │ │
│  │  • Unit conversion                                  │ │
│  │  • Timestamp normalization                          │ │
│  │  • Data quality filtering                           │ │
│  │  • Duplicate detection                              │ │
│  │  • Aggregation (min, max, avg per period)          │ │
│  └─────────────────────────┬──────────────────────────┘ │
│                            │                             │
│  ┌─────────────────────────┴──────────────────────────┐ │
│  │         HEALTH METRICS STORE                        │ │
│  │  → Local (WatermelonDB) + Sync to Platform          │ │
│  └────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────┘
```

### 18.2 Supported Data Types

| Data Type | Source | Frequency | Clinical Relevance |
|-----------|--------|-----------|-------------------|
| Heart Rate | Wearable/HealthKit | Continuous | Resting HR trends, anomalies |
| Blood Pressure | BLE BP Monitor | 1-3x daily | Hypertension management |
| Blood Glucose | BLE Glucometer/CGM | 1-7x daily | Diabetes management |
| SpO2 | Wearable/Oximeter | Periodic | Respiratory monitoring |
| Steps | Wearable/Phone | Continuous | Activity levels |
| Sleep | Wearable | Nightly | Sleep quality |
| Weight | Smart Scale | Weekly | Weight management |
| Temperature | Thermometer | Event-driven | Fever monitoring |
| ECG | Apple Watch/Device | Event-driven | Arrhythmia detection |

### 18.3 Device Pairing & Management

```yaml
Pairing Flow:
  1. Navigate to Settings → Connected Devices
  2. Select device type or scan for BLE devices
  3. Follow device-specific pairing flow
  4. Grant permissions (HealthKit/Health Connect)
  5. Initial sync of historical data
  6. Configure sync preferences (frequency, data types)
  7. Test reading to confirm connection

Management:
  - View all connected devices
  - Last sync time per device
  - Battery status (if available)
  - Data quality indicators
  - Manual sync trigger
  - Remove/re-pair device
```

---

## 19. AI ASSISTANT ARCHITECTURE

### 19.1 Copilot System Design

```
┌─────────────────────────────────────────────────────────┐
│              AI COPILOT ARCHITECTURE                      │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  ┌─────────────────────────────────────────────────┐    │
│  │  USER INTERFACE LAYER                            │    │
│  │                                                  │    │
│  │  ┌─────────┐ ┌─────────┐ ┌─────────────────┐   │    │
│  │  │  Chat   │ │  Voice  │ │  Quick Actions  │   │    │
│  │  │Interface│ │Interface│ │  (Suggestions)  │   │    │
│  │  └─────────┘ └─────────┘ └─────────────────┘   │    │
│  └─────────────────────────────────────────────────┘    │
│                                                          │
│  ┌─────────────────────────────────────────────────┐    │
│  │  CONVERSATION LAYER                              │    │
│  │                                                  │    │
│  │  • Conversation state management                 │    │
│  │  • Context window management                     │    │
│  │  • Multi-turn memory                             │    │
│  │  • Intent classification                         │    │
│  │  • Entity extraction                             │    │
│  └─────────────────────────────────────────────────┘    │
│                                                          │
│  ┌─────────────────────────────────────────────────┐    │
│  │  ACTION LAYER (Tool Use)                         │    │
│  │                                                  │    │
│  │  ┌──────────────┐  ┌──────────────────────────┐ │    │
│  │  │  Read Tools  │  │    Write Tools           │ │    │
│  │  │              │  │                          │ │    │
│  │  │• Get records │  │• Book appointment        │ │    │
│  │  │• Get schedule│  │• Order medication        │ │    │
│  │  │• Get metrics │  │• Log vitals              │ │    │
│  │  │• Search docs │  │• Set reminders           │ │    │
│  │  │• Get insights│  │• Cancel appointment      │ │    │
│  │  └──────────────┘  └──────────────────────────┘ │    │
│  └─────────────────────────────────────────────────┘    │
│                                                          │
│  ┌─────────────────────────────────────────────────┐    │
│  │  KNOWLEDGE LAYER                                 │    │
│  │                                                  │    │
│  │  • Patient health record (RAG)                   │    │
│  │  • Medical knowledge base                        │    │
│  │  • Drug database                                 │    │
│  │  • Provider network                              │    │
│  │  • Insurance/coverage data                       │    │
│  │  • Platform capabilities                         │    │
│  └─────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────┘
```

### 19.2 Copilot Capabilities

```yaml
Tier 1 — Information & Explanation:
  - "What does my HbA1c result mean?"
  - "Show me my blood pressure trend"
  - "When is my next appointment?"
  - "What medications am I taking?"
  - "Explain my discharge summary"

Tier 2 — Actions & Automation:
  - "Book me an appointment with Dr. Shah this week"
  - "Reorder my diabetes medication"
  - "Cancel tomorrow's appointment"
  - "Set a reminder to check my BP at 8 AM"
  - "Share my lab reports with Dr. Patel"

Tier 3 — Analysis & Insights:
  - "How has my diabetes control been this quarter?"
  - "Am I taking any conflicting medications?"
  - "What should I prepare for my upcoming surgery?"
  - "Analyze my sleep patterns"
  - "What preventive screenings am I due for?"

Tier 4 — Guidance & Triage:
  - "I'm having chest pain, what should I do?"
  - "My blood sugar is 350, is this an emergency?"
  - "I've been feeling anxious lately"
  - "Should I see a doctor for this rash?"
```

### 19.3 AI Conversation State Management

```typescript
interface CopilotState {
  conversationId: string;
  messages: Message[];
  context: {
    currentScreen: string;
    activePatient: string;
    recentInteractions: Interaction[];
    pendingActions: PendingAction[];
  };
  mode: 'chat' | 'voice' | 'action';
  capabilities: string[];  // Available tools based on permissions
  safetyState: {
    emergencyDetected: boolean;
    escalationRequired: boolean;
    disclaimerShown: boolean;
  };
}

// Conversation persistence
// - Active conversations stored locally
// - Synced to platform for continuity across devices
// - Auto-summarized after 24h inactivity
// - Retrievable for context in future conversations
```

---

## 20. WORKFLOW INTEGRATION STRATEGY

### 20.1 Workflow Engine Integration

The Adrine Workflow Engine orchestrates complex multi-step healthcare processes. The Patient App renders workflow states and collects patient actions.

```
┌─────────────────────────────────────────────────────────┐
│              WORKFLOW ARCHITECTURE                        │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  ADRINE WORKFLOW ENGINE (Server-side)                    │
│  ┌─────────────────────────────────────────────────┐    │
│  │  • Workflow definitions (BPMN-like)              │    │
│  │  • State machine execution                       │    │
│  │  • Event triggers                                │    │
│  │  • Timer-based transitions                       │    │
│  │  • Conditional branching                         │    │
│  │  • Human task assignment                         │    │
│  │  • Integration tasks (API calls)                 │    │
│  └─────────────────────────────────────────────────┘    │
│                                                          │
│  PATIENT APP (Workflow Renderer)                         │
│  ┌─────────────────────────────────────────────────┐    │
│  │  • Active workflow cards on home screen           │    │
│  │  • Step-by-step progress visualization           │    │
│  │  • Action prompts (patient's turn)               │    │
│  │  • Status updates (waiting for others)           │    │
│  │  • Document collection (upload as needed)        │    │
│  │  • Form filling (questionnaires, consent)        │    │
│  │  • Decision points (choose option A or B)        │    │
│  └─────────────────────────────────────────────────┘    │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

### 20.2 Common Healthcare Workflows

```yaml
Surgery Workflow:
  Steps:
    1. Referral received → patient notified
    2. Pre-surgical consultation → book appointment
    3. Pre-surgical tests → lab orders generated
    4. Test results review → AI assessment
    5. Insurance pre-authorization → submit + track
    6. Consent forms → digital signature
    7. Pre-op instructions → read + acknowledge
    8. Admission → check-in
    9. Surgery → status updates to family
    10. Post-op recovery → monitoring
    11. Discharge → summary + prescriptions
    12. Follow-up → schedule + attend
    13. Recovery tracking → vitals + symptoms

Chronic Care Workflow:
  Steps:
    1. Diagnosis recorded
    2. Care plan created → patient receives
    3. Medication regimen started
    4. Monitoring schedule set
    5. Regular lab work → reminders
    6. Follow-up visits → auto-schedule
    7. Medication adjustments → notification
    8. Milestone checks → AI assessment
    9. Annual comprehensive review

Insurance Claim Workflow:
  Steps:
    1. Treatment completed
    2. Bill generated
    3. Claim auto-generated from visit data
    4. Patient reviews claim details
    5. Submit to insurer
    6. Track status updates
    7. Additional docs requested → upload
    8. Settlement received → notification
    9. Shortfall payment → prompt patient
```

### 20.3 Workflow UI Patterns

```yaml
Active Workflow Card:
  - Compact card on home screen
  - Shows: workflow name, current step, what's needed from patient
  - Progress indicator (steps completed / total)
  - Tap → full workflow detail view

Workflow Detail View:
  - Timeline visualization (vertical)
  - Completed steps (green checkmarks)
  - Current step (highlighted, action button)
  - Future steps (dimmed, preview)
  - Each step shows: title, description, date, action/status
  
Action Required State:
  - Prominent CTA button
  - Clear description of what patient needs to do
  - Deadline/urgency indicator
  - Quick-action capability (don't navigate away)
```

---

## 21. REALTIME INFRASTRUCTURE PLAN

### 21.1 Realtime Architecture

```
┌─────────────────────────────────────────────────────────┐
│              REALTIME COMMUNICATION                       │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  ┌─────────────────────────────────────────────────┐    │
│  │  WEBSOCKET CONNECTION MANAGER                    │    │
│  │                                                  │    │
│  │  • Persistent connection to Adrine WS Gateway    │    │
│  │  • Auto-reconnection with exponential backoff    │    │
│  │  • Connection state machine                      │    │
│  │  • Heartbeat/ping mechanism                      │    │
│  │  • Token refresh on connection                   │    │
│  │  • Multi-channel subscription                    │    │
│  └─────────────────────────────────────────────────┘    │
│                                                          │
│  ┌─────────────────────────────────────────────────┐    │
│  │  REALTIME CHANNELS                               │    │
│  │                                                  │    │
│  │  • patient:{patientId}:notifications             │    │
│  │  • patient:{patientId}:appointments              │    │
│  │  • patient:{patientId}:records                   │    │
│  │  • patient:{patientId}:workflows                 │    │
│  │  • patient:{patientId}:chat:{sessionId}          │    │
│  │  • patient:{patientId}:metrics                   │    │
│  │  • family:{familyId}:updates                     │    │
│  │  • telemedicine:{sessionId}:signaling            │    │
│  └─────────────────────────────────────────────────┘    │
│                                                          │
│  ┌─────────────────────────────────────────────────┐    │
│  │  EVENT TYPES                                     │    │
│  │                                                  │    │
│  │  • appointment.status_changed                    │    │
│  │  • record.new_available                          │    │
│  │  • medication.reminder_due                       │    │
│  │  • workflow.step_changed                         │    │
│  │  • notification.new                              │    │
│  │  • payment.status_changed                        │    │
│  │  • telemedicine.provider_joined                  │    │
│  │  • ai.insight_generated                          │    │
│  │  • family.member_alert                           │    │
│  └─────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────┘
```

### 21.2 Connection State Machine

```
┌────────────┐  app_foreground  ┌────────────┐
│Disconnected│─────────────────→│ Connecting │
└────────────┘                  └─────┬──────┘
      ↑                               │
      │ max_retries                    │ success
      │ exceeded                       ↓
      │                         ┌────────────┐
      │                         │ Connected  │
      │                         │(Subscribing)│
      │                         └─────┬──────┘
      │                               │
      │ network_lost                   │ subscribed
      │ token_expired                  ↓
      │                         ┌────────────┐
      └─────────────────────────│   Active   │
                                │ (Receiving)│
                                └────────────┘
```

### 21.3 Fallback Strategy

```yaml
Priority Order:
  1. WebSocket (primary — persistent, bidirectional)
  2. Server-Sent Events (fallback — server push only)
  3. Polling (last resort — configurable interval)

Degradation:
  - If WS fails 3 times → fallback to SSE
  - If SSE fails → fallback to polling (30s interval)
  - Background mode → push notifications only
  - Offline → queue actions, process on reconnect
```

---

## 22. OFFLINE-FIRST ARCHITECTURE

### 22.1 Offline Strategy

```
┌─────────────────────────────────────────────────────────┐
│              OFFLINE-FIRST DESIGN                         │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  Principle: The app must be USABLE without network.      │
│  Not all features work offline, but core functions do.   │
│                                                          │
│  ┌──────────────────────────────────────────────────┐   │
│  │  OFFLINE-CAPABLE (Read)                           │   │
│  │  • View health records (cached)                   │   │
│  │  • View active medications + schedule             │   │
│  │  • View upcoming appointments                     │   │
│  │  • View emergency card                            │   │
│  │  • View health metrics/trends (cached)            │   │
│  │  • View documents (downloaded)                    │   │
│  │  • View family member info                        │   │
│  └──────────────────────────────────────────────────┘   │
│                                                          │
│  ┌──────────────────────────────────────────────────┐   │
│  │  OFFLINE-CAPABLE (Write — Queued)                 │   │
│  │  • Log medication adherence                       │   │
│  │  • Log vitals/health metrics                      │   │
│  │  • Take notes                                     │   │
│  │  • Upload documents (queued)                      │   │
│  └──────────────────────────────────────────────────┘   │
│                                                          │
│  ┌──────────────────────────────────────────────────┐   │
│  │  ONLINE-ONLY                                      │   │
│  │  • Book appointments                              │   │
│  │  • Telemedicine                                   │   │
│  │  • Make payments                                  │   │
│  │  • AI copilot chat                                │   │
│  │  • Real-time notifications                        │   │
│  │  • Search providers                               │   │
│  │  • Insurance operations                           │   │
│  └──────────────────────────────────────────────────┘   │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

### 22.2 Sync Engine Design

```typescript
interface SyncEngine {
  // Sync state
  lastSyncTimestamp: number;
  pendingOperations: SyncOperation[];
  syncStatus: 'idle' | 'syncing' | 'error' | 'offline';
  
  // Core operations
  pushChanges(): Promise<SyncResult>;   // Local → Server
  pullChanges(): Promise<SyncResult>;   // Server → Local
  resolveConflicts(conflicts: Conflict[]): Promise<void>;
  
  // Strategies
  conflictStrategy: 'server-wins' | 'client-wins' | 'manual';
  syncPriority: SyncPriorityConfig;
  
  // Events
  onSyncComplete: (result: SyncResult) => void;
  onConflict: (conflict: Conflict) => void;
  onNetworkChange: (online: boolean) => void;
}

interface SyncOperation {
  id: string;
  type: 'create' | 'update' | 'delete';
  entity: string;    // 'medication_log', 'vital_reading', etc.
  payload: unknown;
  timestamp: number;
  retryCount: number;
  priority: 'critical' | 'high' | 'normal' | 'low';
}
```

### 22.3 Local Database Schema (WatermelonDB)

```yaml
Tables:
  patients:          # Cached patient profiles
  appointments:      # Cached appointments
  medications:       # Active medications
  medication_logs:   # Adherence logs (write-heavy)
  health_metrics:    # Vitals and measurements
  records:           # Record metadata
  documents:         # Document metadata + download status
  notifications:     # Notification history
  ai_conversations:  # Chat history
  sync_queue:        # Pending sync operations
  cache_metadata:    # Cache validity tracking
```

---

## 23. PUSH NOTIFICATION ARCHITECTURE

### 23.1 Push Infrastructure

```yaml
Providers:
  iOS: Apple Push Notification Service (APNs)
  Android: Firebase Cloud Messaging (FCM)
  
Server-Side:
  - Adrine Notification Infrastructure handles all push delivery
  - App registers device token on login/token refresh
  - Token lifecycle management (refresh, invalidate)
  
Payload Structure:
  {
    "notification": {
      "title": "Lab Results Ready",
      "body": "Your blood work results from City Lab are ready to view",
      "image": "https://cdn.adrine.com/icons/lab-result.png"
    },
    "data": {
      "type": "record.new",
      "recordId": "rec_abc123",
      "action": "view_report",
      "deepLink": "adrine://records/report/rec_abc123/view",
      "priority": "high",
      "category": "health_record"
    }
  }

Rich Notifications:
  - Actionable buttons (View, Dismiss, Snooze)
  - Images for context
  - Progress indicators (delivery tracking)
  - Grouped notifications (per category)
```

### 23.2 Notification Categories & Actions

```yaml
Categories:
  appointment_reminder:
    Actions: [View Details, Reschedule, Cancel]
  medication_reminder:
    Actions: [Mark Taken, Snooze 15min, Skip]
  lab_result:
    Actions: [View Report, Ask AI]
  payment_due:
    Actions: [Pay Now, View Bill]
  emergency_alert:
    Actions: [Call Emergency, View Details]
  telemedicine_ready:
    Actions: [Join Now, Reschedule]
```

### 23.3 Background Processing

```yaml
Background Tasks:
  - Silent push for data sync triggers
  - Background fetch for health metric sync
  - Background upload for queued documents
  - Geofence-triggered check-in readiness
  - Scheduled local notifications for medication reminders
  
iOS Specifics:
  - Background App Refresh for periodic sync
  - HealthKit background delivery
  - Critical alerts for emergency (bypasses DND)
  
Android Specifics:
  - WorkManager for reliable background tasks
  - Foreground service for active telemedicine
  - High-priority FCM for time-critical notifications
  - Exact alarm scheduling for medication reminders
```

---

## 24. SECURITY ARCHITECTURE

### 24.1 Security Model

```
┌─────────────────────────────────────────────────────────┐
│              SECURITY ARCHITECTURE                        │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  LAYERS OF DEFENSE                                       │
│                                                          │
│  ┌──────────────────────────────────────────────────┐   │
│  │ L1: NETWORK SECURITY                             │   │
│  │  • TLS 1.3 for all communications                │   │
│  │  • Certificate pinning                           │   │
│  │  • No HTTP fallback                              │   │
│  │  • Request signing for sensitive operations      │   │
│  └──────────────────────────────────────────────────┘   │
│                                                          │
│  ┌──────────────────────────────────────────────────┐   │
│  │ L2: AUTHENTICATION & AUTHORIZATION               │   │
│  │  • JWT access tokens (short-lived: 15min)        │   │
│  │  • Refresh tokens (long-lived: 30 days)          │   │
│  │  • Device binding (token ↔ device)               │   │
│  │  • Role-based access (RBAC)                      │   │
│  │  • Attribute-based access (ABAC) for records     │   │
│  │  • Consent-based access for family               │   │
│  └──────────────────────────────────────────────────┘   │
│                                                          │
│  ┌──────────────────────────────────────────────────┐   │
│  │ L3: DATA PROTECTION                              │   │
│  │  • Encryption at rest (AES-256)                  │   │
│  │  • Encryption in transit (TLS 1.3)               │   │
│  │  • Sensitive data in Secure Enclave/Keystore     │   │
│  │  • PHI never logged or cached insecurely         │   │
│  │  • Local DB encryption (SQLCipher)               │   │
│  │  • Memory protection for sensitive fields        │   │
│  └──────────────────────────────────────────────────┘   │
│                                                          │
│  ┌──────────────────────────────────────────────────┐   │
│  │ L4: APPLICATION SECURITY                         │   │
│  │  • Root/jailbreak detection                      │   │
│  │  • Debugger detection                            │   │
│  │  • Screenshot prevention (sensitive screens)     │   │
│  │  • Clipboard clearing for sensitive data         │   │
│  │  • App attestation (Device Check / Play Integrity)│  │
│  │  • Code obfuscation                              │   │
│  │  • Anti-tampering                                │   │
│  └──────────────────────────────────────────────────┘   │
│                                                          │
│  ┌──────────────────────────────────────────────────┐   │
│  │ L5: COMPLIANCE                                   │   │
│  │  • HIPAA compliance (PHI handling)               │   │
│  │  • DISHA compliance (India health data)          │   │
│  │  • GDPR-like data subject rights                 │   │
│  │  • Consent management framework                  │   │
│  │  • Audit logging for all PHI access              │   │
│  │  • Data retention policies                       │   │
│  │  • Right to erasure implementation               │   │
│  └──────────────────────────────────────────────────┘   │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

### 24.2 Threat Model

```yaml
Threat Categories:
  Device Compromise:
    - Lost/stolen device → remote wipe, biometric lock
    - Rooted device → detection + degraded mode
    - Malware → app integrity checks
    
  Network Attacks:
    - MITM → certificate pinning
    - Replay → request signing + nonce
    - Eavesdropping → TLS 1.3
    
  Identity Attacks:
    - Credential theft → MFA + device binding
    - Session hijacking → short-lived tokens + device check
    - Social engineering → security awareness + anomaly detection
    
  Data Exfiltration:
    - Screenshot/recording → screen protection on sensitive views
    - Copy/paste → clipboard auto-clear
    - Backup extraction → encrypted backups only
    
  API Attacks:
    - Injection → server-side validation (not app responsibility)
    - IDOR → server-side authorization (not app responsibility)
    - Rate limiting → server-side (app handles 429 gracefully)
```

### 24.3 PHI Data Classification

```yaml
Critical PHI (Highest Protection):
  - Diagnosis codes
  - Mental health records
  - Substance abuse records
  - HIV/STI status
  - Genetic information
  Storage: Encrypted, never cached on device without biometric
  
Standard PHI:
  - Lab results
  - Prescriptions
  - Appointment details
  - Provider notes
  Storage: Encrypted at rest, cached with encryption
  
Limited PHI:
  - Health metrics (vitals)
  - Medication schedules
  - Appointment times (without details)
  Storage: Encrypted at rest, available offline
  
Non-PHI:
  - Provider directory
  - Facility information
  - Educational content
  - App preferences
  Storage: Standard storage, cacheable
```

---

## 25. AUTHENTICATION ARCHITECTURE

### 25.1 Authentication Flow

```
┌──────────────────────────────────────────────────────────────┐
│                AUTHENTICATION FLOWS                            │
├──────────────────────────────────────────────────────────────┤
│                                                               │
│  INITIAL REGISTRATION                                         │
│  ┌────────┐  ┌────────┐  ┌────────┐  ┌────────┐  ┌───────┐│
│  │  Phone │→│  OTP   │→│  Basic │→│ Device │→│  App  ││
│  │  Input │  │ Verify │  │Profile │  │ Trust  │  │ Ready ││
│  └────────┘  └────────┘  └────────┘  └────────┘  └───────┘│
│                                                               │
│  RETURNING USER LOGIN                                         │
│  ┌────────┐  ┌────────┐  ┌────────┐                         │
│  │Biometric│→│ Token  │→│  App   │  (< 1 second)           │
│  │  Verify │  │ Refresh│  │ Ready  │                         │
│  └────────┘  └────────┘  └────────┘                         │
│           OR                                                  │
│  ┌────────┐  ┌────────┐  ┌────────┐  ┌────────┐            │
│  │  Phone │→│  OTP   │→│ Device │→│  App   │              │
│  │  Input │  │ Verify │  │ Trust  │  │ Ready  │              │
│  └────────┘  └────────┘  └────────┘  └────────┘            │
│                                                               │
│  SESSION MANAGEMENT                                           │
│  • Access token: 15 min expiry                               │
│  • Refresh token: 30 day expiry                              │
│  • Silent refresh: Before expiry in background               │
│  • Session revocation: Server-side on security events         │
│  • Multi-device: Each device has independent session          │
│                                                               │
└──────────────────────────────────────────────────────────────┘
```

### 25.2 Token Architecture

```typescript
interface TokenManagement {
  // Storage
  accessToken: string;       // Stored in memory (volatile)
  refreshToken: string;      // Stored in Secure Store (encrypted)
  deviceToken: string;       // Stored in Secure Store (device-bound)
  
  // Lifecycle
  accessTokenExpiry: number; // Unix timestamp
  refreshBeforeExpiry: number; // Threshold (e.g., 60 seconds before)
  
  // Operations
  silentRefresh(): Promise<void>;  // Called automatically
  logout(): Promise<void>;          // Clear all tokens + server revoke
  forceLogout(): void;              // Immediate local clear
  
  // Security
  tokenBinding: 'device_id' | 'device_attestation';
  rotateRefreshToken: boolean; // New refresh token on each use
}
```

### 25.3 Multi-Factor Authentication

```yaml
Primary Factor: Phone OTP (SMS or WhatsApp)
Secondary Factors (Step-up for sensitive operations):
  - Biometric (Face ID / Fingerprint)
  - App PIN (4-6 digit)
  - Email OTP (for account recovery)
  
Step-Up Triggers:
  - Viewing critical PHI (mental health, HIV)
  - Making payments above threshold
  - Changing security settings
  - Adding new family members
  - Downloading records
  - Modifying emergency contacts
  - First access on new device
```

---

## 26. BIOMETRIC/DEVICE TRUST ARCHITECTURE

### 26.1 Biometric Authentication

```yaml
Supported Biometrics:
  iOS:
    - Face ID (primary)
    - Touch ID (fallback)
  Android:
    - Fingerprint (primary)
    - Face Unlock (Class 3 biometric only)
    - Iris Scan (Samsung)

Implementation:
  Library: expo-local-authentication
  Storage: Cryptographic keys in Secure Enclave / Android Keystore
  
  Flow:
    1. User enrolls biometric during onboarding
    2. App generates keypair in hardware security module
    3. Public key registered with Adrine Identity Service
    4. On auth: biometric unlocks private key → signs challenge
    5. Server verifies signature → issues tokens
    
  Fallback:
    - Biometric unavailable → PIN entry
    - PIN forgotten → OTP re-verification
    - Account locked → support flow
```

### 26.2 Device Trust Model

```yaml
Device Registration:
  On first login from a device:
    1. Generate unique device ID (UUID)
    2. Collect device fingerprint (model, OS, etc.)
    3. Perform device attestation (DeviceCheck/Play Integrity)
    4. Register with Adrine Device Service
    5. Bind refresh token to device
    6. Device becomes "trusted" after successful attestation

Trust Levels:
  TRUSTED: Attestation passed + biometric enrolled
    → Full access, biometric login, all features
    
  VERIFIED: Attestation passed, no biometric
    → Full access, OTP login required each session
    
  UNTRUSTED: Attestation failed or rooted device
    → Limited access, no offline PHI, frequent re-auth
    → Warning to user about security risks

Device Management:
  - View all active devices
  - Revoke trust for any device
  - Remote wipe app data
  - Active session management
  - Login history with device + location
```

---

## 27. ANALYTICS & ENGAGEMENT ARCHITECTURE

### 27.1 Analytics Framework

```yaml
Event Taxonomy:
  Screen Events:
    - screen.view (screen_name, duration, source)
    - screen.leave (screen_name, duration)
    
  Action Events:
    - action.tap (element, screen, context)
    - action.search (query, results_count, domain)
    - action.booking (provider, type, source)
    - action.payment (amount, method, status)
    
  Health Events (Aggregated, Non-PHI):
    - health.metric_logged (type, source)  # No values!
    - health.medication_taken (on_time: boolean)
    - health.appointment_completed (type)
    
  System Events:
    - system.app_open (source: notification/direct/deeplink)
    - system.sync_completed (duration, records_synced)
    - system.error (type, screen, recoverable)
    - system.performance (screen, load_time, frame_drops)

Privacy Rules:
  - NEVER log PHI values in analytics
  - NEVER log personally identifiable information
  - All analytics are aggregated and anonymized
  - User can opt-out of non-essential analytics
  - Essential analytics (crash, errors) always collected
```

### 27.2 Engagement Metrics

```yaml
Core Metrics:
  Retention:
    - D1, D7, D30 retention
    - WAU/MAU ratio
    - Session frequency
    - Feature adoption rates
    
  Health Outcomes (Aggregated):
    - Medication adherence rate
    - Appointment attendance rate
    - Health metric logging consistency
    - Follow-up completion rate
    
  UX Quality:
    - Task completion rates
    - Error rates per flow
    - Average time per key task
    - App performance metrics (FPS, load times)
    - Crash-free session rate
    
  Business Metrics:
    - Booking conversion rate
    - Payment success rate
    - Feature utilization per tier
    - Family member addition rate
```

### 27.3 Engagement Systems

```yaml
Streaks & Habits:
  - Daily medication logging streaks
  - Weekly vitals check-in streaks
  - Monthly checkup completion
  - Visual progress indicators
  - Gentle encouragement (not gamification)
  
Health Scores:
  - Composite health engagement score
  - Per-condition management score
  - Medication adherence score
  - Activity score (if wearable connected)
  - Sleep quality score
  
Proactive Engagement:
  - Personalized health tips
  - Contextual feature discovery
  - Progressive onboarding
  - Seasonal health reminders
  - Preventive care nudges
```

---

## 28. PERSONALIZATION SYSTEM

### 28.1 Personalization Architecture

```yaml
Personalization Layers:

  L1 — Profile-Based:
    Inputs: Age, gender, conditions, medications
    Outputs: 
      - Relevant health content
      - Appropriate screening reminders
      - Condition-specific dashboards
      - Medication-specific features
    
  L2 — Behavior-Based:
    Inputs: Usage patterns, preferred times, feature usage
    Outputs:
      - Optimized notification timing
      - Home screen widget priorities
      - Quick action ordering
      - AI suggestion relevance
      
  L3 — Health-Data-Based:
    Inputs: Vitals trends, lab results, AI analysis
    Outputs:
      - Personalized health insights
      - Risk-based monitoring frequency
      - Adaptive reminder scheduling
      - Condition-specific AI guidance
      
  L4 — Context-Based:
    Inputs: Time, location, recent activity, device state
    Outputs:
      - Contextual quick actions
      - Location-aware facility suggestions
      - Time-appropriate health prompts
      - Activity-aware monitoring
```

### 28.2 Home Screen Personalization

```yaml
Home Screen Composition:
  Fixed Elements:
    - Health summary card (top)
    - AI copilot trigger (floating)
    
  Personalized Elements (AI-ranked):
    - Active workflow cards (if any)
    - Next medication due card
    - Upcoming appointment card
    - Recent insight card
    - Health metric highlight
    - Quick actions (ordered by usage)
    
  Ranking Algorithm:
    Priority = f(urgency, recency, user_preference, context)
    
    urgency: How time-sensitive (medication due > general tip)
    recency: How new (new lab result > old appointment)
    user_preference: Past interaction patterns
    context: Current time, location, health state
```

---

## 29. MODULAR FEATURE SYSTEM

### 29.1 Module Architecture

```typescript
// Core module interface
interface FeatureModule {
  id: string;                    // Unique module identifier
  name: string;                  // Display name
  version: string;               // Module version
  
  // Dependencies
  dependencies: string[];        // Other modules this depends on
  platformMinVersion: string;    // Minimum Adrine API version
  
  // Feature control
  featureFlags: string[];        // Flags that control this module
  tenantConfig: TenantConfig;    // Tenant-specific configuration
  
  // Lifecycle
  canActivate: (context: AppContext) => boolean;
  initialize: (context: AppContext) => Promise<void>;
  teardown: () => Promise<void>;
  
  // Registration
  routes: RouteDefinition[];
  services: ServiceDefinition[];
  stores: StoreDefinition[];
  navigationItems: NavItem[];
  widgets: WidgetDefinition[];   // Home screen widgets
  quickActions: QuickAction[];
}
```

### 29.2 Module Registry

```yaml
Core Modules (Always Active):
  - identity       # Patient identity management
  - auth           # Authentication
  - profile        # Patient profile
  - notifications  # Notification system
  - settings       # App settings

Healthcare Modules (Tenant-Configurable):
  - appointments   # Scheduling & booking
  - records        # Health records vault
  - medications    # Medication management
  - telemedicine   # Video consultations
  - labs           # Lab ordering & results
  - pharmacy       # Pharmacy & delivery
  - payments       # Billing & payments
  - insurance      # Insurance management
  - emergency      # Emergency/SOS system

Enhancement Modules (Progressive Activation):
  - ai-copilot     # AI assistant
  - health-metrics # Vitals & wearables
  - family         # Family management
  - wearables      # Device integration
  - voice          # Voice interaction
  - workflows      # Workflow participation
```

### 29.3 Tenant-Configurable Features

```yaml
Configuration Model:
  # Fetched from platform on app init / config change event
  {
    "tenant_id": "hospital_abc",
    "modules": {
      "appointments": {
        "enabled": true,
        "config": {
          "allow_online_booking": true,
          "booking_advance_days": 30,
          "cancellation_hours": 4,
          "payment_required": "advance",
          "telemedicine_enabled": true
        }
      },
      "pharmacy": {
        "enabled": true,
        "config": {
          "home_delivery": true,
          "partner_pharmacy": "medplus",
          "refill_enabled": true
        }
      },
      "insurance": {
        "enabled": false  // This tenant doesn't support insurance
      }
    },
    "branding": {
      "primary_color": "#1A5F7A",
      "logo_url": "https://cdn.adrine.com/tenants/hospital_abc/logo.png",
      "display_name": "City Hospital"
    }
  }
```

---

## 30. MULTI-TENANT SUPPORT STRATEGY

### 30.1 Multi-Tenant Architecture

```
┌─────────────────────────────────────────────────────────┐
│              MULTI-TENANT PATIENT APP                     │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  Patient sees ONE unified app but interacts with         │
│  MULTIPLE healthcare organizations (tenants).            │
│                                                          │
│  ┌──────────────────────────────────────────────────┐   │
│  │  PATIENT VIEW                                     │   │
│  │                                                   │   │
│  │  "My Healthcare" (unified)                        │   │
│  │    ├── City Hospital (Tenant A)                   │   │
│  │    │   ├── Appointments                           │   │
│  │    │   ├── Records                                │   │
│  │    │   └── Bills                                  │   │
│  │    ├── LifeLab Diagnostics (Tenant B)             │   │
│  │    │   ├── Lab Orders                             │   │
│  │    │   └── Results                                │   │
│  │    ├── MedPlus Pharmacy (Tenant C)                │   │
│  │    │   ├── Prescriptions                          │   │
│  │    │   └── Orders                                 │   │
│  │    └── Star Health Insurance (Tenant D)           │   │
│  │        ├── Policy                                 │   │
│  │        └── Claims                                 │   │
│  └──────────────────────────────────────────────────┘   │
│                                                          │
│  Each tenant can:                                        │
│  • Enable/disable features                              │
│  • Configure workflows                                  │
│  • Apply branding (within guidelines)                   │
│  • Set business rules                                   │
│  • Manage their patient relationships                   │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

### 30.2 Tenant Resolution

```yaml
Resolution Flow:
  1. Patient downloads ONE Adrine app
  2. On registration, default tenant context set (if invited by a provider)
  3. Patient can be associated with multiple tenants
  4. Each API request includes tenant context when needed
  5. Cross-tenant data is unified in patient's view
  6. Tenant-specific features are toggled per configuration

Tenant Discovery:
  - Automatic: When provider creates record for patient
  - Invitation: Provider sends invite link → app deep link
  - QR Code: Scan at facility
  - Search: Patient searches and connects to facility
  
Tenant Context in App:
  - Records grouped by source (optional)
  - Provider-specific features honor tenant config
  - Payments route to correct billing system
  - Appointments show correct availability
  - Communication routes to correct provider
```

### 30.3 White-Label Strategy

```yaml
Single App, Multi-Tenant (Default):
  - One published app on stores
  - All patients use same app
  - Tenant branding applied contextually
  - Shared infrastructure and updates
  
White-Label App (Enterprise):
  - For large hospital chains wanting branded app
  - Same codebase, different build configuration
  - Custom app icon, name, splash screen
  - Tenant-specific theming applied globally
  - Published as separate app on stores
  - Shares same Adrine platform backend
  
  Build Configuration:
    - Tenant ID baked in at build time
    - Custom assets folder per white-label
    - Feature flags pre-configured
    - App Store metadata configured per tenant
```

---

## 31. SCALABILITY STRATEGY

### 31.1 Client-Side Scalability

```yaml
Performance Budget:
  App Launch: < 2 seconds to interactive
  Screen Transitions: < 300ms
  API Response Rendering: < 100ms after data arrives
  List Scroll: 60 FPS consistently
  Memory: < 200MB active usage
  Bundle Size: < 50MB initial download

Scaling Strategies:
  Code Splitting:
    - Route-based lazy loading
    - Module-level code splitting
    - On-demand native module loading
    - Async component loading for complex screens
    
  Data Management:
    - Cursor-based pagination (infinite scroll)
    - Virtualized lists (FlashList)
    - Incremental data loading
    - Stale-while-revalidate caching
    - Background prefetching for likely next screens
    
  Image/Asset Optimization:
    - Progressive image loading
    - WebP format with fallbacks
    - Responsive image sizes
    - LRU cache with size limits
    - CDN-delivered assets
    
  Computation:
    - Heavy processing on JS thread avoided
    - UI thread for animations (Reanimated worklets)
    - Background threads for sync operations
    - Debounced/throttled user inputs
```

### 31.2 Scaling for Large Patient Populations

```yaml
Considerations:
  - Patient with 10+ years of health records
  - Family with 8+ members
  - 100+ medications over lifetime
  - 500+ lab reports
  - 1000+ health metric readings per month (wearables)

Solutions:
  Records:
    - Server-side pagination (never load all at once)
    - Search index for quick retrieval
    - Timeline view with virtual scrolling
    - Lazy-load document attachments
    - Archive old records (access on demand)
    
  Health Metrics:
    - Aggregated views (daily/weekly/monthly averages)
    - Detail on demand (drill down to individual readings)
    - Background sync (not blocking UI)
    - Local DB with retention policies
    - Server-side trend computation
    
  Notifications:
    - Pagination + archiving
    - Category-based filtering
    - Read/unread management
    - Bulk operations (mark all read)
```

---

## 32. DESIGN SYSTEM STRATEGY

### 32.1 Adrine Design System (ADS)

```yaml
Design Principles:
  1. Clarity Over Decoration: Every pixel serves a purpose
  2. Consistent Rhythm: Predictable spacing, sizing, motion
  3. Accessible by Default: WCAG 2.1 AA minimum
  4. Performance-Aware: No heavy animations blocking interaction
  5. Trust Signals: Design that conveys security and reliability
  6. Emotional Intelligence: Calming, not clinical

Design Tokens:
  Colors:
    Primary: Deep Teal (#0F766E) — Trust, health, calm
    Secondary: Warm Amber (#F59E0B) — Attention, warmth
    Success: Emerald (#10B981)
    Warning: Orange (#F97316)
    Error: Rose (#F43F5E)
    Neutral: Slate scale (50-950)
    Background: White / Slate-50
    Surface: White / Slate-100
    
  Typography:
    Font Family: Inter (Latin) + Noto Sans (Indic scripts)
    Scale: 
      xs: 11px / 0.6875rem
      sm: 13px / 0.8125rem
      base: 15px / 0.9375rem
      lg: 17px / 1.0625rem
      xl: 20px / 1.25rem
      2xl: 24px / 1.5rem
      3xl: 30px / 1.875rem
      4xl: 36px / 2.25rem
    Weights: Regular (400), Medium (500), Semibold (600), Bold (700)
    
  Spacing:
    Base: 4px
    Scale: 4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96
    
  Border Radius:
    sm: 6px
    md: 8px
    lg: 12px
    xl: 16px
    full: 9999px
    
  Shadows:
    sm: 0 1px 2px rgba(0,0,0,0.05)
    md: 0 4px 6px rgba(0,0,0,0.07)
    lg: 0 10px 15px rgba(0,0,0,0.10)
    xl: 0 20px 25px rgba(0,0,0,0.12)
    
  Motion:
    duration-fast: 150ms
    duration-normal: 250ms
    duration-slow: 400ms
    easing-default: cubic-bezier(0.4, 0, 0.2, 1)
    easing-spring: cubic-bezier(0.34, 1.56, 0.64, 1)
```

### 32.2 Component Library

```yaml
Primitives:
  - Box (layout container with token-based styling)
  - Text (typography primitive)
  - Pressable (accessible touch target)
  - Stack (HStack, VStack with spacing)
  - Divider
  - Spacer
  - Icon

Components:
  Inputs:
    - TextInput (with validation states)
    - SearchInput
    - PhoneInput (with country code)
    - OTPInput (multi-digit)
    - DatePicker
    - TimePicker
    - Select / Dropdown
    - Checkbox / Radio
    - Switch / Toggle
    - Slider
    
  Display:
    - Card (elevated, outlined, filled variants)
    - Badge (status indicators)
    - Avatar (with online indicator)
    - Tag / Chip
    - Progress (bar, ring, steps)
    - Skeleton (loading placeholder)
    - Empty State
    - Metric Card (value + trend)
    
  Navigation:
    - TabBar (bottom)
    - Header (with actions)
    - Breadcrumb
    - SegmentedControl
    
  Overlay:
    - Modal
    - BottomSheet (with snap points)
    - Toast / Snackbar
    - Alert Dialog
    - Tooltip
    - ActionSheet
    
  Data:
    - List (flat, sectioned)
    - Timeline (vertical)
    - Chart (line, bar, area — lightweight)
    - Table (simple)
    - Calendar (month view, week strip)
    
  Health-Specific:
    - VitalCard (BP, Sugar, Temp display)
    - MedicationCard (with timing)
    - AppointmentCard (with status)
    - LabResultRow (with normal range)
    - HealthScoreRing
    - TrendSparkline
```

### 32.3 Dark Mode Strategy

```yaml
Approach: System-preference with manual override
Implementation:
  - All colors defined as semantic tokens (not raw values)
  - Dark mode inverts surface hierarchy, not all colors
  - Critical health indicators maintain same colors (red = abnormal)
  - High contrast mode available for accessibility
  
Color Mapping:
  Light:
    background: white
    surface: slate-50
    text-primary: slate-900
    text-secondary: slate-600
    
  Dark:
    background: slate-950
    surface: slate-900
    text-primary: slate-50
    text-secondary: slate-400
```

---

## 33. ACCESSIBILITY STRATEGY

### 33.1 Accessibility Architecture

```yaml
Standards: WCAG 2.1 Level AA (target AAA for critical flows)

Core Requirements:
  Visual:
    - Minimum contrast ratio 4.5:1 for text
    - Minimum contrast ratio 3:1 for UI elements
    - No information conveyed by color alone
    - Support for system font size scaling (up to 200%)
    - Support for bold text preference
    - Reduced motion mode support
    
  Motor:
    - Minimum touch target: 44x44 pt
    - No time-limited interactions (or with extension)
    - Single-hand reachability (important actions in thumb zone)
    - Voice control compatibility
    - Switch control compatibility
    
  Screen Reader:
    - Full VoiceOver (iOS) and TalkBack (Android) support
    - Semantic markup for all components
    - Meaningful accessibility labels
    - Correct role and state announcements
    - Focus management for navigation
    - Live regions for dynamic content
    
  Cognitive:
    - Clear, simple language (Grade 8 reading level)
    - Consistent navigation patterns
    - Predictable behavior
    - Error prevention and recovery
    - Progress indicators for multi-step flows
    - Undo/cancel capability
```

### 33.2 Implementation Approach

```typescript
// Every component includes accessibility props
interface AccessibleComponentProps {
  accessibilityLabel: string;           // VoiceOver/TalkBack label
  accessibilityHint?: string;           // Additional context
  accessibilityRole: AccessibilityRole; // button, link, header, etc.
  accessibilityState?: {
    disabled?: boolean;
    selected?: boolean;
    checked?: boolean | 'mixed';
    busy?: boolean;
    expanded?: boolean;
  };
  accessibilityValue?: {
    min?: number;
    max?: number;
    now?: number;
    text?: string;
  };
}

// Health-specific accessibility
// Lab values announced with context:
// "Blood glucose: 140 mg/dL. Above normal range of 70 to 100"
// Medication reminders: Full context in screen reader announcement
// Emergency: SOS accessible with triple-press or voice command
```

### 33.3 Testing Strategy

```yaml
Automated:
  - axe-core for component-level checks
  - jest-axe for unit test assertions
  - Detox accessibility assertions in E2E
  
Manual:
  - VoiceOver testing on iOS
  - TalkBack testing on Android
  - Keyboard navigation testing
  - Screen magnification testing
  - Color blindness simulation testing
  
User Testing:
  - Testing with disabled users (quarterly)
  - Elderly user testing (quarterly)
  - Low-literacy user testing
```

---

## 34. LOCALIZATION/MULTILINGUAL STRATEGY

### 34.1 Localization Architecture

```yaml
Framework: i18next + react-i18next + expo-localization

Language Support (Phased):
  Phase 1: English, Hindi
  Phase 2: Tamil, Telugu, Kannada, Malayalam, Marathi, Bengali, Gujarati
  Phase 3: Urdu, Punjabi, Odia, Assamese + regional variants
  Future: International (Arabic, French, etc.)

Architecture:
  ┌─────────────────────────────────────────────────┐
  │  LOCALIZATION SYSTEM                             │
  ├─────────────────────────────────────────────────┤
  │                                                  │
  │  ┌──────────────┐  ┌──────────────────────────┐│
  │  │ Static Text  │  │  Dynamic Content         ││
  │  │ (App UI)     │  │  (API Responses)         ││
  │  │              │  │                          ││
  │  │ Bundled JSON │  │ Server-side localization ││
  │  │ per language │  │ Accept-Language header   ││
  │  └──────────────┘  └──────────────────────────┘│
  │                                                  │
  │  ┌──────────────┐  ┌──────────────────────────┐│
  │  │ Medical Terms│  │  AI Responses            ││
  │  │ (Glossary)   │  │  (Localized by AI)       ││
  │  │              │  │                          ││
  │  │ Standardized │  │ Generated in patient's   ││
  │  │ translations │  │ preferred language       ││
  │  └──────────────┘  └──────────────────────────┘│
  │                                                  │
  └─────────────────────────────────────────────────┘

Content Types & Localization:
  UI Strings: Pre-translated, bundled with app
  Medical Terms: Curated translations with standardized glossary
  AI Responses: Generated in target language by AI Gateway
  Notifications: Server-side localization based on preference
  Documents/Reports: Original language + optional translation
  
RTL Support:
  - Layout mirroring for Urdu/Arabic
  - Bidirectional text handling
  - Icon directionality awareness
```

### 34.2 Cultural Adaptation

```yaml
Beyond Translation:
  - Date formats (DD/MM/YYYY for India)
  - Number formats (Indian numbering: 1,00,000)
  - Currency formatting (Rs. / INR)
  - Name formats (respect titles)
  - Color meanings (red ≠ danger universally)
  - Cultural health practices acknowledgment
  - Gender-sensitive language
  - Age-appropriate communication style
```

---

## 35. VOICE INTERACTION STRATEGY

### 35.1 Voice Architecture

```
┌─────────────────────────────────────────────────────────┐
│              VOICE INTERACTION SYSTEM                     │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  ┌─────────────────────────────────────────────────┐    │
│  │  ON-DEVICE                                       │    │
│  │  • Wake word detection (optional)                │    │
│  │  • Audio capture & processing                    │    │
│  │  • Voice Activity Detection (VAD)                │    │
│  │  • Audio streaming to platform                   │    │
│  │  • TTS playback for responses                    │    │
│  └─────────────────────────────────────────────────┘    │
│                                                          │
│  ┌─────────────────────────────────────────────────┐    │
│  │  ADRINE AI GATEWAY (Server-side)                 │    │
│  │  • Speech-to-Text (multilingual)                 │    │
│  │  • Intent recognition                            │    │
│  │  • Natural language understanding                │    │
│  │  • Response generation                           │    │
│  │  • Text-to-Speech (multilingual, natural)        │    │
│  └─────────────────────────────────────────────────┘    │
│                                                          │
│  ┌─────────────────────────────────────────────────┐    │
│  │  VOICE MODES                                     │    │
│  │                                                  │    │
│  │  Mode 1: Voice-to-Chat                           │    │
│  │    Speech → Text → AI Chat → Text → Display      │    │
│  │    (for users who prefer speaking over typing)    │    │
│  │                                                  │    │
│  │  Mode 2: Full Voice Interaction                  │    │
│  │    Speech → Text → AI → Speech (TTS)             │    │
│  │    (hands-free, eyes-free interaction)            │    │
│  │                                                  │    │
│  │  Mode 3: Voice Commands                          │    │
│  │    Speech → Intent → Action                      │    │
│  │    ("Book appointment", "Log my BP as 120/80")   │    │
│  └─────────────────────────────────────────────────┘    │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

### 35.2 Voice Use Cases

```yaml
Primary Voice Scenarios:
  - Elderly patients who struggle with typing
  - Logging vitals while hands are occupied
  - Quick queries ("When is my next appointment?")
  - Accessibility for visually impaired users
  - Multilingual users more comfortable speaking
  
Voice Commands (Examples):
  - "Log my blood sugar as 145"
  - "What medications do I take in the morning?"
  - "Book an appointment with my cardiologist"
  - "Show me my last blood test"
  - "Remind me to take medicine at 9 PM"
  - "Call Dr. Patel" (if telemedicine)
  
Multilingual Voice:
  - Hindi voice recognition and response
  - Code-switching support (Hindi-English mix)
  - Regional language support (phased)
  - Natural-sounding TTS in Indian languages
```

---

## 36. AI COPILOT EXPERIENCE DESIGN

### 36.1 Copilot UX Design

```yaml
Entry Points:
  1. Floating Action Button (persistent on all screens)
  2. Long-press on any health data → "Ask AI about this"
  3. Home screen AI card (proactive insights)
  4. Voice activation (mic button in copilot)
  5. Notification actions ("Ask AI" button)
  6. Contextual suggestions inline

Chat Interface Design:
  Layout:
    - Full-screen or bottom sheet (user choice)
    - Message bubbles (user right, AI left)
    - Streaming text animation (typewriter effect)
    - Rich cards for structured responses (appointments, records)
    - Action buttons within AI responses
    - Quick reply chips for common follow-ups
    
  Visual Elements:
    - AI avatar (Adrine brand character — warm, professional)
    - Typing indicator (animated)
    - Source citations (expandable)
    - Confidence indicators (subtle)
    - Medical disclaimer (persistent but unobtrusive)
    
  Interaction Patterns:
    - Tap message → copy, share, or report
    - Tap citation → navigate to source
    - Tap action button → execute (with confirmation)
    - Pull down → new conversation
    - Voice toggle → switch to voice mode

Proactive Intelligence:
  The copilot doesn't wait to be asked:
    - "Your HbA1c has improved! Here's what's working..."
    - "You haven't logged BP in 3 days. Quick log?"
    - "Based on your symptoms, consider scheduling with Dr. Shah"
    - "Your medication refill is due in 3 days. Reorder?"
```

### 36.2 AI Response Patterns

```yaml
Response Types:
  Informational:
    Format: Text with optional card/chart
    Example: "Your blood pressure average this week is 125/82..."
    
  Actionable:
    Format: Text + action buttons
    Example: "I can book an appointment with Dr. Shah. [Book Now] [See Other Times]"
    
  Educational:
    Format: Text + expandable sections
    Example: "HbA1c measures your average blood sugar over 3 months... [Learn More]"
    
  Urgent:
    Format: Alert card + action
    Example: "⚠️ Your blood sugar reading of 350 is very high. [Call Doctor] [Go to ER]"
    
  Multi-Step:
    Format: Numbered steps + progress
    Example: "To prepare for your surgery: 1. Stop blood thinners (done ✓) 2. Fast from..."
```

---

## 37. PATIENT TIMELINE & HEALTH GRAPH ARCHITECTURE

### 37.1 Timeline Model

```
┌─────────────────────────────────────────────────────────┐
│              PATIENT HEALTH TIMELINE                      │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  A longitudinal, chronological view of all health        │
│  events and data points for a patient.                   │
│                                                          │
│  ┌──────────────────────────────────────────────────┐   │
│  │  2024                                             │   │
│  │  ────                                             │   │
│  │  Dec 15 │ Lab Results (HbA1c: 6.8%)  [AI: ↓ ✓]  │   │
│  │  Dec 10 │ Consultation with Dr. Shah             │   │
│  │  Dec 01 │ Medication Changed: Metformin 1000mg   │   │
│  │  ────                                             │   │
│  │  Nov 20 │ Lab Results (HbA1c: 7.2%)              │   │
│  │  Nov 15 │ Blood Pressure Alert (160/95)          │   │
│  │  Nov 10 │ Telemedicine: Dr. Patel                │   │
│  │  Nov 01 │ Pharmacy: Medication Refill            │   │
│  │  ────                                             │   │
│  │  Oct 25 │ Emergency Visit (Chest Pain)           │   │
│  │  Oct 20 │ ECG Report: Normal Sinus Rhythm        │   │
│  │  ...                                              │   │
│  └──────────────────────────────────────────────────┘   │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

### 37.2 Timeline Event Types

```typescript
type TimelineEventType =
  | 'consultation'        // Doctor visit
  | 'telemedicine'        // Virtual visit
  | 'lab_result'          // Lab report received
  | 'imaging'             // Imaging report
  | 'prescription'        // New prescription
  | 'medication_change'   // Dosage/medication change
  | 'hospitalization'     // Admission/discharge
  | 'surgery'             // Procedure
  | 'vaccination'         // Vaccine administered
  | 'vital_alert'         // Abnormal vital reading
  | 'diagnosis'           // New diagnosis
  | 'referral'            // Referral to specialist
  | 'insurance_event'     // Claim, pre-auth
  | 'milestone'           // Health milestone (AI-generated)
  | 'document_upload'     // Patient-uploaded record

interface TimelineEvent {
  id: string;
  type: TimelineEventType;
  date: DateTime;
  title: string;
  summary: string;
  provider?: Provider;
  facility?: Facility;
  tags: string[];          // 'cardiac', 'diabetes', etc.
  linkedRecords: string[]; // Associated record IDs
  aiInsight?: string;      // AI-generated context
  importance: 'critical' | 'high' | 'normal' | 'low';
}
```

### 37.3 Health Graph (Knowledge Graph)

```yaml
Health Graph Concept:
  A connected graph of patient health data enabling:
  - Relationship discovery (condition ↔ medication ↔ lab value)
  - Trend analysis across related data points
  - AI-powered health narrative generation
  - Predictive insights based on patterns
  
Graph Nodes:
  - Conditions (Diabetes, Hypertension, etc.)
  - Medications (each drug with dosage)
  - Providers (doctors, specialists)
  - Lab Parameters (HbA1c, Creatinine, etc.)
  - Vitals (BP readings, glucose readings)
  - Events (surgeries, hospitalizations)
  - Symptoms (self-reported)
  
Graph Edges:
  - "treated_by" (Condition → Medication)
  - "monitored_by" (Condition → Lab Parameter)
  - "managed_by" (Condition → Provider)
  - "correlates_with" (Vital → Condition)
  - "caused_by" (Event → Condition)
  - "interacts_with" (Medication → Medication)
  
Patient-Facing Value:
  - "Your diabetes is managed by Metformin, monitored via HbA1c"
  - "Your BP readings correlate with medication adherence"
  - "Dr. Shah manages your cardiac care; Dr. Patel manages diabetes"
```

---

## 38. HEALTH DASHBOARD SYSTEM

### 38.1 Dashboard Architecture

```yaml
Dashboard Philosophy:
  - Glanceable: Key health status in 2 seconds
  - Personalized: Shows what matters to THIS patient
  - Actionable: Every card leads to action
  - AI-Enhanced: Insights layered on top of data
  
Dashboard Sections (AI-ranked):
  
  1. Health Score Ring:
     - Composite score (0-100) based on:
       - Medication adherence
       - Vital readings within range
       - Appointment attendance
       - Activity levels
     - Trend arrow (improving/declining)
     - Tap → detailed breakdown
     
  2. Active Alerts:
     - Abnormal readings requiring attention
     - Overdue medications
     - Missed appointments
     - Urgent workflow actions
     
  3. Vital Summary Cards:
     - Key vitals with latest value + trend
     - Color-coded (green/yellow/red)
     - Tap → trend chart + history
     
  4. Today's Schedule:
     - Medications due
     - Appointments
     - Monitoring tasks
     - AI reminders
     
  5. AI Insights Feed:
     - Latest personalized insights
     - "Your BP has improved 8% this month"
     - "Consider adding more fiber based on your glucose trends"
     - "Due for annual eye checkup (diabetes screening)"
```

### 38.2 Health Metrics Visualization

```yaml
Chart Types:
  Line Chart:
    - BP over time (systolic + diastolic)
    - Blood glucose trends
    - Weight progression
    - HbA1c quarterly
    
  Bar Chart:
    - Steps per day/week
    - Medication adherence per week
    - Sleep hours
    
  Area Chart:
    - Heart rate zones
    - Activity intensity
    
  Sparkline:
    - Inline trends on cards (compact)
    - Lab parameter direction

  Gauge/Ring:
    - Health score
    - Daily activity goal
    - Medication adherence today

Interaction:
  - Pinch to zoom on time axis
  - Tap data point → exact value + date
  - Slide to compare periods
  - Long-press → share chart
  - Normal range overlay (shaded band)
```

---

## 39. EMERGENCY/SOS WORKFLOWS

### 39.1 Emergency System Design

```
┌─────────────────────────────────────────────────────────┐
│              EMERGENCY / SOS SYSTEM                       │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  TRIGGER METHODS:                                        │
│  • SOS button (home screen, always accessible)           │
│  • Triple-press power button (OS-level if configured)    │
│  • Voice command: "Adrine Emergency"                     │
│  • AI escalation (detected emergency in chat)            │
│  • Abnormal vital reading trigger                        │
│                                                          │
│  IMMEDIATE ACTIONS (within 3 seconds):                   │
│  1. Display Emergency Medical Card on screen             │
│  2. Begin location sharing                               │
│  3. Alert emergency contacts (push + SMS)                │
│  4. Connect to nearest emergency facility                │
│  5. Optional: Call ambulance (one-tap)                   │
│                                                          │
│  EMERGENCY MEDICAL CARD:                                 │
│  ┌──────────────────────────────────────────────────┐   │
│  │  ⚕️ EMERGENCY MEDICAL INFORMATION                │   │
│  │                                                   │   │
│  │  Name: Rajesh Kumar                               │   │
│  │  Age: 45 | Blood Group: B+                        │   │
│  │  Allergies: Penicillin, Sulfa drugs               │   │
│  │                                                   │   │
│  │  Active Conditions:                               │   │
│  │    • Type 2 Diabetes (since 2019)                 │   │
│  │    • Hypertension (since 2020)                    │   │
│  │                                                   │   │
│  │  Current Medications:                             │   │
│  │    • Metformin 1000mg (2x daily)                  │   │
│  │    • Amlodipine 5mg (1x daily)                    │   │
│  │    • Aspirin 75mg (1x daily)                      │   │
│  │                                                   │   │
│  │  Emergency Contacts:                              │   │
│  │    • Priya Kumar (Wife): +91-98xxx   [Call]       │   │
│  │    • Dr. Shah (Cardiologist): +91-98xxx [Call]    │   │
│  │                                                   │   │
│  │  Insurance: Star Health | Policy: SH-123456       │   │
│  │  ABHA ID: 12-3456-7890-1234                       │   │
│  └──────────────────────────────────────────────────┘   │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

### 39.2 Emergency Workflows

```yaml
Workflow 1 — Patient-Triggered SOS:
  T+0s:   SOS button pressed
  T+1s:   Emergency card displayed
  T+2s:   Location captured + sharing started
  T+3s:   Emergency contacts notified (push + SMS)
  T+5s:   Nearest hospitals shown with directions
  T+10s:  Ambulance call option prominent
  T+30s:  If no patient interaction → auto-escalate to contacts
  
Workflow 2 — AI-Detected Emergency:
  Trigger: Patient reports concerning symptoms in AI chat
  - AI detects: chest pain + sweating + shortness of breath
  - AI response: "This sounds serious. Do you need emergency help?"
  - Prominent: [Call Ambulance] [SOS Alert] [I'm OK]
  - If "Call Ambulance" → trigger emergency workflow
  
Workflow 3 — Vital Alert Emergency:
  Trigger: Connected device reports critical reading
  - BP > 180/120 OR Blood Sugar > 400 OR SpO2 < 90%
  - Alert on phone (critical notification, bypasses DND)
  - "Critical reading detected. Are you feeling OK?"
  - Options: [I'm Fine] [Need Help] [Emergency]
  - No response in 5min → alert emergency contacts

Lock Screen Access:
  - Emergency card accessible from lock screen (widget)
  - No authentication required for emergency card VIEW
  - Actions (call, share location) require device unlock or SOS
```

---

## 40. HEALTHCARE JOURNEY ORCHESTRATION

### 40.1 Journey Concept

```yaml
What is a Healthcare Journey:
  A healthcare journey is the complete end-to-end experience
  of a patient through a specific health concern or episode.
  
  Examples:
  - "Managing my diabetes" (ongoing chronic journey)
  - "Getting knee replacement surgery" (episodic journey)
  - "Having a baby" (time-bounded journey)
  - "Annual health checkup" (periodic journey)

Journey vs. Workflow:
  Journey: Patient-facing experience narrative
  Workflow: Technical process engine behind the scenes
  
  One journey may involve multiple workflows:
  "Knee Replacement" Journey:
    → Consultation Workflow
    → Pre-surgical Assessment Workflow
    → Insurance Pre-auth Workflow
    → Surgery Preparation Workflow
    → Post-surgical Recovery Workflow
```

### 40.2 Journey Architecture

```typescript
interface HealthcareJourney {
  id: string;
  type: 'chronic' | 'episodic' | 'periodic' | 'life-event';
  title: string;
  description: string;
  status: 'active' | 'paused' | 'completed';
  startDate: DateTime;
  expectedEnd?: DateTime;
  
  // Phases
  phases: JourneyPhase[];
  currentPhase: string;
  
  // Related entities
  conditions: string[];      // Linked conditions
  providers: string[];       // Involved providers
  workflows: string[];       // Active workflows
  records: string[];         // Related records
  
  // Intelligence
  nextActions: PatientAction[];
  aiGuidance: string;        // AI-generated next steps
  milestones: Milestone[];
  progressPercentage: number;
}

interface JourneyPhase {
  id: string;
  name: string;              // "Pre-Surgery", "Recovery"
  status: 'upcoming' | 'active' | 'completed';
  actions: PatientAction[];
  duration?: string;         // "2 weeks"
  guidance: string;          // Phase-specific guidance
}
```

### 40.3 Journey UX

```yaml
Journey Card (Home Screen):
  - Visual: Progress bar + current phase
  - Info: Journey name + next action required
  - CTA: Primary action button
  - AI: Brief guidance text

Journey Detail Screen:
  - Phase timeline (visual, horizontal or vertical)
  - Current phase expanded with:
    - Checklist of patient actions
    - Provider actions (what others are doing)
    - Related records/reports
    - AI guidance and tips
  - Upcoming phases (preview)
  - Completed phases (summary + records)
```

---

## 41. FUTURE ECOSYSTEM EXPANSION PLAN

### 41.1 Expansion Roadmap

```yaml
Near-Term Expansions:
  Healthcare Marketplace:
    - Second opinions from specialists
    - Wellness services (nutrition, yoga, mental health)
    - Home healthcare services
    - Medical equipment rental/purchase
    - Health packages from multiple providers
    
  Digital Therapeutics:
    - Guided programs (diabetes reversal, cardiac rehab)
    - CBT/mental health programs
    - Physiotherapy exercises with tracking
    - Chronic pain management
    - Sleep improvement programs
    
  Health Communities:
    - Condition-specific support groups
    - Anonymous health Q&A
    - Patient stories and experiences
    - Provider-moderated discussions

Mid-Term Expansions:
  Remote Patient Monitoring (RPM):
    - Continuous monitoring for chronic patients
    - Provider-prescribed monitoring protocols
    - Alert escalation to care teams
    - Integration with hospital command centers
    
  AI Health Agents:
    - Autonomous health management agents
    - "Manage my diabetes" → AI handles routine tasks
    - Proactive care coordination
    - Predictive intervention suggestions
    
  Corporate Health:
    - Employer-sponsored health programs
    - Workplace wellness integration
    - Annual health checkup coordination
    - Occupational health workflows

Long-Term Expansions:
  Healthcare Super-App Ecosystem:
    - Third-party health app integration (mini-programs)
    - Health data marketplace (consent-based research)
    - Global health passport (cross-border care)
    - Genomics and precision medicine
    - Clinical trial matching
    - AI-powered population health insights
```

### 41.2 Platform Primitive vs. App-Level Classification

```yaml
Platform Primitives (Reusable across all Adrine apps):
  - Patient Identity Service
  - Authentication & Authorization
  - Notification Infrastructure
  - Event Bus & Realtime
  - Workflow Engine
  - AI Gateway
  - Document Storage & Processing
  - Payment Processing
  - Consent Management
  - Audit Logging
  - Multi-Tenant Configuration
  - Feature Flag System
  - Analytics Pipeline
  - Push Notification Delivery
  - SMS/Email/WhatsApp Delivery
  - Localization Service

App-Level (Specific to Patient Super App):
  - Home dashboard composition logic
  - Health metric visualization
  - Medication reminder UX
  - Family context switching UX
  - AI copilot chat interface
  - Emergency card display
  - Onboarding flow
  - Device pairing UX
  - Telemedicine video UI

Shared Libraries (Reusable for future Adrine mobile apps):
  - Adrine Design System (component library)
  - API Client SDK
  - Auth SDK (token management, biometric)
  - Realtime Client SDK
  - Storage/Sync SDK
  - Analytics SDK
  - Push Notification Handler
  - Deep Link Handler
  - Error Reporting SDK
  - Performance Monitoring SDK
```

### 41.3 Third-Party Integration Framework

```yaml
Integration Types:
  
  Inbound (Data into Adrine):
    - Wearable data (Apple Health, Google Health Connect)
    - External lab results (via FHIR/HL7)
    - Insurance claims data
    - Pharmacy dispensing data
    - Remote monitoring device data
    
  Outbound (Data from Adrine):
    - Health records to other platforms (ABDM, FHIR)
    - Prescription to pharmacy chains
    - Lab orders to diagnostic chains
    - Insurance claims to payers
    - Emergency data to responders
    
  Embedded (Third-party within Adrine):
    - Mini-programs (wellness, fitness apps within Adrine)
    - Provider-specific modules
    - Insurance-specific claim modules
    - Pharmacy delivery tracking (partner APIs)
    
  Extension Points:
    - Custom widgets on home dashboard
    - Custom cards in health timeline
    - Custom notification handlers
    - Custom workflow steps
```

---

## 42. MOBILE ENGINEERING ARCHITECTURE

### 42.1 Engineering Practices

```yaml
Code Quality:
  TypeScript:
    - Strict mode enabled
    - No 'any' types (eslint enforced)
    - Comprehensive type definitions for all APIs
    - Zod schemas for runtime validation
    
  Linting & Formatting:
    - ESLint with custom healthcare-app ruleset
    - Prettier for consistent formatting
    - Import ordering enforced
    - No unused variables/imports
    
  Code Review:
    - Required for all changes
    - Automated checks: lint, type-check, test
    - Performance impact review for UI changes
    - Security review for auth/data changes
    - Accessibility review for new components

Testing Strategy:
  Unit Tests:
    - Business logic (hooks, utilities, stores)
    - Component rendering (Testing Library)
    - API mocking (MSW)
    - Target: 80% coverage on business logic
    
  Integration Tests:
    - Screen-level tests with mocked navigation
    - Multi-component interaction tests
    - Store + API integration tests
    
  E2E Tests:
    - Critical user flows (login, booking, payment)
    - Framework: Maestro (declarative, cross-platform)
    - Run on CI for every release candidate
    - Target: Top 20 user journeys covered
    
  Performance Tests:
    - Startup time benchmarks
    - Screen load time tracking
    - Memory leak detection
    - Frame rate monitoring during key interactions

Error Handling:
  Global Error Boundary:
    - Catches unhandled JS errors
    - Shows recovery UI (not crash)
    - Reports to error monitoring service
    - User can: retry, go home, or report bug
    
  API Error Handling:
    - Standardized error model from all APIs
    - Per-screen error states
    - Retry logic with backoff
    - Offline-aware error messages
    
  Native Crash Reporting:
    - Firebase Crashlytics / Sentry
    - Symbolicated crash reports
    - User impact tracking
    - Release-gated alerting
```

### 42.2 Performance Architecture

```yaml
Performance Principles:
  1. Perceived Performance > Actual Performance
     - Skeleton screens instead of spinners
     - Optimistic UI updates
     - Pre-fetch likely next screens
     - Instant navigation (load data after)
     
  2. 60 FPS is Non-Negotiable
     - Animations on UI thread (Reanimated worklets)
     - Virtualized lists (FlashList) for long data
     - Memoized components where needed
     - Avoid re-renders (zustand selector pattern)
     
  3. Memory is Finite
     - Image caching with size limits
     - Paginated data (don't hold everything)
     - Weak references for non-critical caches
     - Background cleanup on memory pressure
     
  4. Battery Matters
     - Batch network requests where possible
     - Reasonable sync intervals (not aggressive)
     - Minimize background processing
     - Efficient location usage
```

### 42.3 CI/CD Pipeline

```yaml
Pipeline Stages:

  On Pull Request:
    - TypeScript type-check
    - ESLint
    - Unit tests (Jest)
    - Build validation (both platforms)
    - Bundle size check (fail if > threshold)
    - Accessibility lint check
    
  On Merge to Main:
    - All PR checks +
    - Integration tests
    - EAS Build (development profile)
    - Deploy to internal testing
    - Automated screenshot tests
    
  Release Candidate:
    - All main checks +
    - E2E tests (Maestro on device farm)
    - Performance benchmarks
    - Security scan
    - EAS Build (preview profile)
    - Deploy to TestFlight / Internal Testing track
    
  Production Release:
    - Manual approval gate
    - EAS Build (production profile)
    - EAS Submit to App Store / Play Store
    - Staged rollout (10% → 50% → 100%)
    - Health monitoring post-release
```

---

## 43. STATE MANAGEMENT ARCHITECTURE

### 43.1 State Architecture

```
┌─────────────────────────────────────────────────────────┐
│              STATE MANAGEMENT LAYERS                      │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  ┌──────────────────────────────────────────────────┐   │
│  │ SERVER STATE (TanStack Query)                     │   │
│  │                                                   │   │
│  │ • API data caching                               │   │
│  │ • Background refetching                          │   │
│  │ • Optimistic updates                             │   │
│  │ • Pagination / infinite queries                  │   │
│  │ • Query invalidation on mutations                │   │
│  │ • Stale-while-revalidate                         │   │
│  │ • Offline persistence (AsyncStorage adapter)     │   │
│  └──────────────────────────────────────────────────┘   │
│                                                          │
│  ┌──────────────────────────────────────────────────┐   │
│  │ CLIENT STATE (Zustand)                            │   │
│  │                                                   │   │
│  │ • Auth state (tokens, user)                      │   │
│  │ • Navigation state                               │   │
│  │ • UI preferences (theme, language)               │   │
│  │ • Active patient context (family switching)      │   │
│  │ • Connection state (online/offline/syncing)      │   │
│  │ • Feature flags (resolved)                       │   │
│  │ • Module activation state                        │   │
│  └──────────────────────────────────────────────────┘   │
│                                                          │
│  ┌──────────────────────────────────────────────────┐   │
│  │ LOCAL STATE (React useState/useReducer)           │   │
│  │                                                   │   │
│  │ • Form input values                              │   │
│  │ • UI component state (open/closed, tab selection)│   │
│  │ • Animation state                                │   │
│  │ • Transient interaction state                    │   │
│  └──────────────────────────────────────────────────┘   │
│                                                          │
│  ┌──────────────────────────────────────────────────┐   │
│  │ COMPLEX FLOW STATE (XState)                       │   │
│  │                                                   │   │
│  │ • Booking flow state machine                     │   │
│  │ • Telemedicine session state                     │   │
│  │ • Onboarding flow                                │   │
│  │ • Payment flow                                   │   │
│  │ • Emergency activation state                     │   │
│  │ • WebSocket connection state                     │   │
│  └──────────────────────────────────────────────────┘   │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

### 43.2 State Machine Example (Booking Flow)

```typescript
// Booking flow state machine (XState)
const bookingMachine = createMachine({
  id: 'booking',
  initial: 'selectProvider',
  context: {
    provider: null,
    slot: null,
    patient: null,
    paymentMethod: null,
    appointmentType: null,
  },
  states: {
    selectProvider: {
      on: { PROVIDER_SELECTED: 'selectSlot' }
    },
    selectSlot: {
      on: { 
        SLOT_SELECTED: 'confirmDetails',
        BACK: 'selectProvider'
      }
    },
    confirmDetails: {
      on: {
        CONFIRM: 'payment',
        BACK: 'selectSlot'
      }
    },
    payment: {
      on: {
        PAYMENT_SUCCESS: 'confirmed',
        PAYMENT_FAILED: 'paymentError',
        BACK: 'confirmDetails'
      }
    },
    paymentError: {
      on: {
        RETRY: 'payment',
        CANCEL: 'selectSlot'
      }
    },
    confirmed: {
      type: 'final',
      entry: ['addToCalendar', 'showConfirmation']
    }
  }
});
```

### 43.3 Data Flow Patterns

```yaml
Read Pattern (Server → UI):
  1. Screen mounts
  2. TanStack Query hook fires
  3. Check cache → if fresh, use immediately
  4. If stale → show cache + refetch in background
  5. If no cache → show skeleton + fetch
  6. Data arrives → update UI
  7. Background refresh on interval / focus

Write Pattern (UI → Server):
  1. User action (submit form, tap button)
  2. Optimistic update in UI (immediate feedback)
  3. API mutation fires
  4. On success → invalidate related queries
  5. On failure → rollback optimistic update + show error
  
Realtime Pattern (Server → UI push):
  1. WebSocket event received
  2. Event handler determines affected queries
  3. Invalidate/update TanStack Query cache
  4. UI automatically re-renders with new data
  5. Toast/notification for important updates
```

---

## 44. SYNC/CACHE/STORAGE ARCHITECTURE

### 44.1 Storage Layers

```
┌─────────────────────────────────────────────────────────┐
│              STORAGE ARCHITECTURE                         │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  ┌──────────────────────────────────────────────────┐   │
│  │ LAYER 1: SECURE STORAGE (expo-secure-store)       │   │
│  │ Purpose: Credentials, tokens, encryption keys     │   │
│  │ Backend: iOS Keychain / Android Keystore          │   │
│  │ Access: Biometric-gated for sensitive items       │   │
│  │ Size: Small (< 1MB)                              │   │
│  │                                                   │   │
│  │ Stores:                                           │   │
│  │  • refresh_token                                  │   │
│  │  • device_private_key                             │   │
│  │  • database_encryption_key                        │   │
│  │  • biometric_enrollment_status                    │   │
│  │  • app_pin_hash                                   │   │
│  └──────────────────────────────────────────────────┘   │
│                                                          │
│  ┌──────────────────────────────────────────────────┐   │
│  │ LAYER 2: FAST KV STORE (MMKV)                     │   │
│  │ Purpose: Preferences, flags, small cached data    │   │
│  │ Backend: Memory-mapped file                       │   │
│  │ Access: Synchronous (very fast reads)             │   │
│  │ Size: Medium (< 50MB)                            │   │
│  │                                                   │   │
│  │ Stores:                                           │   │
│  │  • user_preferences                               │   │
│  │  • feature_flags (resolved)                       │   │
│  │  • tenant_config (cached)                         │   │
│  │  • last_sync_timestamps                           │   │
│  │  • onboarding_state                               │   │
│  │  • ui_state (tab positions, last screen)          │   │
│  └──────────────────────────────────────────────────┘   │
│                                                          │
│  ┌──────────────────────────────────────────────────┐   │
│  │ LAYER 3: LOCAL DATABASE (WatermelonDB)            │   │
│  │ Purpose: Structured data, offline support, sync   │   │
│  │ Backend: SQLite (encrypted with SQLCipher)        │   │
│  │ Access: Async with reactive queries               │   │
│  │ Size: Large (up to 500MB)                        │   │
│  │                                                   │   │
│  │ Tables:                                           │   │
│  │  • patients, appointments, medications            │   │
│  │  • health_metrics, medication_logs                │   │
│  │  • records (metadata), notifications              │   │
│  │  • ai_conversations, sync_queue                   │   │
│  └──────────────────────────────────────────────────┘   │
│                                                          │
│  ┌──────────────────────────────────────────────────┐   │
│  │ LAYER 4: FILE STORAGE (expo-file-system)          │   │
│  │ Purpose: Documents, images, downloaded reports    │   │
│  │ Backend: Native filesystem                        │   │
│  │ Access: Async file operations                     │   │
│  │ Size: Managed with LRU eviction                  │   │
│  │                                                   │   │
│  │ Directories:                                      │   │
│  │  • /documents/ (downloaded PDFs/reports)          │   │
│  │  • /images/ (cached images)                       │   │
│  │  • /uploads/ (pending uploads queue)              │   │
│  │  • /temp/ (temporary processing)                  │   │
│  └──────────────────────────────────────────────────┘   │
│                                                          │
│  ┌──────────────────────────────────────────────────┐   │
│  │ LAYER 5: QUERY CACHE (TanStack Query)             │   │
│  │ Purpose: API response caching                     │   │
│  │ Backend: In-memory + AsyncStorage persistence     │   │
│  │ Access: Automatic via query hooks                 │   │
│  │ Size: Configurable per query                     │   │
│  │                                                   │   │
│  │ Policies:                                         │   │
│  │  • Fresh data: 30s (frequently changing)          │   │
│  │  • Stale data: 5min (moderate change)             │   │
│  │  • Static data: 24h (rarely changes)              │   │
│  │  • Garbage collection: 5min after last observer   │   │
│  └──────────────────────────────────────────────────┘   │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

### 44.2 Cache Invalidation Strategy

```yaml
Invalidation Triggers:
  Time-Based:
    - staleTime per query type (30s to 24h)
    - Background refresh on app focus
    - Periodic full sync (every 15 minutes if active)
    
  Event-Based:
    - WebSocket event → invalidate specific queries
    - Mutation success → invalidate related queries
    - Push notification → invalidate relevant data
    
  Manual:
    - Pull-to-refresh → invalidate current screen queries
    - Logout → clear all caches
    - Account switch → clear previous context

Cache Priority (What to keep when storage is low):
  Critical (never evict):
    - Emergency card data
    - Active medications
    - Today's appointments
    
  High (evict last):
    - Recent health metrics
    - Active prescriptions
    - Pending sync queue
    
  Normal (evict when needed):
    - Historical records metadata
    - Older notifications
    - AI conversation history
    
  Low (evict first):
    - Downloaded report PDFs
    - Cached images
    - Old health metric data
```

### 44.3 Sync Strategy

```yaml
Sync Approach: Incremental sync with conflict resolution

Pull Sync (Server → Device):
  - On app launch: sync all entities modified since last_sync_at
  - On WebSocket reconnect: catch-up sync
  - On background refresh: incremental pull
  - Pagination: batch of 100 records per entity type
  
Push Sync (Device → Server):
  - Immediate: When online, push changes immediately
  - Queued: When offline, queue in sync_queue table
  - Retry: Failed pushes retried with exponential backoff
  - Priority: Medication logs > Vitals > Other
  
Conflict Resolution:
  Default: Server wins (server has authoritative state)
  Exception: Patient-generated data → last-write-wins with timestamp
  Manual: Rare — surface to user only if truly ambiguous
  
Sync Status UI:
  - Subtle indicator in header (syncing/synced/offline)
  - Last synced time in settings
  - Pending changes count (if offline)
  - "Sync now" manual trigger button
```

---

## 45. DEPLOYMENT/RELEASE STRATEGY

### 45.1 Release Architecture

```yaml
Build System: EAS (Expo Application Services)

Build Profiles:
  development:
    - Debug mode enabled
    - Development server connection
    - All logging enabled
    - Mock services available
    
  preview:
    - Release mode (optimized)
    - Staging API endpoints
    - Internal distribution (TestFlight / Internal Testing)
    - Feature flags: all enabled
    
  production:
    - Release mode (optimized + obfuscated)
    - Production API endpoints
    - Store distribution
    - Feature flags: per tenant configuration

Update Strategy:
  OTA Updates (EAS Update):
    - For JS/asset changes only (no native code changes)
    - Deployed without store review
    - Instant rollout or staged (by percentage)
    - Rollback capability (point to previous update)
    - Use cases: bug fixes, content updates, minor UI changes
    
  Native Updates (Store Release):
    - Required for native module changes
    - Required for Expo SDK upgrades
    - Requires store review (1-3 days)
    - Staged rollout: 10% → 25% → 50% → 100%
    
  Forced Update:
    - For critical security patches
    - For breaking API changes
    - App shows "update required" blocking screen
    - Minimum version enforced by API
```

### 45.2 Release Process

```yaml
Release Cadence:
  Major releases: Bi-weekly (feature releases)
  Patch releases: As needed (bug fixes)
  OTA updates: Multiple per week (minor fixes)
  Hotfixes: Immediate (critical issues)

Release Checklist:
  Pre-Release:
    □ All CI checks passing
    □ E2E tests passing on device farm
    □ Performance benchmarks within budget
    □ Security scan clean
    □ Accessibility audit passed
    □ QA sign-off on release candidate
    □ Changelog prepared
    □ Release notes for stores written
    
  Release:
    □ EAS Build triggered (production profile)
    □ Build submitted to stores
    □ Staged rollout configured (10% initial)
    □ Monitoring dashboards ready
    □ On-call rotation confirmed
    
  Post-Release:
    □ Monitor crash rates (< 0.1% threshold)
    □ Monitor API error rates
    □ Monitor user feedback
    □ 24h stability check before expanding rollout
    □ Full rollout after 48h stability
```

### 45.3 Feature Flag System

```yaml
Feature Flag Architecture:
  Source: Adrine Platform (tenant-configurable)
  Client: Cached locally (MMKV), refreshed periodically
  
  Flag Types:
    Boolean: Simple on/off
    Percentage: Gradual rollout (10% of users)
    User Segment: Based on patient attributes
    Tenant: Per-organization enablement
    
  Usage Pattern:
    // In component
    const { isEnabled } = useFeatureFlag('ai_copilot_v2');
    
    if (isEnabled) {
      return <NewAICopilot />;
    }
    return <CurrentAICopilot />;

  Critical Flags:
    - maintenance_mode: Bypass all features, show maintenance screen
    - force_update: Block app usage until updated
    - kill_switch_{module}: Disable specific module immediately
```

---

## 46. PHASED EXECUTION ROADMAP

### 46.1 Phase Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                    EXECUTION PHASES                               │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  PHASE 0: FOUNDATION                                             │
│  ───────────────────                                             │
│  Core infrastructure, auth, design system, basic profile         │
│                                                                   │
│  PHASE 1: CORE HEALTHCARE                                        │
│  ────────────────────────                                        │
│  Appointments, records viewing, basic notifications              │
│                                                                   │
│  PHASE 2: ACTIVE HEALTH MANAGEMENT                               │
│  ────────────────────────────────                                │
│  Medications, lab results, pharmacy, payments                    │
│                                                                   │
│  PHASE 3: AI & INTELLIGENCE                                      │
│  ──────────────────────────                                      │
│  AI copilot, insights, health metrics, wearables                 │
│                                                                   │
│  PHASE 4: CONNECTED CARE                                         │
│  ────────────────────────                                        │
│  Telemedicine, family management, workflows                      │
│                                                                   │
│  PHASE 5: ECOSYSTEM                                              │
│  ──────────────────                                              │
│  Marketplace, voice, advanced AI, third-party integrations       │
│                                                                   │
└─────────────────────────────────────────────────────────────────┘
```

### 46.2 Phase 0: Foundation

```yaml
Goal: Establish the technical foundation and core infrastructure

Deliverables:
  Project Setup:
    - React Native + Expo project initialization
    - TypeScript strict configuration
    - ESLint + Prettier setup
    - Project structure (modular architecture)
    - CI/CD pipeline (EAS Build + GitHub Actions)
    
  Design System:
    - Design tokens defined
    - Primitive components (Box, Text, Pressable, Stack)
    - Input components (TextInput, OTP, PhoneInput)
    - Display components (Card, Badge, Avatar, Skeleton)
    - Navigation components (TabBar, Header)
    - Overlay components (BottomSheet, Modal, Toast)
    - Storybook setup for component development
    
  Core Infrastructure:
    - API client with interceptors
    - Token management (secure storage)
    - Authentication flow (phone + OTP)
    - Biometric enrollment
    - Navigation structure (Expo Router)
    - Storage layer (MMKV + Secure Store)
    - Error boundary + crash reporting
    - Analytics foundation
    
  Auth & Identity:
    - Phone number registration
    - OTP verification
    - Basic profile creation (name, DOB, gender)
    - JWT token lifecycle
    - Device trust establishment
    - Biometric login setup
    - Session management
    
  Basic Profile:
    - View/edit profile
    - Profile photo upload
    - Settings screen
    - Notification preferences (basic)
    - Language selection
    - Theme selection (light/dark/system)

Success Criteria:
  - User can register, login, setup biometric
  - App launches in < 2s
  - CI/CD produces builds for both platforms
  - Design system covers 80% of needed components
  - Offline login with biometric works
```

### 46.3 Phase 1: Core Healthcare

```yaml
Goal: Enable basic healthcare interactions

Deliverables:
  Appointments:
    - Provider search and discovery
    - Slot viewing and selection
    - Booking flow (basic)
    - Appointment list (upcoming/past)
    - Appointment detail view
    - Cancellation and reschedule
    - Calendar integration
    - Appointment reminders (push notification)
    
  Records:
    - Records list view (paginated)
    - Record detail view (PDF viewer)
    - Record categorization (labs, prescriptions, others)
    - Document upload (camera + gallery)
    - Basic search
    - Download for offline
    
  Notifications:
    - Push notification registration (FCM/APNs)
    - In-app notification center
    - Appointment reminders
    - New record notifications
    - Deep linking from notifications
    
  Provider Profile:
    - Provider detail view
    - Provider ratings/reviews (view)
    - Provider availability
    - Provider contact info
    
  Multi-Tenant:
    - Tenant configuration fetching
    - Tenant-aware API requests
    - Basic tenant-specific branding

Success Criteria:
  - Patient can book appointment end-to-end
  - Patient can view all records from connected providers
  - Push notifications delivered reliably
  - Works across multiple tenants
```

### 46.4 Phase 2: Active Health Management

```yaml
Goal: Enable patients to actively manage their health

Deliverables:
  Medications:
    - Active medication list
    - Medication detail view
    - Medication reminders (scheduled notifications)
    - Adherence logging (taken/skipped)
    - Adherence history and stats
    - Medication schedule (daily view)
    
  Lab Results:
    - Structured lab result display
    - Parameter-level view with reference ranges
    - Abnormal value highlighting
    - Basic trend view (same parameter over time)
    - Share report functionality
    
  Pharmacy:
    - View prescriptions
    - Order medications (from prescription)
    - Pharmacy store finder
    - Order tracking
    - Refill requests
    
  Payments:
    - View outstanding bills
    - Bill detail (itemized)
    - Payment flow (UPI + Cards)
    - Payment history
    - Receipt generation
    - Saved payment methods
    
  Offline Foundation:
    - WatermelonDB setup
    - Offline access to medications, appointments, emergency card
    - Sync engine (basic push/pull)
    - Offline medication logging (queued)
    - Connection state indicators

Success Criteria:
  - Medication adherence tracking working daily
  - Lab results displayed with clinical context
  - Payments processed successfully
  - Core data available offline
```

### 46.5 Phase 3: AI & Intelligence

```yaml
Goal: Introduce AI-native experiences

Deliverables:
  AI Copilot:
    - Chat interface (text-based)
    - Streaming responses (SSE)
    - Contextual AI (knows patient data)
    - Lab result interpretation
    - Medication explanations
    - Health questions (general)
    - Action buttons in AI responses
    - Conversation history
    
  Health Metrics:
    - Manual vitals logging (BP, glucose, weight, temperature)
    - Metric visualization (charts, trends)
    - Goal setting
    - Anomaly alerts (basic threshold-based)
    
  Wearables (Basic):
    - Apple HealthKit integration (read)
    - Google Health Connect integration (read)
    - Steps, heart rate, sleep data sync
    - Display within health metrics
    
  Health Dashboard:
    - Personalized home screen cards
    - Health score (basic calculation)
    - Today's schedule card
    - Active alerts
    - AI insight cards
    
  Smart Notifications:
    - AI-timed medication reminders
    - Contextual health nudges
    - Smart quiet hours

Success Criteria:
  - AI copilot answers health questions with context
  - Health metrics tracking and visualization working
  - Wearable data flowing into health dashboard
  - Home screen feels personalized and dynamic
```

### 46.6 Phase 4: Connected Care

```yaml
Goal: Enable full care ecosystem interactions

Deliverables:
  Telemedicine:
    - Video consultation (WebRTC)
    - Audio-only consultation
    - Pre-session device check
    - Waiting room
    - In-session chat
    - Post-session summary
    - Network quality adaptation
    
  Family Management:
    - Add family members
    - Role and permission configuration
    - Context switching
    - Family health dashboard
    - Caregiver delegation
    - Minor/dependent management
    
  Workflows:
    - Workflow card on home screen
    - Workflow detail view (phase timeline)
    - Patient action execution
    - Status updates and tracking
    - Multi-step workflow support
    
  Insurance:
    - Policy management (view/add)
    - Coverage check at booking
    - Pre-authorization flow
    - Claim submission
    - Claim tracking
    
  Emergency:
    - SOS button and flow
    - Emergency medical card
    - Emergency contact alerts
    - Nearest facility finder
    - Lock screen widget
    
  Realtime:
    - WebSocket connection management
    - Live appointment status updates
    - Live queue position
    - Realtime chat in telemedicine

Success Criteria:
  - Telemedicine consultations working end-to-end
  - Family members can be managed with proper permissions
  - Workflows guide patients through complex processes
  - Emergency SOS functional in < 3 seconds
```

### 46.7 Phase 5: Ecosystem

```yaml
Goal: Become a healthcare super-app platform

Deliverables:
  Voice Interaction:
    - Voice input for AI copilot
    - Voice commands for common actions
    - Multilingual voice support (Hindi, English)
    - TTS responses
    
  Advanced AI:
    - Proactive health insights (AI-initiated)
    - Predictive alerts
    - Health journey AI guidance
    - Symptom triage
    - Drug interaction intelligence
    - Personalized health recommendations
    
  Healthcare Journeys:
    - Journey tracking UI
    - Multi-workflow orchestration
    - Milestone tracking
    - AI-guided journey progression
    
  BLE Device Integration:
    - Direct BP monitor pairing
    - Direct glucometer pairing
    - Device management UI
    - Automatic reading sync
    
  Advanced Features:
    - Health timeline (full longitudinal view)
    - Health graph connections
    - Document OCR and AI extraction
    - Comprehensive analytics dashboard
    - White-label support
    - Third-party mini-program framework (design)
    
  Localization:
    - Hindi language support
    - Additional Indic languages
    - Cultural adaptation

Success Criteria:
  - Voice interaction working in English + Hindi
  - AI proactively guides patient health management
  - Complete patient health timeline available
  - BLE devices pair and sync reliably
  - App localized for Hindi users
```

### 46.8 Module Prioritization Summary

```yaml
What Comes First (Foundation):
  - Authentication & Identity
  - Design System
  - API Client & Networking
  - Navigation Shell
  - Storage Infrastructure
  - Push Notifications Base
  - Error Handling & Monitoring

What Comes Next (Core Value):
  - Appointments (primary use case)
  - Records Viewing (immediate value)
  - Medication Management (daily engagement)
  - Payments (revenue enabler)
  - Pharmacy (transaction value)

What Comes in Middle (Intelligence):
  - AI Copilot (differentiation)
  - Health Metrics (engagement)
  - Smart Notifications (retention)
  - Wearables (data richness)
  - Telemedicine (complete care)

What Comes Later (Ecosystem):
  - Voice Interaction
  - Healthcare Journeys
  - Marketplace
  - Third-party integrations
  - Advanced AI agents
  - White-label system

What Should Remain Modular:
  - Every healthcare domain (appointments, pharmacy, labs, etc.)
  - AI capabilities
  - Payment providers
  - Wearable integrations
  - Telemedicine providers
  - Insurance integrations

What Should Be Configurable by Organizations:
  - Feature enablement per module
  - Business rules (cancellation policy, advance booking days)
  - Branding (colors, logos, names)
  - Workflow definitions
  - Notification templates
  - Payment methods available
  - Integration endpoints

What Should Be Reusable (SDK/Libraries):
  - Adrine Design System package
  - Auth SDK
  - API Client SDK
  - Realtime Client SDK
  - Analytics SDK
  - Storage/Sync SDK
  - Push Handler SDK
  - Biometric SDK

What Should Be Platform Primitives:
  - Identity & Auth Service
  - Notification Delivery
  - Event Bus
  - Workflow Engine
  - AI Gateway
  - Document Processing
  - Payment Processing
  - Consent Management
  - Feature Flags
  - Multi-tenant Configuration

What Should Remain App-Level Only:
  - Home dashboard composition
  - Navigation patterns
  - Specific screen layouts
  - Onboarding flow design
  - Family switching UX
  - Emergency card design
  - Health visualization patterns
  - AI chat interface
```

---

## APPENDIX A: KEY ARCHITECTURAL DECISIONS

| # | Decision | Choice | Rationale |
|---|----------|--------|-----------|
| 1 | Framework | React Native + Expo | Cross-platform, fast iteration, OTA updates |
| 2 | Navigation | Expo Router (file-based) | Convention over configuration, deep linking |
| 3 | State | Zustand + TanStack Query + XState | Each tool for its strength |
| 4 | Local DB | WatermelonDB | Offline-first, reactive, sync-capable |
| 5 | Fast KV | MMKV | Synchronous, fast, simple |
| 6 | Styling | NativeWind (Tailwind) | Utility-first, fast development, consistent |
| 7 | Animation | Reanimated 3 | 60 FPS, runs on UI thread |
| 8 | Forms | React Hook Form + Zod | Performance, validation, type safety |
| 9 | API | REST-first (GraphQL optional) | Simpler, better caching, standard |
| 10 | Realtime | WebSocket + SSE | WS for bidirectional, SSE for AI streaming |
| 11 | Testing | Jest + Maestro | Unit + E2E coverage |
| 12 | CI/CD | EAS + GitHub Actions | Native builds + automation |
| 13 | Monitoring | Sentry + custom analytics | Crash reporting + business metrics |
| 14 | Security | Certificate pinning + encrypted DB | Healthcare-grade security |
| 15 | AI | Adrine AI Gateway (SSE) | Streaming, contextual, safe |

---

## APPENDIX B: NON-FUNCTIONAL REQUIREMENTS

| Requirement | Target | Measurement |
|-------------|--------|-------------|
| App Launch Time | < 2 seconds | Cold start to interactive |
| Screen Transition | < 300ms | Navigation animation complete |
| API Response (P95) | < 500ms | Time to first byte |
| Frame Rate | 60 FPS | During scroll and animation |
| Crash-Free Rate | > 99.9% | Sessions without crash |
| Offline Availability | Core features | Medications, records, emergency |
| Accessibility | WCAG 2.1 AA | Automated + manual audit |
| Security | HIPAA + DISHA | Annual penetration test |
| Uptime (Platform) | 99.99% | Excluding maintenance |
| Push Delivery | > 98% | Delivery rate to online devices |
| Bundle Size | < 50 MB | Initial download |
| Memory Usage | < 200 MB | Active session |
| Battery Impact | < 5% / hour | Active use |

---

## APPENDIX C: RISK REGISTER

| Risk | Impact | Likelihood | Mitigation |
|------|--------|-----------|------------|
| Platform API instability during early phases | HIGH | MEDIUM | API versioning, client resilience, mock services |
| React Native performance issues with complex health viz | MEDIUM | MEDIUM | Native modules for charts, performance profiling |
| Offline sync conflicts causing data loss | HIGH | LOW | Conservative sync strategy, server-wins default |
| Regulatory compliance issues | HIGH | LOW | Legal review, consent framework, audit trail |
| User adoption resistance (elderly) | MEDIUM | HIGH | Progressive disclosure, voice, local language |
| Third-party SDK reliability (video, BLE) | MEDIUM | MEDIUM | Abstraction layer, fallbacks, monitoring |
| Store rejection (health claims) | MEDIUM | LOW | Conservative health language, disclaimers |
| Data breach | CRITICAL | LOW | Multi-layer security, encryption, monitoring |

---

## APPENDIX D: SUCCESS METRICS

```yaml
Product Metrics:
  Activation:
    - Registration completion rate > 85%
    - First appointment booked within 7 days > 40%
    - Profile completion > 60%
    
  Engagement:
    - DAU/MAU ratio > 30%
    - Weekly active sessions > 3
    - Medication logging daily rate > 70% (for active patients)
    
  Retention:
    - D7 retention > 60%
    - D30 retention > 40%
    - D90 retention > 30%
    
  Task Completion:
    - Appointment booking success rate > 90%
    - Payment success rate > 95%
    - Telemedicine session completion > 85%
    
  Health Outcomes (Long-term):
    - Appointment attendance rate > 85%
    - Medication adherence improvement > 20%
    - Preventive care compliance > 50%
    - Emergency visit reduction > 10%

Technical Metrics:
  Performance:
    - App launch < 2s (P95)
    - Screen load < 500ms (P95)
    - API call success rate > 99.5%
    - Crash-free rate > 99.9%
    
  Reliability:
    - Offline functionality coverage > 60%
    - Sync success rate > 99.9%
    - Push notification delivery > 98%
    - Real-time latency < 200ms (P95)
```

---

*End of Adrine Patient Super App Master Plan v1.0*

*This document serves as the complete architectural blueprint. Individual systems should be detailed further in dedicated design documents during implementation phases.*