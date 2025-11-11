# 📁 Dropbox File Explorer

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

Navigate to project directory
cd dropbox-explorer

Install dependencies
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
Development mode
npm run dev

Production build
npm run build

Preview production build
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
dropbox-explorer/
├── src/
│ ├── components/ # React components
│ │ ├── Breadcrumbs/
│ │ ├── FileItem/
│ │ ├── FolderItem/
│ │ ├── PreviewModal/
│ │ ├── TokenAuth/
│ │ └── Toolbar/
│ ├── features/ # Application features
│ │ └── FileExplorer/
│ ├── services/ # Services
│ │ └── dropbox/
│ │ ├── dropboxAuth.ts
│ │ └── dropboxService.ts
│ ├── App.tsx
│ └── main.tsx
├── package.json
└── README.md

