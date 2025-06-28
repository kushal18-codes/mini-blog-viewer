import { describe, expect, it, vi } from 'vitest';
import { fetchJson, formatDate, truncateText } from './utils';

describe('formatDate', () => {
  it('should format a date string correctly', () => {
    const dateString = '2024-01-01T12:00:00Z';
    expect(formatDate(dateString)).toBe('Jan 1, 2024');
  });

  it('should format a Date object correctly', () => {
    const dateObject = new Date('2024-01-01T12:00:00Z');
    expect(formatDate(dateObject)).toBe('Jan 1, 2024');
  });
});

describe('truncateText', () => {
  it('should not truncate text if it is shorter than or equal to the max length', () => {
    const text = 'Hello, world!';
    expect(truncateText(text, 20)).toBe(text);
  });

  it('should truncate text if it is longer than the max length', () => {
    const text = 'This is a long text that needs to be truncated';
    expect(truncateText(text, 20)).toBe('This is a long text ...');
  });
});

describe('fetchJson', () => {
  it('should fetch JSON data successfully', async () => {
    const mockData = { message: 'Success' };
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => mockData,
    });

    const data = await fetchJson('https://api.example.com/data');
    expect(data).toEqual(mockData);
    expect(global.fetch).toHaveBeenCalledWith('https://api.example.com/data');
  });

  it('should throw an error for a network error', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: false,
    });

    await expect(fetchJson('https://api.example.com/data')).rejects.toThrow(
      'Network error'
    );
  });
});
