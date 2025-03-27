# PeerShare Frontend

## Overview
PeerShare is a web-based file-sharing platform that utilizes WebSockets and WebRTC for peer-to-peer file transfers. This repository contains the frontend of the application, built with Astro, React, and TailwindCSS.

## Features
- **Astro Framework**: Utilizes Astro for optimized performance and flexibility.
- **React Components**: Dynamic UI elements powered by React.
- **Framer Motion**: Provides smooth animations.
- **TailwindCSS**: Modern utility-first CSS framework for styling.
- **WebSockets**: Enables real-time communication.
- **Google reCAPTCHA v3**: Enhances security against spam.

## Installation

### Prerequisites
Make sure you have the following installed:
- [Node.js](https://nodejs.org/) (v16 or later)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Clone the Repository
```sh
git clone https://github.com/your-repo/peershare-frontend.git
cd peershare-frontend
```

### Install Dependencies
Using npm:
```sh
npm install
```
Using yarn:
```sh
yarn install
```

## Usage

### Development Server
Start the development server:
```sh
npm run dev
```
This will launch the frontend at `http://localhost:3000` by default.

### Build for Production
To create an optimized production build:
```sh
npm run build
```

### Preview Production Build
```sh
npm run preview
```

## Project Structure
```
peershare-frontend/
├── src/
│   ├── components/        # Astro & React components
│   ├── layouts/           # Page layouts
│   ├── react/             # React components (client-side only)
│   ├── pages/             # Astro pages
│   └── styles/            # Global styles
├── public/                # Static assets
├── package.json           # Project dependencies & scripts
└── astro.config.mjs       # Astro configuration
```
