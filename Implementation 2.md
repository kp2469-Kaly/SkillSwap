# **1. Introduction**

## Description

SkillSwap is a local peer-to-peer skill exchange platform that empowers individuals to share knowledge through cost-free, community-driven learning. By enabling users to exchange skills directly, SkillSwap eliminates the financial and institutional barriers of traditional education. Whether it’s learning guitar, coding, or cooking, SkillSwap matches people based on mutual learning goals, proximity, and availability, fostering a personalized and social learning experience.

## Value Proposition

SkillSwap transforms learning into an affordable and collaborative experience. It reduces dependency on expensive courses by enabling one-on-one skill exchanges within the local community. The platform promotes social bonding, practical learning, and personal growth by connecting individuals eager to both teach and learn.

## MVP

- **User Registration & Authentication**: Sign up and log in securely
- **Profile Customization**: Users list skills they offer and want to learn
- **Skill Matching Algorithm**: Matches users based on skill, availability, and location
- **Session Scheduling**: Users can book online or offline learning sessions
- **Video Call Integration**: Online sessions via embedded video chat
- **Notifications**: Users receive alerts about matches, session updates, and reminders
- **Expert Sessions**: Optional paid sessions with verified experts (beta version)

## Repository

https://github.com/kp2469-Kaly/SkillSwap

# **2. Implemented Requirements**

## **2.1 Kalyana**

https://github.com/kp2469-Kaly/SkillSwap/pulls?q=is%3Apr+is%3Aclosed+author%3Akp2469-Kaly

---

### 2.1.1 Feature: Notification System for Session Events

- **Requirement**: As a user, I want to receive notifications when my session is accepted, declined, or upcoming so I don’t miss important updates.
- **Issue**: https://github.com/kp2469-Kaly/SkillSwap/issues/14
- **Pull Request**: https://github.com/kp2469-Kaly/SkillSwap/pull/19
- **Implemented by**: Kalyana
- **Reviewed by**: Ashrith
- **Automated Tests**: https://github.com/kp2469-Kaly/SkillSwap/tree/Kalyana/__tests__

---

### 2.1.2 Feature: Expert Session Booking System

- **Requirement**: As a user, I want to browse available experts and book a paid session to learn advanced topics.
- **Issue**: https://github.com/kp2469-Kaly/SkillSwap/issues/15
- **Pull Request**: https://github.com/kp2469-Kaly/SkillSwap/pull/21
- **Implemented by**: Kalyana
- **Reviewed by**: Ashrith
- **Automated Tests**: https://github.com/kp2469-Kaly/SkillSwap/tree/Kalyana/__tests__
---

### 2.1.3 Feature: Group Join and Leave Functionality

- **Requirement**: As a user, I want to join or leave skill-based community groups so I can interact with like-minded learners.
- **Issue**: https://github.com/kp2469-Kaly/SkillSwap/issues/16
- **Pull Request**: https://github.com/kp2469-Kaly/SkillSwap/pull/22
- **Implemented by**: Kalyana
- **Reviewed by**: Ashrith
- **Automated Tests**: https://github.com/kp2469-Kaly/SkillSwap/tree/Kalyana/__tests__

---

## **2.2 Ashrith**

### Pull Requests Overview

https://github.com/kp2469-Kaly/SkillSwap/pulls?q=is%3Apr+is%3Aclosed+author%3AAshrituh

---

### 2.2.1 Feature: Session Calendar Integration

