# 🧑‍🍳 ChefAI-Planner-Frontend

![ChefAI Header](https://img.shields.io/badge/ChefAI-Dashboard-orange?style=for-the-badge&logoColor=white) 
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

ChefAI is a modern, sleek, and highly responsive web application built to solve the ultimate daily question: *"What can I cook with these ingredients?"* By feeding arbitrary ingredients into the system, ChefAI securely connects to a centralized backend application to instantly harness Artificial Intelligence and formulate a perfect recipe accompanied by clear steps. Finished recipes can be securely saved to your personal vault or efficiently downloaded offline as a PDF.

## ✨ Key Features

* **🧠 AI Generation:** Automatically draft a complete recipe based on a simple list of unstructured ingredients using AI logic.
* **🔐 Secure Authentication:** Seamless user Registration, Login, and Authorization protected via JWT (JSON Web Tokens) managed flawlessly in React Context.
* **📚 Personal Recipe Vault:** Save your favorite generated recipes permanently to your profile to view, search, and manage them anytime.
* **📑 PDF Downloads:** One-click utility that securely downloads generated recipes directly into physical PDF documents.
* **🔎 Smart Search & Pagination:** Instantly comb through a large inventory of saved recipes utilizing a debounced live-search bar and clean page transitions.
* **🎨 Premium Aesthetics:** Features a heavily optimized, completely custom design system using Tailwind CSS. Contains animated floating gradient orbs, glassmorphism UI windows, engaging loading spinners, and visually stunning interactive elements.

## 💻 Technology Stack

* **Core Framework:** React 18, Vite
* **Styling & Design:** Vanilla Tailwind CSS
* **Routing:** React Router v6 (`react-router-dom`)
* **Network & Data:** Axios (with custom REST interception)
* **Authentication:** JWT Decoding (`jwt-decode`) + SessionStorage preservation
* **Icons:** Lucide React
