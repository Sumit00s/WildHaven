# Wild Haven 🌲  
*Cabin Reservation Booking Platform*

Wild Haven is a modern full-stack web application that allows users to discover, explore, and reserve remote cabins for peaceful getaways. Built with Next.js, Supabase, and Tailwind CSS, the platform supports seamless authentication using NextAuth and Google OAuth.

---

## 🚀 Features

- 🏕 Explore and reserve beautiful cabins  
- 🔐 Authentication with NextAuth & Google OAuth  
- 📆 Book only **available cabins** for specific dates  
- ✏️ Manage your reservations: **update** or **cancel** bookings  
- 💾 Real-time data with Supabase  
- 📱 Mobile-friendly and responsive UI  
- 📂 User-specific booking history
---

## 🛠 Tech Stack

| Technology         | Role |
|--------------------|------|
| **Next.js**         | Full-stack React framework |
| **Supabase**        | Backend-as-a-service (auth, database, storage) |
| **Tailwind CSS**    | Utility-first CSS styling |
| **NextAuth.js**     | Authentication with email/Google OAuth |

---

## 📦 Project Setup

To run Wild Haven locally, follow these steps:

```bash
# 1. Clone the repository
git clone https://github.com/Sumit00s/WildHaven.git
cd WildHaven

# 2. Install dependencies
npm install

# 3. Create .env.local file and add the following environment variables:

SUPABASE_URL=
SUPABASE_KEY=

NEXTAUTH_URL=
NEXTAUTH_SECRET=

AUTH_GOOGLE_ID=
AUTH_GOOGLE_SECRET=

# 4. Run the development server
npm run dev
