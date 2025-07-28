import {
  users,
  skills,
  userSkills,
  userProfiles,
  sessions_table,
  notifications,
  groups,
  groupMembers,
  type User,
  type UpsertUser,
  type Skill,
  type InsertSkill,
  type UserSkill,
  type InsertUserSkill,
  type UserProfile,
  type InsertUserProfile,
  type Session,
  type InsertSession,
  type Notification,
  type InsertNotification,
  type Group,
  type InsertGroup,
  type GroupMember,
  type InsertGroupMember,
} from "@shared/schema";
import { db } from "./db";
import { eq, and, or, sql, desc, asc } from "drizzle-orm";

// Interface for storage operations
export interface IStorage {
  // User operations (IMPORTANT: mandatory for Replit Auth)
  getUser(id: string): Promise<User | undefined>;
  upsertUser(user: UpsertUser): Promise<User>;
  
  // Profile operations
  getUserProfile(userId: string): Promise<UserProfile | undefined>;
  createUserProfile(profile: InsertUserProfile): Promise<UserProfile>;
  updateUserProfile(userId: string, profile: Partial<InsertUserProfile>): Promise<UserProfile>;
  
  // Skills operations
  getAllSkills(): Promise<Skill[]>;
  createSkill(skill: InsertSkill): Promise<Skill>;
  getUserSkills(userId: string): Promise<(UserSkill & { skill: Skill })[]>;
  addUserSkill(userSkill: InsertUserSkill): Promise<UserSkill>;
  removeUserSkill(userId: string, skillId: string, type: string): Promise<void>;
  
  // Matching operations
  findMatches(userId: string): Promise<any[]>;
  
  // Session operations
  getUserSessions(userId: string): Promise<(Session & { teacher: User; student: User; skill: Skill })[]>;
  createSession(session: InsertSession): Promise<Session>;
  updateSessionStatus(sessionId: string, status: string): Promise<Session>;
  
  // Notification operations
  getUserNotifications(userId: string): Promise<Notification[]>;
  createNotification(notification: InsertNotification): Promise<Notification>;
  markNotificationAsRead(notificationId: string): Promise<void>;
  
  // Expert operations
  getExperts(): Promise<(User & { profile: UserProfile })[]>;
  
  // Group operations
  getAllGroups(): Promise<Group[]>;
  getUserGroups(userId: string): Promise<(GroupMember & { group: Group })[]>;
  joinGroup(membership: InsertGroupMember): Promise<GroupMember>;
}

export class DatabaseStorage implements IStorage {
  // User operations (IMPORTANT: mandatory for Replit Auth)
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async upsertUser(userData: UpsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(userData)
      .onConflictDoUpdate({
        target: users.id,
        set: {
          ...userData,
          updatedAt: new Date(),
        },
      })
      .returning();
    return user;
  }
  
  // Profile operations
  async getUserProfile(userId: string): Promise<UserProfile | undefined> {
    const [profile] = await db
      .select()
      .from(userProfiles)
      .where(eq(userProfiles.userId, userId));
    return profile;
  }

  async createUserProfile(profile: InsertUserProfile): Promise<UserProfile> {
    const [newProfile] = await db
      .insert(userProfiles)
      .values(profile)
      .returning();
    return newProfile;
  }

  async updateUserProfile(userId: string, profile: Partial<InsertUserProfile>): Promise<UserProfile> {
    const [updatedProfile] = await db
      .update(userProfiles)
      .set({ ...profile, updatedAt: new Date() })
      .where(eq(userProfiles.userId, userId))
      .returning();
    return updatedProfile;
  }
  
  // Skills operations
  async getAllSkills(): Promise<Skill[]> {
    return await db.select().from(skills).orderBy(asc(skills.name));
  }

  async createSkill(skill: InsertSkill): Promise<Skill> {
    const [newSkill] = await db
      .insert(skills)
      .values(skill)
      .returning();
    return newSkill;
  }

  async getUserSkills(userId: string): Promise<(UserSkill & { skill: Skill })[]> {
    return await db
      .select()
      .from(userSkills)
      .innerJoin(skills, eq(userSkills.skillId, skills.id))
      .where(eq(userSkills.userId, userId));
  }

  async addUserSkill(userSkill: InsertUserSkill): Promise<UserSkill> {
    const [newUserSkill] = await db
      .insert(userSkills)
      .values(userSkill)
      .returning();
    return newUserSkill;
  }

  async removeUserSkill(userId: string, skillId: string, type: string): Promise<void> {
    await db
      .delete(userSkills)
      .where(
        and(
          eq(userSkills.userId, userId),
          eq(userSkills.skillId, skillId),
          eq(userSkills.type, type)
        )
      );
  }
  
