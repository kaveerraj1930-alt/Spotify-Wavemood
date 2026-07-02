# 🎵 Spotify WaveMood

> An AI-powered, mood-based Spotify music recommendation platform that adapts to your feelings and curates the perfect soundtrack for your day. Fully accessible across all network devices (mobiles, tablets, laptops).

---

## 🚀 Live Product Link

Access the live application from **any device (phone, tablet, laptop)** in the world:

🔗 **[Spotify WaveMood Public Tunnel](https://4492f5b5ad5613ae-106-219-121-13.serveousercontent.com)**

*(Note: When launching the link for the first time, click the **Continue to Site** button to bypass the browser warning page and access the application dashboard.)*

---

## 🔌 System Integration & Architecture

The diagram below shows the flow of authentication, requests, and data between the frontend, backend, and the external Spotify API:

![Spotify WaveMood Architecture](wavemood_architecture.png)

---

## ✨ Features

- **🎭 Mood-Based Curation**: Dynamically generates track recommendations tailored to specific moods (e.g., Happy, Energetic, Sad, Chill, Focus, Workout).
- **🔒 Spotify Integration**: Seamless OAuth authentication flow to securely authorize your Spotify account and display real profile details.
- **🎨 Premium UI/UX**: Stunning Spotify-inspired dark mode user interface featuring smooth glassmorphism effects, loading skeleton states, responsive sidebars, and micro-animations.
- **🎧 Audio Preview Player**: Listen to high-quality audio previews of recommended tracks directly from the app interface.
- **💾 Recent Mood History**: Tracks and persists your recently selected moods across sessions using Zustand middleware.
- **📅 Custom Playlist Export**: Instantly export recommended tracks directly into a new playlist on your Spotify account.
- **📱 Cross-Device Accessibility**: Bound to all network interfaces with an HTTPS tunnel for testing on mobile Safari, Chrome, and tablets.

---

## 🛠️ Technology Stack

### Frontend
- **Framework**: React (Vite-powered)
- **Styling**: Tailwind CSS & Glassmorphism design tokens
- **Animations**: Framer Motion
- **State Management**: Zustand (with local storage persistence)
- **Icons**: Lucide React
- **API Client**: Axios

### Backend
- **Framework**: Node.js & Express
- **API Integration**: Spotify Web API
- **Session Management**: express-session (secure cookie management)

---

## 💻 Local Setup & Development (Automated)

We have created an automated PowerShell script to make local development and multi-device testing extremely simple.

### 1. Prerequisites
Ensure you have **Node.js (v18+)** installed.

### 2. Run the Dev/Preview Server
1. Open a PowerShell terminal in the project root directory.
2. Run the startup script:
   ```powershell
   .\start-wavemood.ps1
   ```
3. Choose one of the connection modes:
   * **[Option 1] Local Wi-Fi mode (Recommended for Home Testing)**: Starts servers locally and outputs your laptop's Wi-Fi IP address. You can load and use the app on any phone, tablet, or device connected to your home Wi-Fi network instantly with 100% uptime.
   * **[Option 2] Persistent Serveo Tunnel**: Asks you for a custom subdomain (e.g. `wavemood-kaveer`) and starts the tunnel in an auto-reconnecting loop, keeping the public URL permanent and recovering immediately if dropped.
   * **[Option 3] Cloudflare Quick Tunnel**: Automatically downloads the secure `cloudflared` client and launches a Cloudflare Tunnel with unlimited capacity, no rate limits, and no warning landing pages.

*Follow the terminal outputs for how to update your Spotify Developer Dashboard settings and backend `.env` file based on the option you choose.*

---

## ☁️ Permanent Production Cloud Deployment [RECOMMENDED]

To make your application **permanently workable** and accessible 24/7 on any device in the world without requiring your laptop to remain open or running local tunnels, you can deploy it to the cloud for free using Render (backend) and Vercel (frontend).

### Phase A: Deploy the Backend on Render
1. Sign up for a free account at [Render](https://render.com).
2. Click **New** -> **Web Service** and connect your GitHub repository (`Spotify-Wavemood`).
3. Set the following details:
   * **Name**: `wavemood-backend`
   * **Root Directory**: `spotify-mood-app/backend`
   * **Build Command**: `npm install`
   * **Start Command**: `node src/server.js`
4. Add the following **Environment Variables**:
   * `SPOTIFY_CLIENT_ID`: *Your Spotify Client ID*
   * `SPOTIFY_CLIENT_SECRET`: *Your Spotify Client Secret*
   * `SPOTIFY_REDIRECT_URI`: `https://wavemood-backend.onrender.com/api/auth/callback` (replace with your actual Render service URL once generated)
   * `SESSION_SECRET`: *Any long random password string*
   * `PORT`: `3001`
   * `FRONTEND_URL`: `https://wavemood.vercel.app` (replace with your actual Vercel URL once generated)
5. Click **Deploy Web Service**. Once deployed, copy your Render Web Service URL (e.g., `https://wavemood-backend.onrender.com`).

### Phase B: Configure and Deploy Frontend on Vercel
1. In your local workspace, open `phase-7/vercel.json`.
2. Update the destination URL to point to your deployed Render URL:
   ```json
   {
     "cleanUrls": true,
     "rewrites": [
       {
         "source": "/api/:path*",
         "destination": "https://wavemood-backend.onrender.com/api/:path*"
       },
       {
         "source": "/(.*)",
         "destination": "/index.html"
       }
     ]
   }
   ```
3. Commit and push this change to your GitHub repository:
   ```bash
   git add phase-7/vercel.json
   git commit -m "Configure Vercel API rewrites for production"
   git push origin main
   ```
4. Sign up for a free account at [Vercel](https://vercel.com).
5. Click **Add New** -> **Project** and import your GitHub repository.
6. Configure the following settings:
   * **Root Directory**: `phase-7`
   * **Framework Preset**: `Vite` (automatically detected)
   * **Build Command**: `npm run build`
   * **Output Directory**: `dist`
7. Click **Deploy**. Vercel will build and host your frontend.

### Phase C: Add Callback to Spotify Dashboard
1. Go to your [Spotify Developer Dashboard](https://developer.spotify.com/dashboard) and open your app settings.
2. In the **Redirect URIs** field, add your Render backend callback:
   * `https://wavemood-backend.onrender.com/api/auth/callback` (replace with your actual Render URL)
3. Save the settings.

Now your site is fully online, permanently live, and works flawlessly on any device!

