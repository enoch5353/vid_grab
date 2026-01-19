# VidGrab Frontend

A modern, responsive **Next.js 14+ web application** for downloading videos from any platform. Built with TypeScript, Tailwind CSS, and PWA support.

## 🎯 Features

- **Client-side only** - All API calls via fetch to backend at `https://vidgrab-server.onrender.com`
- **Three Theme Modes** - Light (default), Dark, and Cool (neon/cyberpunk with gradients)
- **PWA Ready** - Fully installable as a mobile app with offline support
- **Responsive Design** - Works seamlessly on desktop, tablet, and mobile
- **Progress Tracking** - Visual progress bar for fetch and download operations
- **Error Handling** - User-friendly error alerts and validation
- **Accessibility** - ARIA labels, semantic HTML, keyboard navigation
- **Performance** - Lazy loading, optimized CSS, dynamic rendering

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation
```bash
cd /workspaces/vid_grab
npm install
```

### Development
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build
```bash
npm run build
npm start
```

## 📁 Project Structure

```
app/
├── layout.tsx          # Root layout with theme provider & PWA setup
├── page.tsx           # Main application page
└── globals.css        # Global styles & cool theme

components/
├── InputForm.tsx      # URL input form
├── MetadataDisplay.tsx # Video metadata & thumbnail
├── FormatSelector.tsx # Format dropdown & download button
├── SettingsModal.tsx  # Theme settings modal
├── ProgressBar.tsx    # Loading progress bar
└── Alert.tsx          # Error & success alerts

lib/
└── theme-context.tsx  # Theme management (light/dark/cool)

public/
├── manifest.json      # PWA configuration
├── sw.js             # Service worker
└── icon.svg          # App icon

.env.local            # Backend URL configuration
tailwind.config.ts    # Tailwind CSS setup
tsconfig.json         # TypeScript configuration
```

## 🧪 Testing

See [TESTING_GUIDE.md](./TESTING_GUIDE.md) for detailed testing instructions including:
- UI & theme switching
- Video metadata fetching
- Format selection & download
- Error handling
- PWA installation
- Responsive design
- Progress bar visibility

## 🎨 Theme System

The app supports three themes managed via React Context and localStorage:

1. **Light** - Clean white interface with blue accents
2. **Dark** - Dark gray interface with light text and blue accents
3. **Cool** - Gradient dark-to-purple background with neon effects

Toggle themes via the settings icon (⚙️) in the top-right corner.

## 🔌 Backend API Integration

### Endpoints

**POST /info** - Fetch video metadata
```javascript
{
  url: "https://youtube.com/watch?v=..."
}
// Response: { title, thumbnail, formats: [...] }
```

**GET /download** - Download video
```javascript
?url=...&format=best
```

### Environment
```
NEXT_PUBLIC_BACKEND_URL=https://vidgrab-server.onrender.com
```

## 💻 Tech Stack

- **Framework:** Next.js 14+ with App Router
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Icons:** react-icons
- **UI Components:** @headlessui/react
- **Theme Management:** Custom React Context
- **PWA:** Manifest + Service Worker

## 📱 PWA Features

- Installable on home screen
- Works offline (cached assets)
- Native app-like experience
- Blue theme color (#007bff)
- Custom app icon
- Splash screens support

## ♿ Accessibility

- ARIA labels on all interactive elements
- Form validation with `aria-invalid`
- Semantic HTML structure
- Keyboard navigation support
- High contrast theme options

## 🔒 Security

- Client-side only (no server-side processing)
- HTTPS-ready for production
- Service worker validates origins
- Environment variables for sensitive URLs

## 📦 Dependencies

```json
{
  "next": "16.1.3",
  "react": "^19.0.0-rc",
  "typescript": "^5.0",
  "tailwindcss": "^4.0",
  "react-icons": "^5.0",
  "@headlessui/react": "^2.0"
}
```

## 🚀 Deployment

### Vercel (Recommended)
```bash
npx vercel
```

### Other Platforms
1. Run `npm run build`
2. Deploy the `.next` folder
3. Set environment: `NEXT_PUBLIC_BACKEND_URL=...`

## 📝 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server (port 3000) |
| `npm run build` | Create optimized production build |
| `npm start` | Start production server |
| `npm run lint` | Run ESLint |

## 🐛 Troubleshooting

**Backend errors?** Ensure the backend API is running and accessible.

**Theme not persisting?** Check if localStorage is enabled in your browser.

**Service Worker not registering?** HTTPS required in production (localhost OK in dev).

**Download not working?** Check browser console for CORS errors.

See [TESTING_GUIDE.md](./TESTING_GUIDE.md) for more troubleshooting tips.

## 📄 License

This project is part of the VidGrab ecosystem. See [LICENSE](../LICENSE) for details.

## 🎉 Ready to Use!

The app is fully functional and ready for testing. Open http://localhost:3000 and start downloading videos!

---

**Version:** 1.0  
**Created:** January 19, 2026  
**Last Updated:** January 19, 2026