  // Matching operations
  async findMatches(userId: string): Promise<any[]> {
    // Get user's offered and wanted skills
    const userOfferedSkills = await db
      .select({ skillId: userSkills.skillId })
      .from(userSkills)
      .where(and(eq(userSkills.userId, userId), eq(userSkills.type, 'offer')));
    
    const userWantedSkills = await db
      .select({ skillId: userSkills.skillId })
      .from(userSkills)
      .where(and(eq(userSkills.userId, userId), eq(userSkills.type, 'want')));
    
    if (userOfferedSkills.length === 0 || userWantedSkills.length === 0) {
      return [];
    }
    
    // Find potential matches
    const matches = await db
      .select({
        user: users,
        profile: userProfiles,
        offeredSkill: {
          id: sql`offered_skills.skill_id`,
          name: sql`offered_skill_names.name`,
        },
        wantedSkill: {
          id: sql`wanted_skills.skill_id`,
          name: sql`wanted_skill_names.name`,
        },
      })
      .from(users)
      .innerJoin(userProfiles, eq(users.id, userProfiles.userId))
      .innerJoin(
        sql`user_skills AS offered_skills`,
        and(
          eq(sql`offered_skills.user_id`, users.id),
          eq(sql`offered_skills.type`, 'offer'),
          sql`offered_skills.skill_id IN (${userWantedSkills.map(s => `'${s.skillId}'`).join(',')})`
        )
      )
      .innerJoin(
        sql`user_skills AS wanted_skills`,
        and(
          eq(sql`wanted_skills.user_id`, users.id),
          eq(sql`wanted_skills.type`, 'want'),
          sql`wanted_skills.skill_id IN (${userOfferedSkills.map(s => `'${s.skillId}'`).join(',')})`
        )
      )
      .innerJoin(
        sql`skills AS offered_skill_names`,
        eq(sql`offered_skill_names.id`, sql`offered_skills.skill_id`)
      )
      .innerJoin(
        sql`skills AS wanted_skill_names`,
        eq(sql`wanted_skill_names.id`, sql`wanted_skills.skill_id`)
      )
      .where(sql`users.id != ${userId}`)
      .limit(20);
    
    return matches;
  }
  
  // Session operations
  async getUserSessions(userId: string): Promise<(Session & { teacher: User; student: User; skill: Skill })[]> {
    return await db
      .select()
      .from(sessions_table)
      .innerJoin(users, eq(sessions_table.teacherId, users.id))
      .innerJoin(sql`users AS students`, eq(sessions_table.studentId, sql`students.id`))
      .innerJoin(skills, eq(sessions_table.skillId, skills.id))
      .where(
        or(
          eq(sessions_table.teacherId, userId),
          eq(sessions_table.studentId, userId)
        )
      )
      .orderBy(desc(sessions_table.scheduledAt));
  }

  async createSession(session: InsertSession): Promise<Session> {
    const [newSession] = await db
      .insert(sessions_table)
      .values(session)
      .returning();
    return newSession;
  }

  async updateSessionStatus(sessionId: string, status: string): Promise<Session> {
    const [updatedSession] = await db
      .update(sessions_table)
      .set({ status: status as any, updatedAt: new Date() })
      .where(eq(sessions_table.id, sessionId))
      .returning();
    return updatedSession;
  }
  
  // Notification operations
  async getUserNotifications(userId: string): Promise<Notification[]> {
    return await db
      .select()
      .from(notifications)
      .where(eq(notifications.userId, userId))
      .orderBy(desc(notifications.createdAt));
  }

  async createNotification(notification: InsertNotification): Promise<Notification> {
    const [newNotification] = await db
      .insert(notifications)
      .values(notification)
      .returning();
    return newNotification;
  }

  async markNotificationAsRead(notificationId: string): Promise<void> {
    await db
      .update(notifications)
      .set({ isRead: true })
      .where(eq(notifications.id, notificationId));
  }
  
  // Expert operations
  async getExperts(): Promise<(User & { profile: UserProfile })[]> {
    return await db
      .select()
      .from(users)
      .innerJoin(userProfiles, eq(users.id, userProfiles.userId))
      .where(eq(userProfiles.isExpert, true));
  }
  
  // Group operations
  async getAllGroups(): Promise<Group[]> {
    return await db
      .select()
      .from(groups)
      .orderBy(desc(groups.memberCount));
  }

  async getUserGroups(userId: string): Promise<(GroupMember & { group: Group })[]> {
    return await db
      .select()
      .from(groupMembers)
      .innerJoin(groups, eq(groupMembers.groupId, groups.id))
      .where(eq(groupMembers.userId, userId));
  }

  async joinGroup(membership: InsertGroupMember): Promise<GroupMember> {
    const [newMembership] = await db
      .insert(groupMembers)
      .values(membership)
      .returning();
    
    // Update group member count
    await db
      .update(groups)
      .set({ memberCount: sql`member_count + 1` })
      .where(eq(groups.id, membership.groupId));
    
    return newMembership;
  }
}

export const storage = new DatabaseStorage();
