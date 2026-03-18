# Security Access Logs Viewer 🔒

## 📋 Description

A React application built for the PADO Jr. Full-Stack interview challenge. This frontend allows a security team to visualize access logs from IoT security devices, filtering by user or device, with pagination support.

## 🛠️ Technologies

- React 18
- TypeScript
- Vite
- Tailwind CSS v3
- Lucide React (icons)

## ✅ Prerequisites

- Node.js v18+
- npm v8+

## ⚙️ Installation

1. Clone this repository:

```bash
git clone <repository-url>
cd client
```

2. Install dependencies:

```bash
npm install
```

3. Make sure `data.json` is inside the `public/` folder:

```
client/
  public/
    data.json ✅
```

## 🚀 Running the project

### Development:

```bash
npm run dev
```

App runs at: `http://localhost:5173`

### Production build:

```bash
npm run build
npm run preview
```

## 📁 Project Structure

```
client/
  public/
    data.json        # Access logs data (simulated API)
  src/
    App.tsx          # Main component with all logic
    main.tsx         # React entry point
    index.css        # Tailwind CSS directives
  index.html         # HTML entry point
  tailwind.config.js # Tailwind configuration
  vite.config.ts     # Vite configuration
```

## 📡 Features

| Feature     | Description                                    |
| ----------- | ---------------------------------------------- |
| View toggle | Switch between Usuario and Dispositivo views   |
| Filtering   | Filter logs by userName, userId, mac or lockId |
| Sorting     | Logs sorted descending by logId                |
| Pagination  | 5 logs per page                                |

## 🐳 Docker

Build the image:

```bash
docker build -t security-logs-viewer .
```

Run the container:

```bash
docker run -p 5173:5173 security-logs-viewer
```

Access at: `http://localhost:5173`
