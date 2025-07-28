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
