# Group 2: "SkillSwap"
## Deliverable 1: Software Requirements

## 1. Positioning

### 1.1 Problem Statement
The problem of expensive personalized skill learning and underutilized personal expertise affects individuals seeking personal development and skill acquisition, the impact of which is limited access to learning opportunities and wasted human potential in communities.

### 1.2 Product Position Statement
For individuals who want to learn new skills in a personalized and as a conversational manner and share their expertise
Who face challenges with expensive formal education and lack of accessible skill exchange opportunities
The SkillSwap is a local peer-to-peer skill exchange platform
That enables free skill trading and affordable expert sessions through community-based learning
Unlike expensive online courses or formal education institutions
Our app offers direct human connection, personalized teaching in a friendly manner like a conversation, and a barter-based economy for skill development

### 1.3 Value Proposition and Customer Segment
**Value Proposition:** SkillSwap is a community-driven platform designed to facilitate personalized pedagogical exchanges by enabling people to exchange skills directly, affordable, and socially connected.

**Customer Segment:** Students, working professionals, retirees, hobbyists, freelancers, and anyone interested in continuous learning and teaching within their local community

## 2. Stakeholders
1. Students/Skill Learners
2. Skill Teachers/Sharers
3. Software Developers
4. QA Testers
5. UI/UX Designers
6. Platform Admins
7. Customer Support

## 3. Functional Requirements (Features)

1. User Profile, showcasing skills offered and skills wanted
2. Skill Matching Algorithm, connects people based on skill needs and sorts according to distance in ascending order
3. Search Functionality, to find specific skills
4. Messaging Feature, users can communicate within the platform
5. Calendar, for scheduling sessions
6. Feedback system, users can provide feedback each other (both the learner and the instructor) based on their interactions
7. Video call integration or Zoom integration for video sessions
8. Notifications, for messages, reminders or alerts and matches


## 4. Non-functional Requirements

1. Ease of use, user should be able to create profile within 5 minutes and find matches quickly and easily
2. Security, which involves data protection, identity verification, and reporting system

## 5. MVP

1. User profile creation
2. Add skills to learn and skills to teach
3. Search for skill matches
4. Basic messaging
5. Basic session scheduling and calendar
6. Rating

## 6. Use Cases

### 6.1 Use Case Diagram
<img width="376" alt="image" src="https://github.com/user-attachments/assets/b052f44b-74b4-417c-b7a3-5ad15c65a9ac" />

### 6.1 Use Case Descriptions and Interface Sketches
#### Use Case 1: Create User Profile
**Actor:** User  
**Trigger:** User decides to create SkillSwap account
**Pre-conditions:** User has downloaded the app and completed registration  
**Post-conditions:** User profile is created with skills offered and skills wanted  

**Success Scenario:**
1. User selects "Create Account" option
2. System prompts for basic information
3. User fills the info.
4. System requests skills user can teach
5. User enters the skills
6. System requests skills user wants to learn
7. User enters the desired skills
8. System saves profile and displays confirmation

**Alternate Scenarios:**
1a. User decides not to create account
  1. User exits from the app
3a. User leaves blank or enters invalid details
  1. System displays error message
5a. User leaves blank or enters invalid skills
  1. System displays error message
8a. System unable to create account due to technical or server errors
  1. System displays error message

#### Use Case 2: Schedule Session
**Actor:** User  
**Trigger:** User wants to arrange a learning session with matched user
**Pre-conditions:** Users had a match and planned to connect via a virtual session
**Post-conditions:** Session is scheduled in both users' calendars

**Success Scenario:**
1. User selects "Schedule Session" option
2. System displays calendar interface
4. User selects the time slots based on the discussion
5. User enters the username of the other user
6. System sends scheduling request to other user
7. Other user accepts proposed time
8. System confirms session and adds to both calendars

**Alternate Scenarios:**
1a. Users decides not to connect in a virtual session
  1. User cancels session creation
5a. User enters wrong details of other user
  1. System displays error message saying "No such user"
6a. System unable to send the request to other user
  1. System displays error message
7a. Other user declines
  1. System sends a notification
8a. System unable to create account due to technical or server errors
  1. System displays error message

### Interface Sketches:
<img width="202" alt="image" src="https://github.com/user-attachments/assets/c9c891fa-d3bd-4ec0-a48c-76923eeb4e50" />
<img width="206" alt="image" src="https://github.com/user-attachments/assets/dad225c1-7162-41d0-96c9-6e19f830bb33" />

## 7. User Stories

1. As a learner, I want to specify what skills I want to learn so that the app can match me with relevant teachers.
2. As a teacher, I want to confirm session details so that both parties are clear on expectations.
3. As a hobbyist, I want to teach skills to others so that I can spend a valuable time sharing knowledge while helping others grow.
4. As a learner, I want live virtual sessions for teaching so that I can understand better.

## 8. Issue Tracker

https://github.com/kp2469-Kaly/SkillSwap/issues

