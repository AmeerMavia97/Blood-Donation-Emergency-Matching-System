# BloodBridge Dashboard

BloodBridge is a React + Vite web application for managing blood donation requests, donors, and hospital verifications. It provides role-based dashboards for **Donors**, **Patients**, **Hospital Verifiers**, and **Blood Banks**.

## Features

### Donor Dashboard
- Update donor profile (blood group, location, availability, phone, consent to share contact).
- View blood requests matching donor’s blood group and location.
- Accept or reject blood requests.
- Track donation history.

### Patient Dashboard
- Create blood requests specifying blood group, units, hospital, and emergency notes.
- View matched donors filtered by eligibility, city, and availability.
- Track donor acceptance and contact status.

### Hospital Verifier Dashboard
- View pending blood requests for hospital.
- Verify requests and update status to **verified**.
- Track verified requests and alerts (duplicate or fake requests).

### Blood Bank Dashboard
- Track available blood units.
- Respond to blood requests.
- Manage inventory and reservations.

### Volunteer Dashboard
- Manage service area and tasks.
- Support donor and patient communication.

## Tech Stack
- **Frontend:** React, Vite, TailwindCSS
- **State Management & Data Fetching:** React Query
- **Forms & Validation:** React Hook Form
- **Icons:** Lucide React
- **Backend & DB:** Supabase (PostgreSQL)
- **Routing:** React Router

## Folder Structure
src/
├─ Components/          # Shared components and layouts
├─ Screens/             # Role-specific dashboard screens
│  ├─ Donor/
│  ├─ Patient/
│  ├─ Verifier/
│  └─ BloodBank/
├─ Configuration/       # Supabase client setup
├─ services/            # API functions
└─ App.jsx

## Database Schema Overview

### Tables

#### profiles
- id (UUID) – Primary key
- full_name (text)
- email (text)
- phone (text)
- role (text) – donor, patient, hospital_verifier, blood_bank, volunteer
- city (text)
- created_at (timestamp)

#### donors
- id (UUID) – Primary key
- profile_id (UUID) – FK to profiles
- blood_group (text)
- location (text)
- phone (text)
- availability (boolean)
- consent_phone (boolean)
- last_donation_date (timestamp)
- created_at (timestamp)

#### blood_requests
- id (UUID) – Primary key
- profile_id (UUID) – FK to patient
- patient_name (text)
- required_blood_group (text)
- units_required (integer)
- hospital_name (text)
- status (text) – pending, verified, matched, fulfilled, rejected
- emergency_notes (text)
- created_at (timestamp)

#### hospital_verified
- id (UUID)
- profile_id (UUID) – FK to profiles
- hospital_name (text)
- city (text)
- license_number (text)
- created_at (timestamp)

#### donations
- id (UUID)
- donor_id (UUID) – FK to donors
- blood_group (text)
- hospital_name (text)
- donation_date (timestamp)

## Relationships

profiles 1 --- 1..* donors
profiles 1 --- 1..* blood_requests
profiles 1 --- 1 hospital_verified
donors 1 --- 1..* donations
blood_requests hospital_name --- hospital_verified.hospital_name

## How to Run

1. Clone the repository
2. Install dependencies:
```
npm install
```
3. Configure `.env` with Supabase credentials.
4. Start the dev server:
```
npm run dev
```
5. Access the application at `http://localhost:5173`

## Notes
- Role-based route protection.
- Expand blood request matching with automatic notifications.
- Analytics dashboards for admins.
- Mobile responsiveness and testing.