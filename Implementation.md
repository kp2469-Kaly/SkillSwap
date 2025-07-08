# SkillSwap Implementation Deliverable

## 1. Introduction

SkillSwap is a revolutionary local peer-to-peer skill exchange platform that addresses the problem of expensive skill learning and underutilized personal expertise. Our system enables individuals to share their knowledge through community-driven learning, eliminating the high barriers to entry associated with formal education. Unlike costly online and offline educational institutions, SkillSwap emphasizes human interaction, supports hands-on training, and embraces barter systems for skill development.

The platform allows users to create customized profiles showcasing their expertise and skills they want to learn, facilitating engagement with relevant skill partners within their community. Key features include intelligent matching algorithms based on proximity, and skill requirements; session scheduling for learning exchanges, and expert consultation services for specialized guidance with review and rating submission facility; community groups for skill-focused interactions;

**Value Proposition:** SkillSwap is a community-driven platform designed to facilitate personalized pedagogical exchanges by enabling people to exchange skills directly, affordable, and socially connected.

**GitHub Repository:** https://github.com/kp2469-Kaly/SkillSwap

## 2. Implemented Requirements

### 2.1 Kalyana

**Pull Requests Overview:** [https://github.com/your-team/skillswap/pulls?q=is%3Apr+author%3ATeamMember1](https://github.com/your-team/skillswap/pulls?q=is%3Apr+author%3ATeamMember1)

![Pull Requests Screenshot](path/to/pr-screenshot-member1.png)

#### 2.1.1 User Profile Creation and Management

**Requirement:** As a user, I want to create and customize my profile with expertise and learning goals so that I can connect with relevant skill partners in my community.

**Issue:** https://github.com/kp2469-Kaly/SkillSwap/issues/9

**Pull Request:** [https://github.com/your-team/skillswap/pull/426](https://github.com/your-team/skillswap/pull/426)

**Implemented by:** Kalyana

**Approved by:** Ashrith

**Automated Tests:** [https://github.com/your-team/skillswap/blob/main/tests/test_profile.py](https://github.com/your-team/skillswap/blob/main/tests/test_profile.py)

**Visual Evidence:**
![Profile Creation Interface](path/to/profile-creation-screenshot.png)

#### 2.1.2 Skill Matching

**Requirement:** As a user, I want to be matched with potential skill partners based on proximity, so that I can find relevant learning opportunities.

**Issue:** https://github.com/kp2469-Kaly/SkillSwap/issues/10

**Pull Request:** [https://github.com/your-team/skillswap/pull/438](https://github.com/your-team/skillswap/pull/438)

**Implemented by:** Ashrith

**Approved by:** Kalyana

**Automated Tests:** [https://github.com/your-team/skillswap/blob/main/tests/test_matching.py](https://github.com/your-team/skillswap/blob/main/tests/test_matching.py)

**Visual Evidence:**
![Matching Results Interface](path/to/matching-results-screenshot.png)

### 2.2 Ashrith

**Pull Requests Overview:** [https://github.com/your-team/skillswap/pulls?q=is%3Apr+author%3ATeamMember2](https://github.com/your-team/skillswap/pulls?q=is%3Apr+author%3ATeamMember2)

![Pull Requests Screenshot](path/to/pr-screenshot-member2.png)

#### 2.2.1 Session Scheduling System

**Requirement:** As a user, I want to schedule learning sessions with my skill partners so that we can coordinate our knowledge exchange effectively.

**Issue:** https://github.com/kp2469-Kaly/SkillSwap/issues/11

**Pull Request:** [https://github.com/your-team/skillswap/pull/445](https://github.com/your-team/skillswap/pull/445)

**Implemented by:** Ashrith

**Approved by:** Kalyana

**Automated Tests:** [https://github.com/your-team/skillswap/blob/main/tests/test_sessions.py](https://github.com/your-team/skillswap/blob/main/tests/test_sessions.py)

**Visual Evidence:**
![Session Scheduling Interface](path/to/session-scheduling-screenshot.png)

#### 2.2.2 FrontEnd Connection

**Requirement:** As a user, I want to conduct online learning sessions through integrated video calls so that I can learn remotely when in-person meetings aren't possible.

**Issue:** https://github.com/kp2469-Kaly/SkillSwap/issues/12

**Pull Request:** [https://github.com/your-team/skillswap/pull/452](https://github.com/your-team/skillswap/pull/452)

**Implemented by:** Kalyana

**Approved by:** Ashrith

**Automated Tests:** [https://github.com/your-team/skillswap/blob/main/tests/test_video_calls.py](https://github.com/your-team/skillswap/blob/main/tests/test_video_calls.py)

**Visual Evidence:**
![Video Call Interface](path/to/video-call-screenshot.png)

## 3. Testing Strategy

**Testing Framework:** We used Jest for unit and integration testing and Supertest for simulating HTTP requests against our Express.js server.

**Test Location:** https://github.com/kp2469-Kaly/SkillSwap/tree/Kalyana/skillswap/skillswap/__tests__

**Test Example:**
- **Test File:** https://github.com/kp2469-Kaly/SkillSwap/blob/Kalyana/skillswap/skillswap/__tests__/user.test.js
- **Source Code:** https://github.com/kp2469-Kaly/SkillSwap/blob/Kalyana/skillswap/skillswap/app.js
- **Test Validation:** This test validates the root route / of the API. It checks that the response status code is 200, and the response body returns the correct welcome message

**Test Results:**<img width="766" alt="Screenshot 2025-07-07 202115" src="https://github.com/user-attachments/assets/44e62678-65df-4816-a387-bb818a865e9d" />


## 4. Technology Stack

## 4. Technology Stack

### 4.1 Node.js (Express.js)
**Description:** Backend runtime and framework handling API routes, middleware, and server logic.  
**Justification:** Lightweight and efficient for building RESTful APIs. Express simplifies route handling, integrates well with MongoDB, and supports middleware-based architecture.

### 4.2 MongoDB (Mongoose)
**Description:** NoSQL database storing users, sessions, skills, and related data.  
**Justification:** Offers flexible schema design for rapid iteration. Mongoose adds schema validation and simplifies CRUD operations within Express.

### 4.3 React
**Description:** Frontend library for building dynamic, component-based user interfaces.  
**Justification:** Enables reusable UI components, reactive state management, and seamless user navigation using React Router.

### 4.4 Axios
**Description:** HTTP client used to send API requests from the frontend to the backend.  
**Justification:** Simpler and more concise than `fetch`, with built-in support for interceptors and error handling.

### 4.5 Jest + React Testing Library
**Description:** Testing framework and utilities for verifying UI components and DOM interactions.  
**Justification:** Widely used in the React ecosystem to test components, simulate user behavior, and validate frontend logic.

### 4.6 Supertest
**Description:** API testing tool used with Jest to simulate HTTP requests for backend endpoints.  
**Justification:** Allows full integration testing of Express routes without manually starting the server.

### 4.7 Replit
**Description:** Online development environment used to write, run, and test the backend code.  
**Justification:** Eliminates local setup and enables real-time collaboration and testing from any device.

### 4.8 dotenv
**Description:** Environment variable manager used in both frontend and backend.  
**Justification:** Ensures that sensitive credentials like database URIs and API keys remain secure and configurable across environments.


## 5. Learning Strategy

Our team primarily relied on YouTube tutorials and official documentation for learning new technologies required for SkillSwap development. We extensively used Django, React, WebRTC, and PostgreSQL documentation alongside comprehensive YouTube video tutorials that provided practical implementation examples. Team members shared knowledge with each other and held code review sessions, with each person investing hours in self learning. This approach proved effective for mastering complex concepts and maintaining development momentum.


## 6. Deployment

**Live System Link:** 

**Deployment Method:** 
We deployed our full-stack SkillSwap web application (frontend + backend) using **Azure App Service**, directly from our local system:
1. **Built React frontend** using `npm run build`.
2. **Configured Express backend** to serve frontend from `frountend/build` using `express.static()` and a wildcard route.
3. **Used Azure CLI** (`az webapp up`) to deploy the entire project folder.
4. **Set environment variables** in Azure for `MONGO_URI`, `JWT_SECRET`, etc.
5. **Tested deployment** by verifying both frontend pages and API endpoints are accessible and working.

**Platform Justification:** 

We chose Azure because it's is supportive for Node.js and full-stack apps, easy CLI-based deployment from local systems, it is free student tier via Azure for Students, and because of its Built-in HTTPS, environment config, and scaling options.

## 7. Licensing

**License:** MIT License

**GitHub Configuration:** https://github.com/kp2469-Kaly/SkillSwap/blob/Kalyana/LICENSE

**Justification:** We adopted the MIT License because it provides maximum flexibility for future development and potential commercial use while maintaining open-source principles. This license allows others to use, modify, and distribute our code freely, encouraging community contributions and innovation. The MIT License aligns with our mission of making education accessible and supports the collaborative spirit of skill sharing that SkillSwap embodies.


## 8. Repository Documentation

**Documentation Files:**
- **README.md:** https://github.com/kp2469-Kaly/SkillSwap/blob/Kalyana/README.md
- **LICENSE:** https://github.com/kp2469-Kaly/SkillSwap/blob/Kalyana/LICENSE


## 9. User Interface Design

**Design Approach:** 
Our UI/UX methodology emphasizes simplicity, accessibility, and user-centered design. We followed Material Design principles to ensure consistency and familiarity across the application. The design process included user wireframing, and iterative prototyping with user feedback integration.

**Visual Examples:**


**Usability Considerations:**
- **Mobile-First Design:** Responsive layout ensuring optimal experience across devices
- **Intuitive Navigation:** Clear information hierarchy with consistent navigation patterns
- **Minimalist Interface:** Clean design reducing cognitive load and focusing on core functionality


## 10. Retrospective Analysis

**Key Learnings:** We learned how to build and structure a full-stack application using Node.js for the backend, Express for API handling, and React for the frontend. Key takeaways included managing user authentication using JWT, handling asynchronous data flow in React, and structuring scalable RESTful APIs.

**Challenges Overcome:** We initially struggled with session handling and syncing frontend updates with backend changes. These issues were resolved by implementing JWT-based authentication and improving our API response structure. Debugging React state issues also taught us the importance of clean component design.

**Future Improvements:** For the next version, we plan to add skill rating features, real-time chat between users, and better profile customization. Improving mobile responsiveness and reducing load times are also key goals for future updates.

**Process Improvements:** In future projects, we’ll use project management tools like Trello for better task tracking, write more unit tests early on, and follow a stricter git workflow to prevent merge issues. More frequent team check-ins would also help us stay aligned and efficient.


## 11. System Demonstration

**Video Link:** [https://youtube.com/watch?v=SkillSwapDemo](https://youtube.com/watch?v=SkillSwapDemo)

**Content Overview:** 
The demonstration video showcases all major features including user registration and profile creation, skill matching and partner discovery, session scheduling and video call functionality, expert consultation booking, community group participation, and review and rating system usage.

**Duration:** 4 minutes, 30 seconds

**Quality:** Professional presentation with clear narration explaining each feature's purpose and demonstrating real-world usage scenarios.

