# SilverCare 💙

SilverCare is a modern and accessible elderly wellness dashboard designed to support seniors with their everyday health and wellbeing. The application provides simple tools for tracking mood, completing health routines, requesting emergency assistance, and communicating with caregivers.

## ✨ Features

* 🕐 **Daily Wellness Dashboard** — Displays a simple daily overview for seniors.
* 😊 **Mood Check-In** — Users can record their current mood as Good, Okay, or Low.
* 💊 **Health Checklist** — Track important daily activities such as:

  * Morning medication
  * Drinking water
  * 15-minute walk
  * Evening medication
* 🚨 **Emergency Caregiver Alert** — Provides an emergency action that simulates sending an alert to a caregiver.
* 🎙️ **Voice Companion** — Supports voice commands for common actions such as:

  * "Medicine"
  * "Water"
  * "Help"
  * "Emergency"
* 🔊 **Voice Feedback** — Uses browser speech synthesis to provide spoken responses.
* 📋 **Caregiver Activity Log** — Records mood updates, checklist changes, and emergency events.
* 💾 **Local Storage** — Saves important user preferences and checklist/mood data in the browser.
* 🎭 **Demo Mode** — Generates sample caregiver activity data for demonstrations.
* 📱 **Responsive UI** — Built with Tailwind CSS for a clean and accessible interface.
* ♿ **Senior-Friendly Design** — Large typography, clear controls, and straightforward navigation.

## 🛠️ Technologies Used

* React 18
* TypeScript
* Vite
* Tailwind CSS
* Lucide React
* Browser Speech Synthesis API
* Browser Local Storage
* ESLint

## 📁 Project Structure

```text
SilverCare/
├── src/
│   ├── components/
│   │   ├── VoiceCompanion.tsx
│   │   ├── CaregiverActivityLog.tsx
│   │   ├── HealthChecklist.tsx
│   │   ├── JudgesGuide.tsx
│   │   ├── EmergencyButton.tsx
│   │   ├── CaregiverAlertModal.tsx
│   │   ├── Clock.tsx
│   │   ├── DemoToggle.tsx
│   │   └── MoodCheckIn.tsx
│   ├── hooks/
│   │   └── useLocalStorage.ts
│   ├── utils/
│   │   └── log.ts
│   ├── App.tsx
│   ├── main.tsx
│   ├── index.css
│   └── types.ts
├── index.html
├── package.json
├── tailwind.config.js
├── postcss.config.js
├── tsconfig.json
└── vite.config.ts
```

## ⚙️ Requirements

Make sure you have the following installed:

* Node.js 18 or later
* npm 9 or later
* A modern web browser such as Chrome, Edge, Firefox, or Safari

## 🚀 Installation

Clone or extract the project and open the project directory:

```bash
cd project
```

Install the dependencies:

```bash
npm install
```

## ▶️ Run Locally

Start the development server:

```bash
npm run dev
```

Vite will provide a local URL, usually:

```text
http://localhost:5173
```

Open the URL in your browser.

## 🏗️ Production Build

Create an optimized production build:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

## 🔍 Code Quality

Run ESLint:

```bash
npm run lint
```

Run TypeScript type checking:

```bash
npm run typecheck
```

## 🎙️ Voice Commands

SilverCare supports browser-based voice interaction through the Speech Recognition/Speech Synthesis capabilities available in supported browsers.

Example commands:

```text
"Medicine"
"Water"
"Help"
"Emergency"
```

The application can automatically update supported checklist items and provide spoken feedback.

## 💾 Data Storage

SilverCare currently uses browser Local Storage for:

* Mood information
* Health checklist state
* Demo mode preference

This means the application can retain these settings between browser sessions without requiring a backend database.

## 🚨 Emergency Feature

The emergency feature is currently designed as a **demonstration/simulation**. Activating it displays a simulated caregiver alert and adds an emergency event to the activity log.

It should not be considered a real emergency communication service without integrating an appropriate backend notification system.

## 🎯 Use Cases

SilverCare can be used as:

* A senior wellness dashboard
* An elderly care assistance application
* A caregiver support interface
* A healthcare-focused hackathon project
* A prototype for an assisted-living application
* A foundation for a larger elderly-care platform

## 🔮 Future Improvements

Potential future enhancements include:

* Real caregiver accounts and authentication
* Cloud database integration
* Real-time caregiver notifications
* SMS/email emergency alerts
* Medication scheduling and reminders
* Doctor appointment management
* Health metrics tracking
* Multiple senior profiles
* Caregiver mobile application
* AI-powered wellness recommendations
* Secure health-data management
* Advanced accessibility settings

## 📄 License

This project is provided as a demonstration/project application. Add your preferred open-source or commercial license before distributing it publicly.

## ❤️ About

**SilverCare — caring for you, every day.**

A simple technology solution focused on making everyday wellness management easier, more accessible, and more supportive for seniors.
