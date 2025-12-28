# Cinescope 🎬

Cinescope is a modern, responsive movie application built with **Next.js 14**, **TypeScript**, and **Tailwind CSS**. It leverages the TMDB (The Movie Database) API to provide users with up-to-date information on trending, top-rated, action, and comedy movies.

## 🚀 Features

- **Dynamic Hero Section**: featuring a carousel of trending movies with backdrops, descriptions, and ratings.
- **Movie Categories**: Browse movies by categories such as Trending, Top Rated, Action, and Comedy.
- **Responsive Design**: Fully responsive layout optimized for mobile, tablet, and desktop devices.
- **Modern UI**: Sleek, dark-themed interface inspired by popular streaming platforms, built with Tailwind CSS.
- **Interactive Elements**: Smooth transitions, hover effects, and touch-enabled carousel for mobile.

## 🛠️ Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **API Client**: [Axios](https://axios-http.com/)
- **Data Source**: [The Movie Database (TMDB) API](https://www.themoviedb.org/)

## 📦 Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/cinescope.git
   cd cinescope
   ```

2. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Configure Environment Variables:**
   Create a `.env.local` file in the root directory and add your TMDB API Key:
   ```env
   NEXT_PUBLIC_TMDB_API_KEY=your_tmdb_api_key_here
   ```
   > You can get an API key by signing up at [themoviedb.org](https://www.themoviedb.org/).

4. **Run the development server:**
   ```bash
   npm run dev
   ```

5. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000) to see the application running.

## 📂 Project Structure

```
cinescope/
├── app/                  # Next.js App Router pages
│   ├── layout.tsx        # Root layout
│   └── page.tsx          # Homepage
├── components/           # Reusable UI components
│   ├── Hero.tsx          # Hero carousel component
│   ├── MovieRow.tsx      # Horizontal movie list component
│   ├── Navbar.tsx        # Navigation bar
│   ├── MainView.tsx      # Main content container
│   ├── Modal.tsx         # Modal component (if implemented)
│   └── IntroLoader.tsx   # Loading animation
├── lib/                  # Utility functions and API calls
│   └── tmdb.ts           # TMDB API definitions and fetchers
├── public/               # Static assets
└── ...
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).
