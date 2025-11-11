# 📁 Dropbox File Explorer  
https://dropbox-exp.vercel.app/

A modern web application for browsing, navigating, and managing Dropbox files with a user-friendly interface and instant file preview.

![React](https://img.shields.io/badge/React-18.x-61DAFB?style=flat-square&logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=flat-square&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5.x-646CFF?style=flat-square&logo=vite&logoColor=white)

---

## ✨ Features

- 🗂️ **Folder Navigation** — quick navigation between directories with breadcrumbs
- 👁️ **File Preview** — support for images, PDF, Office documents, and text files
- ⬇️ **File Download** — download button appears on hover
- 🔐 **Secure Authentication** — token validation before connection
- 🎨 **Modern UI** — responsive design with smooth animations
- 🚀 **Fast Performance** — optimized file loading and processing
- 🔄 **Navigation History** — "Back" and "Home" buttons
- 📱 **Mobile Version** — full support for smartphones and tablets

---

## 🚀 Quick Start

### Installation
Clone the repository
git clone https://github.com/yourusername/dropbox-explorer.git

Navigate to project directory:  
cd dropbox-explorer

Install dependencies:  
npm install

### Getting Dropbox Access Token

1. Go to [Dropbox App Console](https://www.dropbox.com/developers/apps)
2. Click **"Create app"**
3. Select:
   - **Scoped access**
   - **Full Dropbox** or **App folder** (as needed)
4. Enter application name
5. In the **"Generated access token"** section, click **"Generate"**
6. Copy the token (save it in a secure place!)

### Running the Application
Development mode:  
npm run dev

Production build:  
npm run build

Preview production build:  
npm run preview

The application will open at: `http://localhost:5173`

---

## 🎯 Usage

1. **Authentication**
   - On first launch, you'll see the login page
   - Enter your Dropbox access token
   - The application will automatically validate the token before connecting

2. **Navigation**
   - Click on a folder to open it
   - Use "Back" / "Home" buttons for navigation
   - Click on breadcrumbs for quick navigation

3. **Working with Files**
   - Click on a file to preview it
   - Hover over a file — download button will appear
   - Supported formats: images, PDF, Office documents, text files

4. **Logout**
   - Click the logout button in the top right corner
   - Token will be removed from localStorage

---

## 🛠️ Technologies

- **React 18** — UI library
- **TypeScript** — type safety
- **Vite** — build tool and dev server
- **Dropbox SDK** — Dropbox API integration
- **SCSS Modules** — isolated styles
- **Lucide React** — icons

---

## 📁 Project Structure
```
DBB_TEST/
├── .env                # (Hidden file) Your Dropbox API token (key) is stored here.
├── dist/               # Folder for the finished, built project (appears after "build").
├── node_modules/       # All downloaded libraries (React, Dropbox SDK, etc.).
├── public/             # Public files (favicon, index.html).
└── src/                # "Source" - all your logic is here.
    │
    ├── components/     # "Dumb" components (UI building blocks).
    │   ├── Breadcrumbs/  # "Breadcrumbs" (show the path: Home / Folder / File)
    │   │   ├── Breadcrumbs.module.css
    │   │   └── Breadcrumbs.tsx
    │   ├── FileItem/     # Component to display a single file in the list.
    │   │   ├── FileItem.module.css
    │   │   └── FileItem.tsx
    │   ├── FolderItem/   # Component to display a single folder in the list.
    │   │   ├── FolderItem.module.css
    │   │   └── FolderItem.tsx
    │   ├── PreviewModal/ # Modal window for preview (if you decide to implement it).
    │   │   ├── PreviewModal.module.css
    │   │   └── PreviewModal.tsx
    │   ├── TokenAuth/    # Component that asks for the token (key).
    │   │   ├── TokenAuth.module.css
    │   │   └── TokenAuth.tsx
    │   └── Toolbar/      # Top panel with buttons ("Back", "Upload").
    │       ├── Toolbar.module.css
    │       └── Toolbar.tsx
    │
    ├── features/       # "Smart" components (business logic).
    │   └── FileExplorer/ # The main component that manages everything.
    │       ├── FileExplorer.module.css
    │       ├── FileExplorer.tsx  # Assembles everything (toolbar, file list) and holds the state (which folder we are in).
    │       └── useFileExplorer.ts # "Hook" - all logic (loading, clicks, errors) is extracted here to keep the component clean.
    │
    ├── services/       # Logic for communicating with external APIs.
    │   └── dropbox/
    │       ├── dropboxAuth.ts    # Logic related to getting/saving the token.
    │       ├── dropboxClient.ts  # Configuration of the Dropbox SDK itself (e.g., creating a client with the token).
    │       └── dropboxService.ts # Main service: `getFiles()`, `getFolders()` functions, etc.
    │
    ├── utils/          # Helper functions (e.g., "format date", "truncate filename").
    │
    ├── App.css         # Global styles for the entire application.
    ├── App.tsx         # The main component. Usually routing is here or, in your case, logic: "Show TokenAuth or FileExplorer?".
    ├── index.css       # The most basic styles (for body, html).
    └── main.tsx        # Entry point of the application (where React "connects" to index.html).
```
