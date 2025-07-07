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

**Testing Framework:** pytest - A robust testing framework for Python that supports fixtures, parametrized testing, and comprehensive test discovery.

**Test Location:** [https://github.com/your-team/skillswap/tree/main/tests](https://github.com/your-team/skillswap/tree/main/tests)

**Test Example:**
- **Test File:** [https://github.com/your-team/skillswap/blob/main/tests/test_matching.py](https://github.com/your-team/skillswap/blob/main/tests/test_matching.py)
- **Source Code:** [https://github.com/your-team/skillswap/blob/main/src/matching/algorithm.py](https://github.com/your-team/skillswap/blob/main/src/matching/algorithm.py)
- **Test Validation:** This test validates the skill matching algorithm by testing various scenarios including proximity-based matching, availability overlap, and compatibility scoring to ensure users are matched with appropriate skill partners.

**Test Results:**
![Test Results Screenshot](path/to/test-results-screenshot.png)

## 4. Technology Stack

### 4.1 Python (Django)
**Description:** Backend web framework providing the core application logic, API endpoints, and database management.

**Justification:** Django was chosen for its rapid development capabilities, built-in admin interface, robust ORM, and comprehensive security features. Its "batteries-included" philosophy aligns well with our MVP development timeline.

### 4.2 PostgreSQL
**Description:** Primary database system storing user profiles, skills, sessions, and all application data.

**Justification:** PostgreSQL offers excellent performance, ACID compliance, and advanced features like full-text search and JSON support, which are essential for our matching algorithms and flexible data structures.

### 4.3 React
**Description:** Frontend JavaScript library creating the user interface and managing client-side state.

**Justification:** React's component-based architecture enables reusable UI components, efficient state management, and seamless user experience. Its large ecosystem and community support accelerate development.

### 4.4 WebRTC
**Description:** Real-time communication technology enabling peer-to-peer video calls within the application.

**Justification:** WebRTC provides native browser support for video conferencing without requiring additional plugins, ensuring accessibility and reducing infrastructure costs for video communication.

### 4.5 Redis
**Description:** In-memory data store used for caching, session management, and real-time features.

**Justification:** Redis enhances application performance by caching frequently accessed data and enables real-time notifications and messaging features essential for user engagement.

### 4.6 Docker
**Description:**

## 5. Learning Strategy

Our team primarily relied on YouTube tutorials and official documentation for learning new technologies required for SkillSwap development. We extensively used Django, React, WebRTC, and PostgreSQL documentation alongside comprehensive YouTube video tutorials that provided practical implementation examples. Team members shared knowledge with each other and held code review sessions, with each person investing hours in self learning. This approach proved effective for mastering complex concepts and maintaining development momentum.
