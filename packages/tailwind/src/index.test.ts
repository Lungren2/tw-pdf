import { describe, it, expect, vi, beforeEach } from 'vitest';
import { tw, twSync, TailwindProvider } from './index';

// Mock the TailwindProcessor
vi.mock('./processor', () => {
  const mockProcess = vi.fn().mockResolvedValue({
    color: 'blue',
    fontSize: '16px',
    fontWeight: 'bold',
  });
  
  return {
    TailwindProcessor: vi.fn().mockImplementation(() => ({
      process: mockProcess,
      clearCache: vi.fn(),
    })),
  };
});

describe('Tailwind integration', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });
  
  describe('tw function', () => {
    it('should process Tailwind classes and return a style object', async () => {
      const style = await tw('text-blue-500 font-bold');
      
      expect(style).toEqual({
        color: 'blue',
        fontSize: '16px',
        fontWeight: 'bold',
      });
    });
    
    it('should accept a custom configuration', async () => {
      const config = {
        theme: {
          extend: {
            colors: {
              primary: '#3490dc',
            },
          },
        },
      };
      
      await tw('text-primary', config);
      
      // Verify that a new processor was created with the config
      expect(require('./processor').TailwindProcessor).toHaveBeenCalledWith(config);
    });
  });
  
  describe('twSync function', () => {
    it('should return an empty object for now', () => {
      // Mock console.warn to avoid polluting test output
      const consoleWarnMock = vi.spyOn(console, 'warn').mockImplementation(() => {});
      
      const style = twSync('text-blue-500');
      
      expect(style).toEqual({});
      expect(consoleWarnMock).toHaveBeenCalled();
      
      consoleWarnMock.mockRestore();
    });
  });
  
  describe('TailwindProvider', () => {
    it('should configure Tailwind with custom configuration', () => {
      const config = {
        theme: {
          extend: {
            colors: {
              primary: '#3490dc',
            },
          },
        },
      };
      
      TailwindProvider.configure(config);
      
      // Verify that a new processor was created with the config
      expect(require('./processor').TailwindProcessor).toHaveBeenCalledWith(config);
    });
    
    it('should clear the Tailwind cache', () => {
      // Configure Tailwind first to create a processor
      TailwindProvider.configure({});
      
      // Clear the cache
      TailwindProvider.clearCache();
      
      // Get the mock processor instance
      const mockProcessor = require('./processor').TailwindProcessor.mock.results[0].value;
      
      // Verify that clearCache was called
      expect(mockProcessor.clearCache).toHaveBeenCalled();
    });
  });
});
