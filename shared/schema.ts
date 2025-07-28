import { sql } from 'drizzle-orm';
import {
  index,
  jsonb,
  pgTable,
  timestamp,
  varchar,
  text,
  integer,
  boolean,
  pgEnum,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const sessions = pgTable(
  "sessions",
  {
    sid: varchar("sid").primaryKey(),
    sess: jsonb("sess").notNull(),
    expire: timestamp("expire").notNull(),
  },
  (table) => [index("IDX_session_expire").on(table.expire)],
);

// User storage table.
// (IMPORTANT) This table is mandatory for Replit Auth, don't drop it.
export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  email: varchar("email").unique(),
  firstName: varchar("first_name"),
  lastName: varchar("last_name"),
  profileImageUrl: varchar("profile_image_url"),
  location: varchar("location"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const sessionTypeEnum = pgEnum('session_type', ['video', 'in_person']);
export const sessionStatusEnum = pgEnum('session_status', ['pending', 'accepted', 'declined', 'completed']);
export const notificationTypeEnum = pgEnum('notification_type', ['match_found', 'session_request', 'session_reminder', 'session_accepted', 'session_declined']);

export const skills = pgTable("skills", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: varchar("name").notNull().unique(),
  category: varchar("category").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const userSkills = pgTable("user_skills", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id, { onDelete: 'cascade' }),
  skillId: varchar("skill_id").notNull().references(() => skills.id, { onDelete: 'cascade' }),
  type: varchar("type").notNull(), // 'offer' or 'want'
  createdAt: timestamp("created_at").defaultNow(),
});

export const userProfiles = pgTable("user_profiles", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id, { onDelete: 'cascade' }).unique(),
  bio: text("bio"),
  availabilityDays: text("availability_days").array(),
  availabilityTimes: varchar("availability_times"),
  preferVideoCall: boolean("prefer_video_call").default(true),
  preferInPerson: boolean("prefer_in_person").default(true),
  isExpert: boolean("is_expert").default(false),
  expertRate: integer("expert_rate"), // hourly rate in cents
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const sessions_table = pgTable("sessions_table", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  teacherId: varchar("teacher_id").notNull().references(() => users.id, { onDelete: 'cascade' }),
  studentId: varchar("student_id").notNull().references(() => users.id, { onDelete: 'cascade' }),
  skillId: varchar("skill_id").notNull().references(() => skills.id),
  title: varchar("title").notNull(),
  description: text("description"),
  scheduledAt: timestamp("scheduled_at").notNull(),
  duration: integer("duration").notNull(), // in minutes
  type: sessionTypeEnum("type").notNull(),
  status: sessionStatusEnum("status").notNull().default('pending'),
  meetingUrl: varchar("meeting_url"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const notifications = pgTable("notifications", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id, { onDelete: 'cascade' }),
  type: notificationTypeEnum("type").notNull(),
  title: varchar("title").notNull(),
  message: text("message").notNull(),
  isRead: boolean("is_read").default(false),
  relatedSessionId: varchar("related_session_id").references(() => sessions_table.id),
  createdAt: timestamp("created_at").defaultNow(),
});

export const groups = pgTable("groups", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: varchar("name").notNull(),
  description: text("description"),
  skillId: varchar("skill_id").references(() => skills.id),
  memberCount: integer("member_count").default(0),
  imageUrl: varchar("image_url"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const groupMembers = pgTable("group_members", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  groupId: varchar("group_id").notNull().references(() => groups.id, { onDelete: 'cascade' }),
  userId: varchar("user_id").notNull().references(() => users.id, { onDelete: 'cascade' }),
  joinedAt: timestamp("joined_at").defaultNow(),
});

// Relations
export const usersRelations = relations(users, ({ one, many }) => ({
  profile: one(userProfiles, {
    fields: [users.id],
    references: [userProfiles.userId],
  }),
  userSkills: many(userSkills),
  teachingSessions: many(sessions_table, { relationName: "teacher" }),
  learningSessions: many(sessions_table, { relationName: "student" }),
  notifications: many(notifications),
  groupMemberships: many(groupMembers),
}));

export const skillsRelations = relations(skills, ({ many }) => ({
  userSkills: many(userSkills),
  sessions: many(sessions_table),
  groups: many(groups),
}));

export const userSkillsRelations = relations(userSkills, ({ one }) => ({
  user: one(users, {
    fields: [userSkills.userId],
    references: [users.id],
  }),
  skill: one(skills, {
    fields: [userSkills.skillId],
    references: [skills.id],
  }),
}));

export const userProfilesRelations = relations(userProfiles, ({ one }) => ({
  user: one(users, {
    fields: [userProfiles.userId],
    references: [users.id],
  }),
}));

export const sessionsTableRelations = relations(sessions_table, ({ one, many }) => ({
  teacher: one(users, {
    fields: [sessions_table.teacherId],
    references: [users.id],
    relationName: "teacher",
  }),
  student: one(users, {
    fields: [sessions_table.studentId],
    references: [users.id],
    relationName: "student",
  }),
  skill: one(skills, {
    fields: [sessions_table.skillId],
    references: [skills.id],
  }),
  notifications: many(notifications),
}));

export const notificationsRelations = relations(notifications, ({ one }) => ({
  user: one(users, {
    fields: [notifications.userId],
    references: [users.id],
  }),
  relatedSession: one(sessions_table, {
    fields: [notifications.relatedSessionId],
    references: [sessions_table.id],
  }),
}));

export const groupsRelations = relations(groups, ({ one, many }) => ({
  skill: one(skills, {
    fields: [groups.skillId],
    references: [skills.id],
  }),
  members: many(groupMembers),
}));

export const groupMembersRelations = relations(groupMembers, ({ one }) => ({
  group: one(groups, {
    fields: [groupMembers.groupId],
    references: [groups.id],
  }),
  user: one(users, {
    fields: [groupMembers.userId],
    references: [users.id],
  }),
}));

// Insert schemas
export const insertUserSchema = createInsertSchema(users).pick({
  email: true,
  firstName: true,
  lastName: true,
  profileImageUrl: true,
  location: true,
});

export const insertSkillSchema = createInsertSchema(skills).pick({
  name: true,
  category: true,
});

export const insertUserSkillSchema = createInsertSchema(userSkills).pick({
  userId: true,
  skillId: true,
  type: true,
});

export const insertUserProfileSchema = createInsertSchema(userProfiles).pick({
  userId: true,
  bio: true,
  availabilityDays: true,
  availabilityTimes: true,
  preferVideoCall: true,
  preferInPerson: true,
  isExpert: true,
  expertRate: true,
});

export const insertSessionSchema = createInsertSchema(sessions_table).pick({
  teacherId: true,
  studentId: true,
  skillId: true,
  title: true,
  description: true,
  scheduledAt: true,
  duration: true,
  type: true,
  meetingUrl: true,
});

export const insertNotificationSchema = createInsertSchema(notifications).pick({
  userId: true,
  type: true,
  title: true,
  message: true,
  relatedSessionId: true,
});

export const insertGroupSchema = createInsertSchema(groups).pick({
  name: true,
  description: true,
  skillId: true,
  imageUrl: true,
});

export const insertGroupMemberSchema = createInsertSchema(groupMembers).pick({
  groupId: true,
  userId: true,
});

// Types
export type UpsertUser = typeof users.$inferInsert;
export type User = typeof users.$inferSelect;
export type Skill = typeof skills.$inferSelect;
export type InsertSkill = z.infer<typeof insertSkillSchema>;
export type UserSkill = typeof userSkills.$inferSelect;
export type InsertUserSkill = z.infer<typeof insertUserSkillSchema>;
export type UserProfile = typeof userProfiles.$inferSelect;
export type InsertUserProfile = z.infer<typeof insertUserProfileSchema>;
export type Session = typeof sessions_table.$inferSelect;
export type InsertSession = z.infer<typeof insertSessionSchema>;
export type Notification = typeof notifications.$inferSelect;
export type InsertNotification = z.infer<typeof insertNotificationSchema>;
export type Group = typeof groups.$inferSelect;
export type InsertGroup = z.infer<typeof insertGroupSchema>;
export type GroupMember = typeof groupMembers.$inferSelect;
export type InsertGroupMember = z.infer<typeof insertGroupMemberSchema>;
