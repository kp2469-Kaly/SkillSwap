# SkillSwap - Design Document

## 1. Description

SkillSwap is a local peer-to-peer skill exchange platform that addresses the problem of expensive skill learning and underutilized personal expertise. The platform enables individuals to exchange skills directly through a community-driven barter system, making education affordable while fostering social connections. Unlike costly online courses or formal educational institutions, SkillSwap emphasizes human interaction, personalized teaching in a conversational manner, and supports both free skill trading and affordable expert sessions.

The system allows users to create customized profiles showcasing their expertise and skills they want to learn, enabling them to connect with relevant skill partners within their local community. Through intelligent matching algorithms that consider proximity, availability, and compatibility variables, users can schedule sessions for knowledge exchange either online through video calls or in-person meetings. The platform supports both peer-to-peer free exchanges and paid expert sessions for specialized guidance, creating a comprehensive ecosystem for skill development and community building.

## 2. Architecture

### High-Level Architecture Diagram

<img width="1505" height="473" alt="2  Architecture" src="https://github.com/user-attachments/assets/d01ad0d2-1a6d-4441-ad7e-b7d8a932f8cb" />

### Architecture Rationale:
The architecture follows a 4 layered approach with clear separation of concerns:

* The UI handles user interaction and sends requests to the service layer.
* The service layer contains application logic and orchestrates processes.
* The domain layer manages core business objects (User, Skill, Session, etc.).
* The data access layer performs CRUD operations on the database.
* This design ensures **separation of concerns**, better **maintainability**, and **scalability**.
* 
## 3. Class Diagram

<img width="3840" height="2785" alt="3  Class Diagram" src="https://github.com/user-attachments/assets/58c8b436-3dab-4071-abdd-5a738d90c416" />

## 4. Sequence Diagram

<img width="1064" height="578" alt="4  Sequence Diagram" src="https://github.com/user-attachments/assets/fd8d8f98-c7f9-47be-ac1d-0cd0bdd92b71" />

# Use Case Description: Schedule Session

**Use Case:** Schedule Session  
**Actor:** User (Learner)
**Trigger:** User wants to schedule a learning session with a matched user  
**Pre-conditions:** Users have been matched and have agreed to connect via a session. Both users are logged into the system.  
**Post-conditions:** Session is scheduled in both users' calendars with confirmed date, time, and details. Both users receive confirmation notifications.

## Success Scenario:
1. User selects "Schedule Session" option from the matched user's profile
2. System displays calendar interface with available time slots
3. User selects preferred date and time from available slots
4. System prompts for session details (duration, type: online/in-person, topic)
5. User enters session details and confirms the teacher's username
6. System sends scheduling request to the other user (teacher)
7. Teacher receives notification and accepts the proposed session
8. System confirms session creation and adds to both users' calendars
9. System displays session confirmation details and sends notifications to both users

## Alternate Scenarios:

**3a. No available time slots match user's preference**
1. System displays message "No matching time slots found"

**5a. User enters invalid teacher username**
1. System displays error message "User not found"
2. System prompts user to re-enter correct username

**6a. System fails to send scheduling request due to network issues**
1. System displays error message "Unable to send request, please try again"

**7a. Teacher declines the session request**
1. System sends notification to learner about declined request

**7b. Teacher doesn't respond within 24 hours**
1. System sends reminder notification to teacher
2. System prompts learner to send new request or find alternative teacher

**8a. Calendar integration fails**
1. System displays warning message about calendar sync issues

**9a. Notification delivery fails**
1. System displays the failure message
2. System attempts to resend notification


## 5. Design Patterns

### 5.1 Strategy Pattern – Sessions

<img width="3840" height="2884" alt="5 1" src="https://github.com/user-attachments/assets/90f46555-9984-4533-9f63-3ecfe5396ff8" />

**GitHub Link:** https://github.com/kp2469-Kaly/SkillSwap/blob/Kalyana/CODE/Sessions.java

### 5.2 Observer Pattern

<img width="2137" height="3840" alt="5 2" src="https://github.com/user-attachments/assets/2a3b47a9-71e6-4538-8419-83aaf623db1e" />

**GitHub Link:** https://github.com/kp2469-Kaly/SkillSwap/tree/Kalyana/CODE

## 6. Design Principles

### Single Responsibility Principle (SRP)

**Example:**

* `NotificationService` only manages observers and alerts
* `SessionService` only handles session creation logic
* `ISessionStrategy` implementations each focus on one type of session behavior

### Open-Closed Principle (OCP)

**Example:**

* To support a new session type like `HybridSession`, we only implement it:

```java
public class HybridSession implements ISessionStrategy {
    public void schedule() {
        System.out.println("Hybrid session (online + offline)");
    }
}
ithm implementation
    }
}
```

### Dependency Inversion Principle (DIP)

High-level modules depend on abstractions rather than concrete implementations:

**Example**: The `SessionManager` depends on the abstract `NotificationService` interface rather than concrete notification implementations. This allows switching between email notifications, push notifications, or SMS without modifying the session management logic.
