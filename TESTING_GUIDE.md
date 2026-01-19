# VidGrab Frontend - Complete Setup & Testing Guide

## Project Overview

VidGrab Frontend is a modern, responsive Next.js 14+ web application for downloading videos from any platform (YouTube, TikTok, Instagram, etc.). It's a **client-side only** application that integrates with the VidGrab backend API via `fetch` calls.

**Backend API:** https://vidgrab-server.onrender.com

---

## ✅ Project Structure

```
/
├── app/
│   ├── layout.tsx          # Root layout with theme provider & service worker
│   ├── page.tsx            # Main application page (client-side)
│   └── globals.css         # Global styles + cool theme support
├── components/
│   ├── InputForm.tsx       # URL input form component
│   ├── MetadataDisplay.tsx # Video metadata & thumbnails display
│   ├── FormatSelector.tsx  # Format selection dropdown
│   ├── SettingsModal.tsx   # Theme settings modal/sidebar
│   ├── ProgressBar.tsx     # Progress bar for loading states
│   └── Alert.tsx           # Error & success alert components
├── lib/
│   └── theme-context.tsx   # Theme management (light/dark/cool modes)
├── public/
│   ├── manifest.json       # PWA manifest file
│   ├── sw.js              # Service worker for PWA
│   └── icon.svg           # App icon (blue play + download arrow)
├── .env.local             # Environment variables (backend URL)
├── tailwind.config.ts     # Tailwind CSS configuration
├── next.config.ts         # Next.js configuration
├── tsconfig.json          # TypeScript configuration
└── package.json           # Dependencies (react-icons, nprogress, @headlessui/react)
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ (included in dev container)
- npm or yarn

### Installation & Running

1. **Install dependencies** (already done):
   ```bash
   cd /workspaces/vid_grab
   npm install
   ```

2. **Start development server**:
   ```bash
   npm run dev
   ```
   The app will be available at **http://localhost:3000**

3. **Build for production**:
   ```bash
   npm run build
   npm start
   ```

---

## 🧪 Testing the Application

### Test Case 1: Basic UI & Theme Switching
1. Open http://localhost:3000
2. Verify the app loads with:
   - VidGrab header with title and description
   - Centered URL input field with placeholder text
   - "Fetch Video Info" button
   - Settings icon (gear) in top-right corner
3. Click the settings icon to open the settings modal
4. Test theme switching:
   - Click **"Light"** - UI should turn white/light gray
   - Click **"Dark"** - UI should turn dark gray/black
   - Click **"Cool"** - UI should show gradient background (dark to purple)
5. Refresh the page - your theme choice should persist (localStorage)
6. Close the modal by clicking the X or outside the modal

### Test Case 2: Fetch Video Metadata
1. In the URL input field, enter a YouTube URL:
   ```
   https://www.youtube.com/watch?v=dQw4w9WgXcQ
   ```
2. Click "Fetch Video Info" button
3. **Expected behavior:**
   - A progress bar should appear at the top (thin blue line)
   - "Fetching..." button should be disabled
   - After a few seconds, you should see:
     - Video title
     - Video thumbnail image
     - List of available formats (quality, ext, size)
     - A format selector dropdown
     - A "Download" button
4. A success alert should appear: "Video info fetched successfully!"

### Test Case 3: Format Selection & Download
1. After fetching metadata (from Test Case 2):
2. Click the format selector dropdown
3. Choose a different format (e.g., "720p - mp4")
4. The selected format should be highlighted in blue
5. Click the **"Download"** button
6. **Expected behavior:**
   - A progress bar should animate
   - "Download..." button state should show
   - The download should be triggered (check your browser's download folder)
   - A success message: "Download started! Check your downloads folder."

### Test Case 4: Error Handling
1. Enter an **invalid URL** in the input field:
   ```
   not a valid url
   ```
2. Click "Fetch Video Info"
3. **Expected behavior:**
   - An error alert should appear: "Invalid URL. Please enter a valid web address."
4. Try entering a **non-video URL**:
   ```
   https://example.com
   ```
5. Click "Fetch Video Info"
6. **Expected behavior:**
   - An error message from the backend (e.g., "No formats available for this video")
   - Error alert appears in red

### Test Case 5: PWA Installation (Mobile/Chrome)
1. Open http://localhost:3000 on a mobile device or Chrome desktop
2. Look for the "Install" button (usually in address bar or menu)
3. Click to install as a home screen app
4. The app should be installable with:
   - App name: "VidGrab"
   - Icon: Blue play button with download arrow
   - Theme color: Blue (#007bff)
   - Display: Standalone (full screen, no URL bar)
5. Once installed, you can use the app offline (cached assets)

### Test Case 6: Responsive Design
1. Open the app on **desktop** (wide screen)
   - Layout should be centered, max-width container
   - Format list should show 2 columns
2. Resize to **tablet** (medium screen)
   - Should adapt gracefully
3. Resize to **mobile** (narrow screen)
   - Should be single column
   - Header and buttons should be responsive
   - Settings modal should open from the side (on narrow screens, it takes full width)

### Test Case 7: Progress Bar Visibility
1. During any fetch or download operation:
   - A **thin blue progress bar** should appear at the very top of the page
   - It should animate from left to right (showing progress)
   - It should disappear when the operation completes

---

## 🎨 Theme Details

### Light Mode (Default)
- White background
- Dark gray text
- Blue accent colors (#007bff)

### Dark Mode
- Dark gray background (#111827)
- White text
- Blue accent colors with dark adjustments

### Cool Mode (Neon/Cyberpunk)
- Gradient background (dark gray to purple)
- White text
- Blue-to-purple gradient accents
- Purple borders on some elements

---

## 📝 API Integration

### Backend Endpoints Used

1. **POST /info** - Fetch video metadata
   ```javascript
   const response = await fetch(`${BACKEND_URL}/info`, {
     method: 'POST',
     headers: { 'Content-Type': 'application/json' },
     body: JSON.stringify({ url: userUrl })
   });
   // Returns: { title, thumbnail, formats: [...] }
   ```

2. **GET /download** - Download video
   ```javascript
   const downloadUrl = `${BACKEND_URL}/download?url=${encodeURIComponent(url)}&format=${format}`;
   // Triggers browser download
   ```

### Environment Variables
- `NEXT_PUBLIC_BACKEND_URL` = `https://vidgrab-server.onrender.com`
  - Configured in `.env.local`

