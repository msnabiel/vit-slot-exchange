
---

# VIT Slot Exchange – Simplify Your Timetable Swaps

A smart platform built for VIT students to seamlessly exchange class slots. Whether you're looking to swap lab timings or find a better theory slot, VIT Slot Exchange makes it easy, anonymous, and efficient.

## Features

🔁 **Find Mutual Slot Matches** – Quickly discover students who want to swap the exact slot you have
🔍 **Filter by course, faculty, slot, or timing** – Smart filters to help narrow down ideal matches
👤 **Anonymous Identity** – No login required; identities remain hidden until mutual match
📅 **ShadCN-styled interactive cards** – Modern and responsive UI for a clean browsing experience
📈 **Track exchange activity** – See how many people are looking for your slot
📬 **Get notified** (optional) – Add your email to get updates when a match is found
⭐ **Faculty Cabin Ratings** – View and rate faculty cabin experience on a 1–5 scale

## Getting Started

Follow these steps to get the app up and running locally:

### 1. Clone the repository

```bash
git clone https://github.com/msnabiel/vit-slot-exchange.git
cd vit-slot-exchange
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env` file at the root with your Supabase details:

```env
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```

### 4. Run the development server

```bash
npm run dev
```

### 5. Open in your browser

Visit [http://localhost:3000](http://localhost:3000) to use the app.

## Customization

* Update course & slot list from the Supabase table
* Add new features like in-app messaging or QR-based meetups
* Customize UI themes using Tailwind + ShadCN components
* Integrate Gemini API for smart match suggestions *(optional)*

## Why VIT Slot Exchange?

Built **by a VITian, for VITians**. The platform removes the chaos of Telegram groups and random Excel sheets by offering a clean, student-first experience to find the exact exchange you need – no spam, no hassle.

## Contributing

We welcome contributors! You can:

1. [Open an issue](https://github.com/msnabiel/vit-slot-exchange/issues)
2. Submit a pull request with a feature/fix
3. Share feedback for improvements

---

Let me know if you want to add badges, installation GIFs, or Supabase schema details.
