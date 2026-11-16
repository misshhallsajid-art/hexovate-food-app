# Hexovate Food Ordering App

Live demo: https://hexovate-food-appv2.vercel.app

A modern, responsive food ordering web application built with React, Vite, Tailwind CSS and Zustand, for the Hexovate Solutions frontend internship task.

## Features
- **Home:** hero section with a gentle entry animation, plus a scroll-driven featured dishes showcase built with GSAP ScrollTrigger (one dish at a time, crossfading).
- **Menu with Category Filter:** filter the dishes by category (All dishes, Bowls, Pasta, Sushi, Burgers) using clear toggle chips, with responsive dish cards.
- **Dish Details & Customization:** view high-quality photo previews, choose portion sizes (Regular or Large) with live price updates, and pick add-ons before adding to the cart.
- **Cart Management:** powered by Zustand, with quantity controls (+/-), subtotal, a demo delivery fee, automatic total calculation, and the cart saved in the browser (localStorage).
- **Checkout & Confirmation:** customer details form with inline validation, and a demo-only confirmation page with an order reference (no real payment is taken).
- **Responsive and Accessible UI:** works on desktop and mobile, with keyboard support, screen-reader labels, visible focus styles and support for the reduced-motion setting.

## Tech Stack
- **Framework:** React 19 (Vite)
- **Styling:** Tailwind CSS
- **State Management:** Zustand
- **Routing:** React Router DOM
- **Animation:** GSAP (ScrollTrigger)
- **Icons:** Lucide React

## Setup & Running Instructions

### Prerequisites
- Node.js installed on your machine.

### How to Run Locally
1. Clone or download the project and open a terminal in the project folder.
2. Install the dependencies:
   ```bash
   npm install