// src/utils/auth.ts

import { User } from '@/data/mockData';

const USER_SESSION_KEY = 'userSession';

/**
 * Retrieves the current user session from localStorage.
 * @returns The User object if a session exists, otherwise null.
 */
export const getUserSession = (): User | null => {
  try {
    const sessionData = localStorage.getItem(USER_SESSION_KEY);
    return sessionData ? JSON.parse(sessionData) : null;
  } catch (error) {
    console.error('Error retrieving user session from localStorage:', error);
    return null;
  }
};

/**
 * Saves the user session to localStorage.
 * @param user The User object to save.
 */
export const saveUserSession = (user: User): void => {
  try {
    localStorage.setItem(USER_SESSION_KEY, JSON.stringify(user));
  } catch (error) {
    console.error('Error saving user session to localStorage:', error);
  }
};

/**
 * Clears the user session from localStorage.
 */
export const clearUserSession = (): void => {
  try {
    localStorage.removeItem(USER_SESSION_KEY);
  } catch (error) {
    console.error('Error clearing user session from localStorage:', error);
  }
};
