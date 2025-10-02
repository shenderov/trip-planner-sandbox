# 🧳 AI Trip Planner Sandbox

An experimental full-stack project that demonstrates how to build and test **AI-integrated applications** using **React + Vite + TypeScript (frontend)**, **Express + OpenAI SDK (backend)**, and **Playwright with AI validation (tests)**.

The app takes basic **travel preferences** and asks OpenAI to generate a **trip suggestion** with destination, highlights, and the best season to visit.  
Playwright tests validate both the **user flow** and the **AI responses** with the help of a **secondary AI model**.

---

## 📂 Project Structure

```
trip-planner-sandbox/
├── app/              # React + Vite + TS UI
│   ├── src/          # Components, App, types
│   └── public/       # Static assets (favicon, etc.)
│
├── server/           # Express backend + OpenAI API calls
│   └── index.ts
│
├── shared/           # Shared type definitions & test IDs
│   ├── types.ts
│   └── testIds.ts
│
├── tests/            # Playwright tests with POM + AI Validator
│   ├── e2e/          # Test specs
│   ├── pages/        # Page Object Models
│   ├── utils/        # AI Validator
│   └── playwright.config.ts
│
└── README.md         # This file
```

---

## ⚡️ Features

- **Frontend (React + Vite + TS)**  
  - Travel preferences form (budget, climate, duration, etc.)  
  - Clean, minimal UI with dark-mode support  
  - Loading animation while waiting for backend  

- **Backend (Express + OpenAI)**  
  - API endpoint `/api/plan-trip`  
  - Prompts OpenAI (`gpt-4o-mini`) to return structured JSON  
  - Strict schema: `destination`, `highlights` (2–4), `season`  

- **Shared Types**  
  - `Preferences`, `TripResult`, `TripApiResponse`  
  - Used by both frontend and backend for type safety  

- **Testing (Playwright + AI Validator)**  
  - End-to-end UI flow tests  
  - Page Object Model (POM) for maintainable selectors  
  - AI Validator: sends prefs + results to another AI model (e.g. `gpt-4o` or `gpt-4-turbo`) to check plausibility  

---

## 🚀 Getting Started

### 1. Clone repo & install deps
```bash
git clone https://github.com/shenderov/trip-planner-sandbox.git
cd trip-planner-sandbox

# Install frontend
cd app && npm install

# Install backend
cd ../server && npm install

# Install tests
cd ../tests && npm install
```

---

### 2. Set up environment variables
Create `.env` in **server/** and **tests/**:

```env
# server/.env
OPENAI_API_KEY=your-openai-key

# tests/.env
OPENAI_API_KEY=your-openai-key
```

---

### 3. Run frontend & backend
From repo root (recommended):
```bash
# Terminal 1 - backend
cd server
npm run dev

# Terminal 2 - frontend
cd frontend
npm run dev
```

Frontend runs on **http://localhost:5173**  
Backend runs on **http://localhost:3001**

💡 This is for manual exploration. When running automated tests with Playwright, the servers are started automatically by the test runner.

---

### 4. Run tests
Playwright will **start frontend + backend automatically**:

```bash
cd tests
npx playwright test
```

View reports:
```bash
npx playwright show-report
```

---

## 🧪 Example Playwright Test

```ts
test("AI trip suggestions make sense", async ({ page }) => {
  const tripPage = new TripPlannerPage(page);
  await tripPage.goto();

  const prefs: Preferences = {
    preference: "mountains",
    budget: "$1000",
    companions: "family",
    climate: "mild",
    duration: "1 week",
  };

  await tripPage.fillPreferences(prefs);
  await tripPage.clickOnSubmitButton();

  const result = await tripPage.getTripResult();
  const validation = await validateTripPlan(prefs, result);

  expect(validation.pass, validation.reason).toBeTruthy();
});
```

---

## 📖 Related Article

This project was built as part of the article:  
👉 [Testing AI-Integrated Products with Test Automation: Complexities and Opportunities](https://shenderov.hashnode.dev/testing-ai-integrated-products-with-test-automation-complexities-and-opportunities)

---

## 🔗 Connect
- 💼 LinkedIn: [Konstantin Shenderov](https://linkedin.com/in/shenderov)  

---

## 📝 License

MIT License — see [LICENSE](LICENSE) for details.  
