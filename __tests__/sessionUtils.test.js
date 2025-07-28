import { isValidTimeSlot } from '../utils/sessionUtils';

describe('isValidTimeSlot', () => {
  it('should return true for valid slot', () => {
    expect(isValidTimeSlot('2025-07-27T10:00', '2025-07-27T11:00')).toBe(true);
  });

  it('should return false for invalid slot', () => {
    expect(isValidTimeSlot('2025-07-27T11:00', '2025-07-27T10:00')).toBe(false);
  });
});
