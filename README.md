# Hexovate Food Ordering App

Live demo: https://hexovate-food-app.vercel.app

A modern, responsive 3D food ordering web application built with React, Vite, Tailwind CSS and Zustand, for the Hexovate Solutions frontend internship task.

## Features
- **Home:** hero section with a gentle entry animation, plus a scroll-driven featured dishes showcase built with GSAP ScrollTrigger (one dish at a time, crossfading).
- **Menu with Category Filter:** filter the dishes by category (All dishes, Bowls, Pasta, Sushi, Burgers) using clear toggle chips, with responsive dish cards.
- **Dish Details with 3D Viewer:** drag to rotate a real 3D model (GLB) of the dish. Dishes without a 3D model, or browsers without WebGL, show a photo-based viewer as a static fallback.
- **Portion Selector:** choose Regular or Large and see the price update live.
- **Meal Customization:** pick add-ons and see the updated total before adding to the cart.
- **Cart Management:** powered by Zustand, with quantity controls (+/-), subtotal, a demo delivery fee, automatic total calculation, and the cart saved in the browser (localStorage).
- **Checkout & Confirmation:** customer details form with inline validation, and a demo-only confirmation page with an order reference (no real payment is taken).
- **Responsive and Accessible UI:** works on desktop and mobile, with keyboard support, screen-reader labels, visible focus styles and support for the reduced-motion setting.

## Tech Stack
- **Framework:** React 19 (Vite)
- **Styling:** Tailwind CSS
- **State Management:** Zustand
- **Routing:** React Router DOM
- **3D:** Three.js, React Three Fiber, Drei
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
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Open the link shown in the terminal (usually http://localhost:5173).

### Other Commands
- `npm run lint` checks the code with ESLint.
- `npm run build` creates a production build.

## Notes
- This is a demo project. The order flow does not send any real order or take any payment.
- 3D models are stored in `public/models` and linked from `src/data/dishes.js` using the `glbUrl` field. Dish photos are in `public/images/dishes`.

## Credits
- **3D models** from [poly.pizza](https://poly.pizza):
  - "Spaghetti Bowl" by Jarlan Perez, licensed under CC-BY ([source](https://poly.pizza/m/00zv90-Gjo2))
  - Other models: CC0 1.0 (Public Domain)
- **Dish photos:** free stock photos from [Unsplash](https://unsplash.com) and [Pexels](https://pexels.com), used under their free licenses.
