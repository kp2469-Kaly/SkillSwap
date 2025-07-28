import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth, isAuthenticated } from "./replitAuth";
import { z } from "zod";
import {
  insertUserProfileSchema,
  insertUserSkillSchema,
  insertSessionSchema,
  insertSkillSchema,
} from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Auth middleware
  await setupAuth(app);

  // Auth routes
  app.get('/api/auth/user', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const user = await storage.getUser(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      
      // Get user profile
      const profile = await storage.getUserProfile(userId);
      
      res.json({ ...user, profile });
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ message: "Failed to fetch user" });
    }
  });

  // Profile routes
  app.get('/api/profile', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const profile = await storage.getUserProfile(userId);
      res.json(profile);
    } catch (error) {
      console.error("Error fetching profile:", error);
      res.status(500).json({ message: "Failed to fetch profile" });
    }
  });

  app.post('/api/profile', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const profileData = insertUserProfileSchema.parse({
        ...req.body,
        userId,
      });
      
      const existingProfile = await storage.getUserProfile(userId);
      let profile;
      
      if (existingProfile) {
        profile = await storage.updateUserProfile(userId, profileData);
      } else {
        profile = await storage.createUserProfile(profileData);
      }
      
      res.json(profile);
    } catch (error) {
      console.error("Error creating/updating profile:", error);
      res.status(500).json({ message: "Failed to save profile" });
    }
  });

  // Skills routes
  app.get('/api/skills', async (req, res) => {
    try {
      const skills = await storage.getAllSkills();
      res.json(skills);
    } catch (error) {
      console.error("Error fetching skills:", error);
      res.status(500).json({ message: "Failed to fetch skills" });
    }
  });

  app.post('/api/skills', isAuthenticated, async (req: any, res) => {
    try {
      const skillData = insertSkillSchema.parse(req.body);
      const skill = await storage.createSkill(skillData);
      res.json(skill);
    } catch (error) {
      console.error("Error creating skill:", error);
      res.status(500).json({ message: "Failed to create skill" });
    }
  });

  app.get('/api/user-skills', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const userSkills = await storage.getUserSkills(userId);
      res.json(userSkills);
    } catch (error) {
      console.error("Error fetching user skills:", error);
      res.status(500).json({ message: "Failed to fetch user skills" });
    }
  });

  app.post('/api/user-skills', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const userSkillData = insertUserSkillSchema.parse({
        ...req.body,
        userId,
      });
      
      const userSkill = await storage.addUserSkill(userSkillData);
      res.json(userSkill);
    } catch (error) {
      console.error("Error adding user skill:", error);
      res.status(500).json({ message: "Failed to add skill" });
    }
  });

  app.delete('/api/user-skills/:skillId/:type', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const { skillId, type } = req.params;
      
      await storage.removeUserSkill(userId, skillId, type);
      res.json({ success: true });
    } catch (error) {
      console.error("Error removing user skill:", error);
      res.status(500).json({ message: "Failed to remove skill" });
    }
  });

  // Matching routes
  app.get('/api/matches', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const matches = await storage.findMatches(userId);
      res.json(matches);
    } catch (error) {
      console.error("Error finding matches:", error);
      res.status(500).json({ message: "Failed to find matches" });
    }
  });

  // Session routes
  app.get('/api/sessions', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const sessions = await storage.getUserSessions(userId);
      res.json(sessions);
    } catch (error) {
      console.error("Error fetching sessions:", error);
      res.status(500).json({ message: "Failed to fetch sessions" });
    }
  });

  app.post('/api/sessions', isAuthenticated, async (req: any, res) => {
    try {
      const sessionData = insertSessionSchema.parse(req.body);
      const session = await storage.createSession(sessionData);
      
      // Create notification for the teacher
      await storage.createNotification({
        userId: sessionData.teacherId,
        type: 'session_request',
        title: 'New Session Request',
        message: `You have a new session request for ${sessionData.title}`,
        relatedSessionId: session.id,
      });
      
      res.json(session);
    } catch (error) {
      console.error("Error creating session:", error);
      res.status(500).json({ message: "Failed to create session" });
    }
  });

  app.patch('/api/sessions/:sessionId/status', isAuthenticated, async (req: any, res) => {
    try {
      const { sessionId } = req.params;
      const { status } = req.body;
      
      const session = await storage.updateSessionStatus(sessionId, status);
      
      // Create notification for the student
      await storage.createNotification({
        userId: session.studentId,
        type: status === 'accepted' ? 'session_accepted' : 'session_declined',
        title: status === 'accepted' ? 'Session Accepted' : 'Session Declined',
        message: `Your session request has been ${status}`,
        relatedSessionId: sessionId,
      });
      
      res.json(session);
    } catch (error) {
      console.error("Error updating session status:", error);
      res.status(500).json({ message: "Failed to update session status" });
    }
  });

  // Notification routes
  app.get('/api/notifications', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const notifications = await storage.getUserNotifications(userId);
      res.json(notifications);
    } catch (error) {
      console.error("Error fetching notifications:", error);
      res.status(500).json({ message: "Failed to fetch notifications" });
    }
  });

  app.patch('/api/notifications/:notificationId/read', isAuthenticated, async (req: any, res) => {
    try {
      const { notificationId } = req.params;
      await storage.markNotificationAsRead(notificationId);
      res.json({ success: true });
    } catch (error) {
      console.error("Error marking notification as read:", error);
      res.status(500).json({ message: "Failed to mark notification as read" });
    }
  });

  // Expert routes
  app.get('/api/experts', async (req, res) => {
    try {
      const experts = await storage.getExperts();
      res.json(experts);
    } catch (error) {
      console.error("Error fetching experts:", error);
      res.status(500).json({ message: "Failed to fetch experts" });
    }
  });

  // Group routes
  app.get('/api/groups', async (req, res) => {
    try {
      const groups = await storage.getAllGroups();
      res.json(groups);
    } catch (error) {
      console.error("Error fetching groups:", error);
      res.status(500).json({ message: "Failed to fetch groups" });
    }
  });

  app.get('/api/user-groups', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const userGroups = await storage.getUserGroups(userId);
      res.json(userGroups);
    } catch (error) {
      console.error("Error fetching user groups:", error);
      res.status(500).json({ message: "Failed to fetch user groups" });
    }
  });

  app.post('/api/groups/:groupId/join', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const { groupId } = req.params;
      
      const membership = await storage.joinGroup({
        groupId,
        userId,
      });
      
      res.json(membership);
    } catch (error) {
      console.error("Error joining group:", error);
      res.status(500).json({ message: "Failed to join group" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