- **Requirement**: As a user, I want to view all my scheduled sessions in a calendar format so that I can manage my time effectively.
- **Issue**: https://github.com/kp2469-Kaly/SkillSwap/issues/17
- **Pull Request**: [PR #488](https://github.com/kp2469-Kaly/SkillSwap/pull/488)
- **Implemented by**: Ashrith
- **Reviewed by**: Kalyana
- **Automated Tests**: https://github.com/kp2469-Kaly/SkillSwap/tree/Kalyana/__tests__

---

### 2.2.2 Feature: Secured Login

- **Requirement**: As a user, I want to easily add or search for skills using an auto-complete tag system so that I can fill out my profile faster.
- **Issue**: https://github.com/kp2469-Kaly/SkillSwap/issues/18
- **Pull Request**: [PR #493](https://github.com/kp2469-Kaly/SkillSwap/pull/493)
- **Implemented by**: Ashrith
- **Reviewed by**: Kalyana
- **Automated Tests**: https://github.com/kp2469-Kaly/SkillSwap/tree/Kalyana/__tests__
---

# **3. Automated Testing**

This section demonstrates the automated testing approach used to ensure correctness, maintainability, and reliability of the SkillSwap platform. The following subsections describe our unit tests, integration tests, and acceptance tests with complete documentation and supporting evidence.

---

## **3.1 Unit Tests**

### Test Framework:
- Jest (for backend and frontend)

### GitHub Repository Link: 
https://github.com/kp2469-Kaly/SkillSwap/tree/Kalyana/__tests__

### Unit Test Example: Notification Message Formatter

- **Class under test**: Session
- **Test file**: https://github.com/kp2469-Kaly/SkillSwap/blob/Kalyana/__tests__/sessionUtils.test.js
- **Behavior Tested**: Formats session-related notification messages correctly.
- **Mocked Dependencies**: 
  - Database save calls
  - User profile retrieval

## 3.2 Integration Tests

**Test framework and tools used**: Jest with Supertest

**GitHub Link**:
https://github.com/kp2469-Kaly/SkillSwap/tree/Kalyana/__tests__/integration

**Description of the integration scenario**:
This integration test verifies the interaction between the **Express session route handler (`/schedule`)** and the **MongoDB database (via Mongoose models)**. It ensures that when a user sends a `POST` request to schedule a session, the backend route correctly handles the data and stores the session in the database. The test validates the seamless communication between the routing layer and the data access layer.

---

**Example Integration Test**

* **GitHub link to the test file**:
https://github.com/kp2469-Kaly/SkillSwap/blob/Kalyana/__tests__/integration/scheduleSession.test.js

* **GitHub links to components under test**:

  * Route: https://github.com/kp2469-Kaly/SkillSwap/blob/Kalyana/routes/sessions.js
  * Model: https://github.com/kp2469-Kaly/SkillSwap/blob/Kalyana/models/Session.js

**Brief explanation**:
This test confirms that the backend server correctly handles a new session scheduling request. It verifies data is parsed from the request body, passed to the database model, and returns a success response only when data is stored successfully. This validates backend logic from API layer to persistence.

**Code snippet**:

import request from 'supertest';
import app from '../../app';
import mongoose from 'mongoose';
import Session from '../../models/Session';

describe('POST /schedule - Integration Test', () => {
  beforeAll(async () => {
    await mongoose.connect('mongodb://localhost:27017/skillswap_test');
  });

  afterAll(async () => {
    await Session.deleteMany({});
    await mongoose.disconnect();
  });

  it('should store session in database and return 201 response', async () => {
    const response = await request(app)
      .post('/schedule')
      .send({
        learnerId: 'user123',
        teacherId: 'user456',
        timeSlot: '2025-08-05T15:00:00Z',
      });

    expect(response.statusCode).toBe(201);
    expect(response.body.message).toBe('Session scheduled');

    const savedSession = await Session.findOne({ learnerId: 'user123' });
    expect(savedSession).not.toBeNull();
    expect(savedSession.teacherId).toBe('user456');
  });
});


**Screenshot of test execution**:
![Integration Test Screenshot](images/integration_test_result.png)


## 3.3 Acceptance Tests

**Testing tools**: Cypress

**GitHub repository link**:
https://github.com/kp2469-Kaly/SkillSwap/tree/Kalyana/__tests__/cypress/e2

---

**User Story**:
*As a learner, I want to schedule a skill session with a teacher, so that I can improve my skills through real-time learning.*

**Acceptance Criteria**:

* Learner can log in
* Learner navigates to the "Browse Skills" section
* Learner receives confirmation that the session is scheduled

---

**Step-by-step Test Scenario**:

1. Visit the login page
2. Enter valid learner credentials
3. Click login and land on dashboard
4. Navigate to “Browse Skills”
5. Click on a skill card and view teacher details
6. Click “Schedule Session”
7. Select a time slot and confirm
8. See confirmation message

---

**Expected Outcome**:
Learner sees a visible confirmation that the session has been scheduled successfully. A new session appears in their dashboard.

---

**GitHub link to the test file**:
https://github.com/kp2469-Kaly/SkillSwap/tree/Kalyana/__tests__/cypress/e2

---

**Code snippet**:

```js
// File: cypress/e2e/scheduleSession.cy.js

describe('Skill Session Scheduling Flow', () => {
  it('should let learner schedule a session with a teacher', () => {
    cy.visit('http://localhost:3000/login');

    cy.get('input[name="email"]').type('learner@example.com');
    cy.get('input[name="password"]').type('password123');
    cy.get('button[type="submit"]').click();

    cy.contains('Browse Skills').click();
    cy.get('.skill-card').first().click();
    cy.contains('Schedule Session').click();

    cy.get('input[type="datetime-local"]').type('2025-08-06T14:00');
    cy.contains('Confirm').click();

    cy.contains('Session successfully scheduled').should('be.visible');
  });
});
```
---

## 4. System Demonstration

### 🎥 Video Link

## 5. AI-Assisted Code Quality Review

### Tool Used: ChatGPT

---

### Prompt Engineering

#### **Prompt: ** Analyze the provided source code and generate a comprehensive report

#### **Conversation Link: ** https://chatgpt.com/share/6886fd3f-c960-8010-a4c9-2f6a9eb66eca

### AI Feedback

### 🔍 Project Analysis Report: **SkillSwap**

---

#### 📌 **Overview**

The `SkillSwap` project appears to be a full-stack TypeScript-based web application designed for skill-sharing or peer-to-peer collaboration. It uses a modern tech stack with both frontend and backend modules, including user session management, forms, database interactions, and UI components.

---

#### 🧩 **Key Features & Functionalities**

Based on the folder structure and dependencies:

* **User Authentication** using `passport-local` and `express-session`.
* **Skill or Service Listings** – likely managed via forms with `react-hook-form` and `zod` validation.
* **Interactive UI Components** – built using Radix UI and styled with TailwindCSS.
* **Charts & Visualization** via `recharts`.
* **Form Validation** using `zod`.
* **Client-side Routing** via `wouter`.
* **Carousel/Slider Support** with `embla-carousel-react`.

---

#### 🛠️ **Technology Stack**

| Layer       | Technologies Used                                               |
| ----------- | --------------------------------------------------------------- |
| Frontend    | React, TailwindCSS, Framer Motion, Lucide Icons, CMDK, Radix UI |
| State/Forms | React Hook Form, Zod, React Query                               |
| Backend     | Node.js, Express, TypeScript                                    |
| Auth        | Passport.js, express-session, openid-client                     |
| DB ORM      | drizzle-orm                                                     |
| Storage     | Memorystore, PostgreSQL session store via `connect-pg-simple`   |
| Tooling     | Vite, Esbuild, tsx, Drizzle Kit                                 |
| Hosting     | Likely Replit (due to `.replit` and Replit plugins)             |

---

#### 🧱 **Code Structure**

* `client/`: React frontend logic.
* `server/`: Express-based backend server (TypeScript).
* `shared/`: Likely shared interfaces and types for front/backend.
* `attached_assets/`: Could include images, uploads, or public assets.
* `drizzle.config.ts`: Drizzle ORM configuration.
* `vite.config.ts`: Frontend bundler config.
* `package.json`: Metadata, scripts, and dependencies.
* `.replit`: Custom setup for Replit deployment.

---

#### 🧪 **Testing Strategy**

No dedicated testing folder (like `__tests__`) or test framework (like Jest or Vitest) is visible in `package.json`. Either:

* Testing is not implemented.
* It's done manually or planned for future.

---

#### ▶️ **Available Scripts**

```bash
npm run dev       # Starts dev server (tsx server/index.ts)
npm run build     # Builds frontend & bundles server
npm run start     # Runs production build
npm run check     # Type-check using TypeScript
npm run db:push   # Push DB schema using drizzle-kit
```

---

Would you like a breakdown of individual files in the `client/` or `server/` folder for deeper analysis (e.g., routes, models, components)?

#### ▶️ **Assigned Reviewer: ** Ashrith

#### ▶️ **Severity Assessment: ** Medium

## 6. Retrospective Analysis

### Key Learnings

Throughout the development of our MVP, we learned how to translate user requirements into technical features, work collaboratively using Git and pull requests, and implement full-stack functionality with testing and deployment. We also gained valuable experience in debugging, integrating third-party tools, and following best practices in modularity.

---

### Challenges Overcome

One of the main challenges was ensuring proper session management, especially in coordinating peer-to-peer session scheduling. We also faced issues with Git merge conflicts during active collaboration. These were resolved by setting stricter pull request review rules and improving our team’s version control discipline. Testing asynchronous routes and database-dependent features required careful planning and the use of tools like Supertest and Cypress.

---

### Future Improvements

If we were to continue development, we would focus on:

- Improving the UI/UX design for a more polished experience
- Adding real-time chat or messaging between users
- Expanding search and filter options for better matchmaking
- Strengthening security features such as rate limiting and email verification

Overall, this project helped us understand the complete product development lifecycle and how to build scalable, testable, and user-centric applications.