---

## 🛠️ Key Features Implemented

✅ **Next.js 14+ with App Router**
- Server and client components
- Dynamic rendering for interactive features
- Optimized builds with Turbopack

✅ **TypeScript**
- Full type safety throughout
- Interfaces for metadata, formats, and state

✅ **Tailwind CSS**
- Responsive design
- Dark mode support (class-based)
- Cool theme via custom CSS

✅ **PWA Ready**
- `manifest.json` with icons and theme color
- Service worker (`sw.js`) for offline support
- Add to Home Screen prompt enabled
- Installable on mobile devices

✅ **React Hooks**
- `useState` for state management
- `useEffect` for side effects (theme loading, service worker registration)
- Custom `useTheme` hook for theme management

✅ **Accessibility**
- ARIA labels on buttons and interactive elements
- `aria-invalid` and `aria-describedby` for form validation
- Semantic HTML structure

✅ **Error Handling**
- User-friendly error alerts
- URL validation before submission
- Backend error message display

✅ **Progress Indication**
- Custom progress bar component
- Event-driven progress updates
- Visual feedback for long-running operations

✅ **Icons**
- `react-icons` (MdSettings, MdDownload)
- Simple SVG icon for the app

✅ **Performance**
- Lazy loading for images (`loading="lazy"`)
- Optimized CSS with Tailwind
- Client-side only (no unnecessary server rendering)

---

## 📱 Development Tools

### Available Scripts
```bash
npm run dev      # Start development server (port 3000)
npm run build    # Create production build
npm start        # Start production server
npm run lint     # Run ESLint
```

### File Locations
- **Main App:** `app/page.tsx`
- **Theme Logic:** `lib/theme-context.tsx`
- **Components:** `components/`
- **Styles:** `app/globals.css` + Tailwind classes
- **Config:** `tailwind.config.ts`, `next.config.ts`

---

## 🔍 Troubleshooting

### Issue: "Backend error" when fetching video info
- **Cause:** Backend API might be unavailable or URL is incompatible
- **Solution:** Verify the backend is running and the URL is from a supported platform

### Issue: Service Worker not registering
- **Cause:** HTTPS required in production (localhost works in dev)
- **Solution:** In production, deploy on HTTPS domain

### Issue: Theme not persisting
- **Cause:** localStorage disabled or privacy mode
- **Solution:** Check browser settings; in private mode, theme resets on refresh

### Issue: Download not triggering
- **Cause:** Browser popup blocker or CORS issues
- **Solution:** Check browser console; whitelist the app if in popup blocker

---

## 🚀 Deployment

To deploy this frontend:

1. **Vercel (Recommended)**
   ```bash
   npm install -g vercel
   vercel
   ```

2. **Any static hosting** (after `npm run build`)
   - Output: `.next/` folder
   - Requires Node.js runtime

3. **Environment**
   - Set `NEXT_PUBLIC_BACKEND_URL` in your hosting environment
   - Example: `NEXT_PUBLIC_BACKEND_URL=https://vidgrab-server.onrender.com`

---

## 📚 Code Quality

- **ESLint:** Configured with Next.js rules
- **TypeScript:** Strict mode enabled
- **Clean Code:** Comments on complex functions, readable component structure
- **Component Organization:** Separated concerns (UI, state, API)

---

## ✨ Summary

Your VidGrab Frontend is now **fully functional** with:
- ✅ Modern responsive UI
- ✅ Three theme modes (light, dark, cool)
- ✅ PWA capabilities
- ✅ Client-side only architecture
- ✅ Full error handling
- ✅ TypeScript type safety
- ✅ Accessibility features

**Next step:** Test with the VidGrab backend API and enjoy downloading videos! 🎉

---

**Last Updated:** January 19, 2026
**Version:** 1.0
