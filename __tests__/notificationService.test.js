import { formatSessionNotification } from '../../services/notificationService';

describe('formatSessionNotification', () => {
  it('should return correct message for accepted session', () => {
    const session = {
      teacherName: 'Ashrith',
      time: '2025-08-01 10:00 AM',
    };
    const result = formatSessionNotification('accepted', session);
    expect(result).toBe('Your session with Ashrith at 2025-08-01 10:00 AM has been accepted.');
  });

  it('should return correct message for declined session', () => {
    const session = {
      teacherName: 'Ashrith',
      time: '2025-08-01 10:00 AM',
    };
    const result = formatSessionNotification('declined', session);
    expect(result).toBe('Your session with Ashrith at 2025-08-01 10:00 AM has been declined.');
  });

  it('should return correct message for pending session', () => {
    const session = {
      teacherName: 'Ashrith',
      time: '2025-08-01 10:00 AM',
    };
    const result = formatSessionNotification('pending', session);
    expect(result).toBe('Your session with Ashrith at 2025-08-01 10:00 AM is pending confirmation.');
  });

  it('should handle unknown status gracefully', () => {
    const session = {
      teacherName: 'Ashrith',
      time: '2025-08-01 10:00 AM',
    };
    const result = formatSessionNotification('unknown', session);
    expect(result).toBe('Session status unknown.');
  });
});
