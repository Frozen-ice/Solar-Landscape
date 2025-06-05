# Solar Landscape Enrollment Form

## Overview
This is a modern, user-friendly enrollment form for Solar Landscape's community solar program. Built with React, TypeScript, and Tailwind CSS, it's designed to be accessible, secure, and a breeze to use.

## Features
- **Real-time Address Validation:** We use an external service to ensure addresses are spot-on.
- **Utility Provider Auto-selection:** Just enter your zip code, and we'll pick the right utility provider for you.
- **Responsive Design:** Looks great on any device, from desktop to mobile.
- **Error Handling:** Clear, actionable error messages guide you through the process.

## Project Structure

### Frontend
- **Location:** `frontend/`
- **Tech Stack:** React, TypeScript, Tailwind CSS, React Hook Form, React Hot Toast
- **Cool Stuff:**
  - Real-time address validation
  - Utility provider auto-selection
  - Responsive design
  - Error handling and user feedback

### Backend
- **Location:** `backend/`
- **Tech Stack:** Node.js, Express, TypeScript
- **Cool Stuff:**
  - Address validation service
  - Enrollment submission handling
  - Data consistency checks

## Getting Started

### Frontend
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Run tests:
   ```bash
   # Run all tests
   npm test

   # Run tests in watch mode
   npm run test:watch

   # Run tests with coverage
   npm run test:coverage
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Backend
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Build the TypeScript project:
   ```bash
   npm run build
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

   The server will start on port 4000 by default. You can change this by setting the `PORT` environment variable.

   For production:
   ```bash
   npm start
   ```

Note: Make sure you have Node.js version 14 or higher installed.

## Technologies Used
- React
- TypeScript
- Tailwind CSS
- React Hook Form
- React Hot Toast
- Node.js
- Express

## Motivating Questions

### a. If a subscriber stops the process, what should we do with the data they have already inputted?
If someone bails mid-enrollment, we have a few options:
- **Local Storage (Recommended for UX):** Save their progress in the browser's local storage. If they come back, their data is pre-filled and they can pick up where they left off.
- **Backend Drafts (For Authenticated Users):** If they're logged in, we can save their progress as a draft on the backend, so they can resume from any device.
- **Privacy Consideration:** If the data is sensitive, we should let them know it's being saved and give them the option to clear it.

### b. Should this be single page enrollment? Should it be paginated?
- **Single Page:**  
  - Simpler and faster for short forms (like what we've got).
  - Reduces navigation complexity.
- **Paginated (Multi-step):**  
  - Better for longer or more complex forms.
  - Reduces cognitive load by breaking the process into manageable steps.
  - Allows for validation and saving progress at each step.
- **Design Choice:**  
  For this project, since the required information is minimal, a single-page form is the way to go. If we add more fields or steps (like document uploads or consents), a paginated approach might be better.

### c. What is the minimal set of information required from the subscriber that we need to collect? Can information be derived?
- **Minimal Required Information:**
  - Name (first and last)
  - Address (address, city, state, zip)
  - Utility provider (can be derived from zip)
  - Utility account number (UAN)
  - Assistance program participation (optional)
- **Derived Information:**
  - Utility provider can often be auto-selected based on the zip code using our mapping file.
  - City and state can sometimes be auto-filled from the zip code using a lookup service.
- **Design Principle:**  
  Only ask for what's strictly necessary, and derive or auto-fill as much as possible to reduce user effort and errors.

### d. What consistency checks can be applied for this information? If these consistency checks fail, should the enrollment fail until the subscriber enters the correct information?
- **Consistency Checks:**
  - Address validation (using an external service or database)
  - Zip code matches city/state
  - Utility provider matches zip code
  - UAN format matches utility requirements (e.g., 10 digits for PSEG)
  - Assistance program is from an allowed list
- **If Checks Fail:**  
  - Yes, enrollment should not proceed until all consistency checks pass. This ensures data integrity and eligibility.
  - The user should receive clear, actionable error messages to correct their input.

### e. How would you secure the PII?
- **In Transit:**  
  - Use HTTPS for all communications between client and server.
- **At Rest:**  
  - Encrypt sensitive data in the database.
  - Restrict access to PII to only authorized personnel and services.
- **Frontend:**  
  - Do not store PII in local storage longer than necessary.
  - Sanitize and validate all inputs to prevent injection attacks.
- **Compliance:**  
  - Follow relevant regulations (e.g., GDPR, CCPA) for data handling and user consent.

### f. What design choices did you make to ensure the product can be used independent of technical background?
- **Simple, Intuitive UI:**  
  - Clear labels, instructions, and error messages.
  - Logical grouping of fields.
  - Use of dropdowns and auto-complete to reduce typing and errors.
- **Validation and Feedback:**  
  - Real-time validation with helpful feedback.
  - Prevent submission until all required and consistent information is provided.
- **Mobile Friendly:**  
  - Responsive design for use on any device.
- **Guidance:**  
  - Tooltips, help text, and clear error messages guide users through the process.

## License
This project is licensed under the MIT License. 