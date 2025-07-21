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

### 5.1 Observer Pattern

The Observer pattern is implemented in the notification system to handle real-time updates for users about matches, session reminders, and messages.

<img width="3840" height="2884" alt="5 1" src="https://github.com/user-attachments/assets/90f46555-9984-4533-9f63-3ecfe5396ff8" />

**GitHub Links:**

### 5.2 Strategy Pattern

The Strategy pattern is used for different matching algorithms that can be applied based on user preferences and system configuration.

<img width="2137" height="3840" alt="5 2" src="https://github.com/user-attachments/assets/2a3b47a9-71e6-4538-8419-83aaf623db1e" />

**GitHub Link:**

## 6. Design Principles

### Single Responsibility Principle (SRP)

Our design follows SRP by ensuring each class has a single, well-defined responsibility:

- **UserService**: Handles only user-related operations (registration, profile management, authentication)
- **MatchingService**: Focuses exclusively on finding compatible skill partners
- **SessionManager**: Manages only session lifecycle (creation, scheduling, cancellation)
- **NotificationService**: Handles only notification delivery and management

**Example**: The `User` class is responsible only for user data and basic user operations, while complex business logic like matching algorithms is delegated to `MatchingService`. This separation makes the code more maintainable and testable.

```java
// User class focuses only on user data and basic operations
public class User {
    private String name, email, location;
    private Profile profile;
    
    public void updateProfile(Profile profile) { /* simple assignment */ }
    public void addSkill(Skill skill) { /* add to collection */ }
}

// MatchingService handles complex matching logic
public class MatchingService {
    public List<User> findMatches(User user) {
        // Complex matching algorithm implementation
    }
}
```

### Open/Closed Principle (OCP)

The system is designed to be open for extension but closed for modification, particularly evident in our matching system:

**Example**: The `MatchingStrategy` interface allows adding new matching algorithms without modifying existing code. New strategies like `HybridMatchingStrategy` or `AIBasedMatchingStrategy` can be added by implementing the interface without changing the `MatchingService` class.

```java
// Existing interface - closed for modification
public interface MatchingStrategy {
    List<User> findMatches(User user, List<User> candidates);
}

// New strategy can be added - open for extension
public class AIBasedMatchingStrategy implements MatchingStrategy {
    public List<User> findMatches(User user, List<User> candidates) {
        // AI-based matching implementation
    }
}
```

### Dependency Inversion Principle (DIP)

High-level modules depend on abstractions rather than concrete implementations:

**Example**: The `SessionManager` depends on the abstract `NotificationService` interface rather than concrete notification implementations. This allows switching between email notifications, push notifications, or SMS without modifying the session management logic.

```java
public class SessionManager {
    private NotificationService notificationService; // Depends on abstraction
    
    public void createSession(Session session) {
        // Session creation logic
        notificationService.sendNotification(notification); // Uses abstraction
    }
}
```

### Repository Pattern

Data access is abstracted through repository interfaces, separating business logic from data persistence concerns:

**Example**: The `UserRepository` interface abstracts database operations, allowing the business logic to remain independent of specific database implementations (MySQL, PostgreSQL, MongoDB, etc.).

```java
public interface UserRepository {
    User save(User user);
    Optional<User> findById(Long id);
    List<User> findByLocation(Location location);
}

// Business logic depends on abstraction, not implementation
public class UserService {
    private UserRepository userRepository; // Interface dependency
    
    public User createUser(User user) {
        return userRepository.save(user); // Uses abstraction
    }
}
```
